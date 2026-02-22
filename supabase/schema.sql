create table if not exists public.diagram_snapshots (
    user_id uuid not null,
    diagram_id text not null,
    name text not null,
    database_type text not null,
    database_edition text null,
    created_at timestamptz not null,
    updated_at timestamptz not null,
    tables jsonb not null default '[]'::jsonb,
    relationships jsonb not null default '[]'::jsonb,
    dependencies jsonb not null default '[]'::jsonb,
    areas jsonb not null default '[]'::jsonb,
    custom_types jsonb not null default '[]'::jsonb,
    notes jsonb not null default '[]'::jsonb,
    table_count int not null default 0,
    client_instance_id text null,
    constraint diagram_snapshots_pkey primary key (user_id, diagram_id)
);

create index if not exists diagram_snapshots_user_id_updated_at_idx
    on public.diagram_snapshots (user_id, updated_at desc);

create table if not exists public.user_configs (
    user_id uuid primary key,
    default_diagram_id text not null default '',
    export_actions jsonb null,
    updated_at timestamptz not null default now(),
    client_instance_id text null
);

create table if not exists public.diagram_filters_cloud (
    user_id uuid not null,
    diagram_id text not null,
    schema_ids text[] null,
    table_ids text[] null,
    updated_at timestamptz not null default now(),
    client_instance_id text null,
    constraint diagram_filters_cloud_pkey primary key (user_id, diagram_id)
);

alter table public.diagram_snapshots enable row level security;
alter table public.user_configs enable row level security;
alter table public.diagram_filters_cloud enable row level security;

drop policy if exists diagram_snapshots_select on public.diagram_snapshots;
drop policy if exists diagram_snapshots_insert on public.diagram_snapshots;
drop policy if exists diagram_snapshots_update on public.diagram_snapshots;
drop policy if exists diagram_snapshots_delete on public.diagram_snapshots;

drop policy if exists user_configs_select on public.user_configs;
drop policy if exists user_configs_insert on public.user_configs;
drop policy if exists user_configs_update on public.user_configs;
drop policy if exists user_configs_delete on public.user_configs;

drop policy if exists diagram_filters_cloud_select on public.diagram_filters_cloud;
drop policy if exists diagram_filters_cloud_insert on public.diagram_filters_cloud;
drop policy if exists diagram_filters_cloud_update on public.diagram_filters_cloud;
drop policy if exists diagram_filters_cloud_delete on public.diagram_filters_cloud;

create policy diagram_snapshots_select
    on public.diagram_snapshots for select
    using (auth.uid() = user_id);

create policy diagram_snapshots_insert
    on public.diagram_snapshots for insert
    with check (auth.uid() = user_id);

create policy diagram_snapshots_update
    on public.diagram_snapshots for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy diagram_snapshots_delete
    on public.diagram_snapshots for delete
    using (auth.uid() = user_id);

create policy user_configs_select
    on public.user_configs for select
    using (auth.uid() = user_id);

create policy user_configs_insert
    on public.user_configs for insert
    with check (auth.uid() = user_id);

create policy user_configs_update
    on public.user_configs for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy user_configs_delete
    on public.user_configs for delete
    using (auth.uid() = user_id);

create policy diagram_filters_cloud_select
    on public.diagram_filters_cloud for select
    using (auth.uid() = user_id);

create policy diagram_filters_cloud_insert
    on public.diagram_filters_cloud for insert
    with check (auth.uid() = user_id);

create policy diagram_filters_cloud_update
    on public.diagram_filters_cloud for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy diagram_filters_cloud_delete
    on public.diagram_filters_cloud for delete
    using (auth.uid() = user_id);
