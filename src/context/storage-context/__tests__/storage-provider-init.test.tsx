import React, { useEffect } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StorageProvider } from '@/context/storage-context/storage-provider';
import { useStorage } from '@/hooks/use-storage';
import type { StorageContext } from '@/context/storage-context/storage-context';
import type { Diagram } from '@/lib/domain/diagram';
import { DatabaseType } from '@/lib/domain/database-type';

const mockState = vi.hoisted(() => ({
    user: null as { id: string } | null,
    supabase: null as unknown,
}));

vi.mock('dexie', () => {
    class FakeCollection {
        private readonly table: FakeTable;
        private readonly field: string;
        private readonly value: unknown;

        constructor(table: FakeTable, field: string, value: unknown) {
            this.table = table;
            this.field = field;
            this.value = value;
        }

        private getMatches() {
            return this.table
                .getAll()
                .filter((row) => row[this.field] === this.value);
        }

        async toArray() {
            return this.getMatches();
        }

        async delete() {
            const matches = this.getMatches();
            for (const row of matches) {
                this.table.deleteByRecord(row);
            }
        }

        async modify(
            update:
                | Record<string, unknown>
                | ((
                      record: Record<string, unknown>,
                      ref: { value: Record<string, unknown> }
                  ) => void)
        ) {
            const matches = this.getMatches();
            for (const row of matches) {
                if (typeof update === 'function') {
                    update(row, { value: row });
                } else {
                    Object.assign(row, update);
                }
                this.table.upsertByRecord(row);
            }
        }
    }

    class FakeTable {
        private readonly rows = new Map<string, Record<string, unknown>>();

        private keyFor(record: Record<string, unknown>) {
            return String(record.id ?? record.diagramId);
        }

        getAll() {
            return [...this.rows.values()];
        }

        upsertByRecord(record: Record<string, unknown>) {
            this.rows.set(this.keyFor(record), { ...record });
        }

        deleteByRecord(record: Record<string, unknown>) {
            this.rows.delete(this.keyFor(record));
        }

        async add(record: Record<string, unknown>) {
            this.upsertByRecord(record);
            return this.keyFor(record);
        }

        async put(record: Record<string, unknown>) {
            this.upsertByRecord(record);
            return this.keyFor(record);
        }

        async bulkPut(records: Record<string, unknown>[]) {
            records.forEach((record) => this.upsertByRecord(record));
        }

        async get(query: string | number | Record<string, unknown>) {
            if (typeof query === 'string' || typeof query === 'number') {
                return this.rows.get(String(query));
            }

            return this.getAll().find((row) =>
                Object.entries(query).every(
                    ([key, value]) => row[key] === value
                )
            );
        }

        async update(id: string | number, attributes: Record<string, unknown>) {
            const key = String(id);
            const existing = this.rows.get(key);
            if (!existing) {
                return 0;
            }

            this.rows.set(key, { ...existing, ...attributes });
            return 1;
        }

        async delete(id: string | number) {
            this.rows.delete(String(id));
        }

        async clear() {
            this.rows.clear();
        }

        async toArray() {
            return this.getAll();
        }

        where(query: string | Record<string, unknown>) {
            if (typeof query === 'string') {
                return {
                    equals: (value: unknown) =>
                        new FakeCollection(this, query, value),
                };
            }

            return {
                delete: async () => {
                    const matches = this.getAll().filter((row) =>
                        Object.entries(query).every(
                            ([key, value]) => row[key] === value
                        )
                    );
                    for (const row of matches) {
                        this.deleteByRecord(row);
                    }
                },
            };
        }

        toCollection() {
            return {
                modify: async () => undefined,
            };
        }
    }

    class FakeDexie {
        diagrams = new FakeTable();
        db_tables = new FakeTable();
        db_relationships = new FakeTable();
        db_dependencies = new FakeTable();
        areas = new FakeTable();
        db_custom_types = new FakeTable();
        notes = new FakeTable();
        config = new FakeTable();
        diagram_filters = new FakeTable();

        constructor(...args: unknown[]) {
            void args;
        }

        version(...args: unknown[]) {
            void args;
            const api = {
                stores: (...storesArgs: unknown[]) => {
                    void storesArgs;
                    return api;
                },
                upgrade: (...upgradeArgs: unknown[]) => {
                    void upgradeArgs;
                    return api;
                },
            };
            return api;
        }

        on(...args: unknown[]) {
            void args;
            return undefined;
        }
    }

    return {
        default: FakeDexie,
    };
});

vi.mock('@/hooks/use-auth', () => ({
    useAuth: () => ({
        user: mockState.user,
    }),
}));

vi.mock('@/lib/supabase/client', () => ({
    getSupabaseClient: () => mockState.supabase as never,
}));

vi.mock('@/components/toast/use-toast', () => ({
    toast: vi.fn(),
}));

