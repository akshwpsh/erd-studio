import type { Area } from '@/lib/domain/area';
import type { ChartDBConfig } from '@/lib/domain/config';
import type { DBCustomType } from '@/lib/domain/db-custom-type';
import type { DBDependency } from '@/lib/domain/db-dependency';
import type { DBRelationship } from '@/lib/domain/db-relationship';
import type { DBTable } from '@/lib/domain/db-table';
import type { DiagramFilter } from '@/lib/domain/diagram-filter/diagram-filter';
import type { Diagram } from '@/lib/domain/diagram';
import type { Note } from '@/lib/domain/note';

export type CollaborationRole = 'editor' | 'viewer';
export type DiagramAccessRole = 'owner' | CollaborationRole;
export type DiagramInvitationStatus =
    | 'pending'
    | 'accepted'
    | 'revoked'
    | 'expired';

export interface DiagramSnapshotRow {
    user_id: string;
    diagram_id: string;
    name: string;
    database_type: string;
    database_edition: string | null;
    created_at: string;
    updated_at: string;
    tables: DBTable[];
    relationships: DBRelationship[];
    dependencies: DBDependency[];
    areas: Area[];
    custom_types: DBCustomType[];
    notes: Note[];
    table_count: number;
    client_instance_id: string | null;
}

export interface UserConfigRow {
    user_id: string;
    default_diagram_id: string;
    export_actions: string[] | null;
    updated_at: string;
    client_instance_id: string | null;
}

export interface DiagramFilterCloudRow {
    user_id: string;
    diagram_id: string;
    schema_ids: string[] | null;
    table_ids: string[] | null;
    updated_at: string;
    client_instance_id: string | null;
}

export interface DiagramMembershipRow {
    owner_user_id: string;
    diagram_id: string;
    member_user_id: string;
    role: CollaborationRole;
    invited_by_user_id: string;
    created_at: string;
    updated_at: string;
}

export interface DiagramInvitationRow {
    invitation_id: string;
    owner_user_id: string;
    diagram_id: string;
    invitee_email: string;
    role: CollaborationRole;
    status: DiagramInvitationStatus;
    invite_token: string;
    invited_by_user_id: string;
    accepted_by_user_id: string | null;
    expires_at: string;
    created_at: string;
    updated_at: string;
}

export interface AcceptDiagramInvitationResult {
    owner_user_id: string;
    diagram_id: string;
    role: CollaborationRole;
}

export interface DiagramPresenceUser {
    userId: string;
    nickname: string;
    avatarUrl: string | null;
    role: DiagramAccessRole;
    cursor: {
        x: number;
        y: number;
    } | null;
    updatedAt: number;
}

export type DiagramSnapshotInsert = Omit<DiagramSnapshotRow, 'table_count'> & {
    table_count?: number;
};

export type UserConfigInsert = Omit<UserConfigRow, 'updated_at'> & {
    updated_at?: string;
};

export type DiagramFilterCloudInsert = Omit<
    DiagramFilterCloudRow,
    'updated_at'
> & {
    updated_at?: string;
};

export interface CloudBootstrapData {
    diagrams: DiagramSnapshotRow[];
    config?: UserConfigRow;
    filters: DiagramFilterCloudRow[];
}

export interface SyncQueueState {
    dirtyDiagramIds: Set<string>;
    deletedDiagramIds: Set<string>;
    dirtyFilterDiagramIds: Set<string>;
    dirtyConfig: boolean;
}

export interface LocalDiagramSnapshot {
    diagram: Diagram;
    filter?: DiagramFilter;
    config?: ChartDBConfig;
}
