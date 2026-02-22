import type { ChartDBConfig } from '@/lib/domain/config';
import { DatabaseEdition } from '@/lib/domain/database-edition';
import { DatabaseType } from '@/lib/domain/database-type';
import type { DiagramFilter } from '@/lib/domain/diagram-filter/diagram-filter';
import type { Diagram } from '@/lib/domain/diagram';
import type {
    CollaborationRole,
    DiagramFilterCloudInsert,
    DiagramFilterCloudRow,
    DiagramMembershipRow,
    DiagramSnapshotInsert,
    DiagramSnapshotRow,
    DiagramAccessRole,
    UserConfigInsert,
    UserConfigRow,
} from '@/lib/supabase/types';

export const ensureArray = <T>(value: unknown): T[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value as T[];
};

const toDate = (value: Date | string | null | undefined): Date => {
    if (!value) {
        return new Date();
    }

    return value instanceof Date ? value : new Date(value);
};

const parseDatabaseType = (value: unknown): DatabaseType => {
    if (
        typeof value === 'string' &&
        (Object.values(DatabaseType) as string[]).includes(value)
    ) {
        return value as DatabaseType;
    }

    return DatabaseType.GENERIC;
};

const parseDatabaseEdition = (value: unknown): DatabaseEdition | undefined => {
    if (
        typeof value === 'string' &&
        (Object.values(DatabaseEdition) as string[]).includes(value)
    ) {
        return value as DatabaseEdition;
    }

    return undefined;
};

const parseAccessRole = (
    value: unknown,
    fallbackRole: DiagramAccessRole
): DiagramAccessRole => {
    if (value === 'owner' || value === 'editor' || value === 'viewer') {
        return value;
    }

    return fallbackRole;
};

export const getCompositeDiagramKey = (
    ownerUserId: string,
    diagramId: string
): string => {
    return `${ownerUserId}::${diagramId}`;
};

export const parseCompositeDiagramKey = (
    key: string
): { ownerUserId: string; diagramId: string } | null => {
    const separatorIndex = key.indexOf('::');
    if (separatorIndex <= 0 || separatorIndex >= key.length - 2) {
        return null;
    }

    return {
        ownerUserId: key.slice(0, separatorIndex),
        diagramId: key.slice(separatorIndex + 2),
    };
};

export const buildMembershipRoleMap = (
    rows: DiagramMembershipRow[]
): Map<string, CollaborationRole> => {
    const map = new Map<string, CollaborationRole>();
    for (const row of rows) {
        map.set(
            getCompositeDiagramKey(row.owner_user_id, row.diagram_id),
            row.role
        );
    }

    return map;
};

export const diagramToSnapshotRow = (params: {
    userId: string;
    clientInstanceId: string;
    diagram: Diagram;
}): DiagramSnapshotInsert => {
    const { userId, clientInstanceId, diagram } = params;

    return {
        user_id: userId,
        diagram_id: diagram.id,
        name: diagram.name,
        database_type: diagram.databaseType,
        database_edition: diagram.databaseEdition ?? null,
        created_at: toDate(diagram.createdAt).toISOString(),
        updated_at: toDate(diagram.updatedAt).toISOString(),
        tables: ensureArray(diagram.tables),
        relationships: ensureArray(diagram.relationships),
        dependencies: ensureArray(diagram.dependencies),
        areas: ensureArray(diagram.areas),
        custom_types: ensureArray(diagram.customTypes),
        notes: ensureArray(diagram.notes),
        table_count: ensureArray(diagram.tables).length,
        client_instance_id: clientInstanceId,
    };
};

export const snapshotRowToDiagram = (
    row: DiagramSnapshotRow,
    options?: {
        ownerUserId?: string;
        accessRole?: DiagramAccessRole;
    }
): Diagram => {
    const ownerUserId = options?.ownerUserId ?? row.user_id;
    const accessRole = parseAccessRole(
        options?.accessRole,
        ownerUserId === row.user_id ? 'owner' : 'viewer'
    );

    return {
        id: row.diagram_id,
        name: row.name,
        ownerUserId,
        accessRole,
        databaseType: parseDatabaseType(row.database_type),
        databaseEdition: parseDatabaseEdition(row.database_edition),
        createdAt: toDate(row.created_at),
        updatedAt: toDate(row.updated_at),
        tables: ensureArray(row.tables),
        relationships: ensureArray(row.relationships),
        dependencies: ensureArray(row.dependencies),
        areas: ensureArray(row.areas),
        customTypes: ensureArray(row.custom_types),
        notes: ensureArray(row.notes),
    };
};

export const configToRow = (params: {
    userId: string;
    clientInstanceId: string;
    config?: ChartDBConfig;
}): UserConfigInsert => {
    const { userId, clientInstanceId, config } = params;

    return {
        user_id: userId,
        default_diagram_id: config?.defaultDiagramId ?? '',
        export_actions: config?.exportActions
            ? config.exportActions.map((date) => toDate(date).toISOString())
            : null,
        client_instance_id: clientInstanceId,
    };
};

export const rowToConfig = (row?: UserConfigRow): ChartDBConfig => {
    return {
        defaultDiagramId: row?.default_diagram_id ?? '',
        exportActions: row?.export_actions
            ? row.export_actions.map((dateString) => toDate(dateString))
            : undefined,
    };
};

export const filterToRow = (params: {
    userId: string;
    clientInstanceId: string;
    diagramId: string;
    filter: DiagramFilter;
}): DiagramFilterCloudInsert => {
    const { userId, clientInstanceId, diagramId, filter } = params;

    return {
        user_id: userId,
        diagram_id: diagramId,
        schema_ids: filter.schemaIds ?? null,
        table_ids: filter.tableIds ?? null,
        client_instance_id: clientInstanceId,
    };
};

export const rowToFilter = (row: DiagramFilterCloudRow): DiagramFilter => {
    return {
        schemaIds: row.schema_ids ?? undefined,
        tableIds: row.table_ids ?? undefined,
    };
};

export const serializeSet = (set: Set<string>): string => {
    return JSON.stringify(Array.from(set));
};

export const deserializeSet = (value: string | null): Set<string> => {
    if (!value) {
        return new Set<string>();
    }

    try {
        const parsedValue = JSON.parse(value);
        if (!Array.isArray(parsedValue)) {
            return new Set<string>();
        }

        return new Set<string>(
            parsedValue.filter(
                (item): item is string => typeof item === 'string'
            )
        );
    } catch {
        return new Set<string>();
    }
};

export const shouldIgnoreSelfEvent = (
    eventClientInstanceId: string | null | undefined,
    localClientInstanceId: string
): boolean => {
    return (
        typeof eventClientInstanceId === 'string' &&
        eventClientInstanceId.length > 0 &&
        eventClientInstanceId === localClientInstanceId
    );
};

const retryBackoffMs = [2000, 5000, 15000, 30000] as const;

export const getRetryBackoffMs = (attempt: number): number => {
    if (attempt <= 0) {
        return retryBackoffMs[0];
    }

    const index = Math.min(attempt - 1, retryBackoffMs.length - 1);
    return retryBackoffMs[index];
};