const createSupabaseStub = (params: {
    shouldFailRef: { value: boolean };
    errorMessage?: string;
}) => {
    const { shouldFailRef, errorMessage = 'bootstrap failed' } = params;
    const realtimeChannel = {
        on: vi.fn(),
        subscribe: vi.fn(),
    };
    realtimeChannel.on.mockReturnValue(realtimeChannel);
    realtimeChannel.subscribe.mockReturnValue(realtimeChannel);

    const responseForTable = (table: string) => {
        if (table === 'diagram_snapshots' && shouldFailRef.value) {
            return {
                data: null,
                error: new Error(errorMessage),
            };
        }

        if (table === 'user_configs') {
            return {
                data: null,
                error: null,
            };
        }

        return {
            data: [],
            error: null,
        };
    };

    return {
        from: vi.fn((table: string) => ({
            select: vi.fn(() => {
                if (table === 'user_configs') {
                    return {
                        eq: vi.fn(() => ({
                            maybeSingle: vi
                                .fn()
                                .mockResolvedValue(responseForTable(table)),
                        })),
                    };
                }

                if (table === 'diagram_snapshots') {
                    return Promise.resolve(responseForTable(table));
                }

                return {
                    eq: vi.fn().mockResolvedValue(responseForTable(table)),
                };
            }),
            upsert: vi.fn().mockResolvedValue({ error: null }),
            delete: vi.fn(() => ({
                eq: vi.fn(() => ({
                    eq: vi.fn().mockResolvedValue({ error: null }),
                })),
            })),
        })),
        channel: vi.fn(() => realtimeChannel),
        removeChannel: vi.fn().mockResolvedValue({}),
    };
};

const createDiagram = (id: string): Diagram => ({
    id,
    name: `Diagram ${id}`,
    databaseType: DatabaseType.GENERIC,
    createdAt: new Date(),
    updatedAt: new Date(),
});

let latestStorage: StorageContext | null = null;
let statusHistory: StorageContext['storageInitStatus'][] = [];

const StorageProbe: React.FC = () => {
    const storage = useStorage();
    latestStorage = storage;

    useEffect(() => {
        statusHistory.push(storage.storageInitStatus);
    }, [storage.storageInitStatus]);

    return (
        <>
            <div data-testid="status">{storage.storageInitStatus}</div>
            <div data-testid="error">{storage.storageInitError ?? ''}</div>
        </>
    );
};

describe('StorageProvider initialization', () => {
    beforeEach(async () => {
        vi.clearAllMocks();
        localStorage.clear();
        mockState.user = null;
        mockState.supabase = null;
        latestStorage = null;
        statusHistory = [];
    });

    it('transitions to ready after initialization succeeds', async () => {
        mockState.user = { id: 'user-1' };
        mockState.supabase = null;

        render(
            <StorageProvider>
                <StorageProbe />
            </StorageProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('status')).toHaveTextContent('ready');
        });

        expect(statusHistory).toContain('initializing');
        expect(statusHistory).toContain('ready');
    });

    it('transitions to error when bootstrap fails', async () => {
        mockState.user = { id: 'user-1' };
        mockState.supabase = createSupabaseStub({
            shouldFailRef: { value: true },
            errorMessage: 'bootstrap failed',
        });

        render(
            <StorageProvider>
                <StorageProbe />
            </StorageProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('status')).toHaveTextContent('error');
        });
        expect(screen.getByTestId('error')).toHaveTextContent(
            'bootstrap failed'
        );
    });

    it('recovers to ready after retry succeeds', async () => {
        const shouldFailRef = { value: true };
        mockState.user = { id: 'user-1' };
        mockState.supabase = createSupabaseStub({
            shouldFailRef,
            errorMessage: 'bootstrap failed',
        });

        render(
            <StorageProvider>
                <StorageProbe />
            </StorageProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('status')).toHaveTextContent('error');
        });

        shouldFailRef.value = false;
        await act(async () => {
            void latestStorage?.retryStorageInitialization();
        });

        await waitFor(() => {
            expect(screen.getByTestId('status')).toHaveTextContent('ready');
        });
    });

    it('keeps local data when bootstrap fetch fails', async () => {
        const shouldFailRef = { value: true };
        mockState.user = null;
        mockState.supabase = createSupabaseStub({
            shouldFailRef,
            errorMessage: 'bootstrap failed',
        });

        const { rerender } = render(
            <StorageProvider>
                <StorageProbe />
            </StorageProvider>
        );

        await waitFor(() => {
            expect(latestStorage).not.toBeNull();
        });

        await act(async () => {
            await latestStorage?.addDiagram({
                diagram: createDiagram('local-diagram'),
            });
        });

        const beforeLogin = await latestStorage?.listDiagrams();
        expect(beforeLogin ?? []).toHaveLength(1);

        mockState.user = { id: 'user-1' };
        rerender(
            <StorageProvider>
                <StorageProbe />
            </StorageProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('status')).toHaveTextContent('error');
        });

        const afterFailure = await latestStorage?.listDiagrams();
        expect(afterFailure ?? []).toHaveLength(1);
    });
});
