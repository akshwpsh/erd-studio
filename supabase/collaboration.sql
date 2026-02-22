create extension if not exists pgcrypto;

create table if not exists public.diagram_memberships (
    owner_user_id uuid not null,
    diagram_id text not null,
    member_user_id uuid not null,
    role text not null check (role in ('editor', 'viewer')),
    invited_by_user_id uuid not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint diagram_memberships_pkey
        primary key (owner_user_id, diagram_id, member_user_id)
);

create index if not exists diagram_memberships_member_user_updated_idx
    on public.diagram_memberships (member_user_id, updated_at desc);

create index if not exists diagram_memberships_owner_diagram_idx
    on public.diagram_memberships (owner_user_id, diagram_id);

create table if not exists public.diagram_invitations (
    invitation_id uuid primary key default gen_random_uuid(),
    owner_user_id uuid not null,
    diagram_id text not null,
    invitee_email text not null,
    role text not null check (role in ('editor', 'viewer')),
    status text not null default 'pending'
        check (status in ('pending', 'accepted', 'revoked', 'expired')),
    invite_token text not null unique,
    invited_by_user_id uuid not null,
    accepted_by_user_id uuid null,
    expires_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create unique index if not exists diagram_invitations_pending_unique_idx
    on public.diagram_invitations (owner_user_id, diagram_id, lower(invitee_email))
    where status = 'pending';

create index if not exists diagram_invitations_owner_diagram_idx
    on public.diagram_invitations (owner_user_id, diagram_id, updated_at desc);

create index if not exists diagram_invitations_token_idx
    on public.diagram_invitations (invite_token);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists touch_diagram_memberships_updated_at on public.diagram_memberships;
create trigger touch_diagram_memberships_updated_at
before update on public.diagram_memberships
for each row
execute function public.touch_updated_at();

drop trigger if exists touch_diagram_invitations_updated_at on public.diagram_invitations;
create trigger touch_diagram_invitations_updated_at
before update on public.diagram_invitations
for each row
execute function public.touch_updated_at();

create or replace function public.prevent_diagram_snapshot_identity_update()
returns trigger
language plpgsql
as $$
begin
    if old.user_id <> new.user_id or old.diagram_id <> new.diagram_id then
        raise exception 'diagram_snapshots identity columns cannot be changed';
    end if;

    return new;
end;
$$;

drop trigger if exists diagram_snapshots_identity_guard on public.diagram_snapshots;
create trigger diagram_snapshots_identity_guard
before update on public.diagram_snapshots
for each row
execute function public.prevent_diagram_snapshot_identity_update();

alter table public.diagram_memberships enable row level security;
alter table public.diagram_invitations enable row level security;

-- Rework diagram_snapshots policies for collaboration access.
drop policy if exists diagram_snapshots_select on public.diagram_snapshots;
drop policy if exists diagram_snapshots_insert on public.diagram_snapshots;
drop policy if exists diagram_snapshots_update on public.diagram_snapshots;
drop policy if exists diagram_snapshots_delete on public.diagram_snapshots;

create policy diagram_snapshots_select
    on public.diagram_snapshots for select
    using (
        auth.uid() = user_id
        or exists (
            select 1
            from public.diagram_memberships dm
            where dm.owner_user_id = diagram_snapshots.user_id
              and dm.diagram_id = diagram_snapshots.diagram_id
              and dm.member_user_id = auth.uid()
        )
    );

create policy diagram_snapshots_insert
    on public.diagram_snapshots for insert
    with check (auth.uid() = user_id);

create policy diagram_snapshots_update
    on public.diagram_snapshots for update
    using (
        auth.uid() = user_id
        or exists (
            select 1
            from public.diagram_memberships dm
            where dm.owner_user_id = diagram_snapshots.user_id
              and dm.diagram_id = diagram_snapshots.diagram_id
              and dm.member_user_id = auth.uid()
              and dm.role = 'editor'
        )
    )
    with check (
        auth.uid() = user_id
        or exists (
            select 1
            from public.diagram_memberships dm
            where dm.owner_user_id = diagram_snapshots.user_id
              and dm.diagram_id = diagram_snapshots.diagram_id
              and dm.member_user_id = auth.uid()
              and dm.role = 'editor'
        )
    );

create policy diagram_snapshots_delete
    on public.diagram_snapshots for delete
    using (auth.uid() = user_id);

-- Membership RLS.
drop policy if exists diagram_memberships_select on public.diagram_memberships;
drop policy if exists diagram_memberships_insert on public.diagram_memberships;
drop policy if exists diagram_memberships_update on public.diagram_memberships;
drop policy if exists diagram_memberships_delete on public.diagram_memberships;

create policy diagram_memberships_select
    on public.diagram_memberships for select
    using (
        auth.uid() = owner_user_id
        or auth.uid() = member_user_id
    );

create policy diagram_memberships_insert
    on public.diagram_memberships for insert
    with check (auth.uid() = owner_user_id);

create policy diagram_memberships_update
    on public.diagram_memberships for update
    using (auth.uid() = owner_user_id)
    with check (auth.uid() = owner_user_id);

create policy diagram_memberships_delete
    on public.diagram_memberships for delete
    using (auth.uid() = owner_user_id);

-- Invitation RLS.
drop policy if exists diagram_invitations_select on public.diagram_invitations;
drop policy if exists diagram_invitations_insert on public.diagram_invitations;
drop policy if exists diagram_invitations_update on public.diagram_invitations;
drop policy if exists diagram_invitations_delete on public.diagram_invitations;

create policy diagram_invitations_select
    on public.diagram_invitations for select
    using (
        auth.uid() = owner_user_id
        or (
            status = 'pending'
            and lower(invitee_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        )
    );

create policy diagram_invitations_insert
    on public.diagram_invitations for insert
    with check (auth.uid() = owner_user_id);

create policy diagram_invitations_update
    on public.diagram_invitations for update
    using (auth.uid() = owner_user_id)
    with check (auth.uid() = owner_user_id);

create policy diagram_invitations_delete
    on public.diagram_invitations for delete
    using (auth.uid() = owner_user_id);

create or replace function public.create_diagram_invitation(
    p_owner_user_id uuid,
    p_diagram_id text,
    p_invitee_email text,
    p_role text
)
returns public.diagram_invitations
language plpgsql
security definer
set search_path = public
as $$
declare
    v_email text;
    v_now timestamptz := now();
    v_expires_at timestamptz := v_now + interval '7 days';
    v_token text := encode(gen_random_bytes(24), 'hex');
    v_row public.diagram_invitations;
begin
    if auth.uid() is null then
        raise exception 'Not authenticated';
    end if;

    if auth.uid() <> p_owner_user_id then
        raise exception 'Only owner can invite';
    end if;

    if p_role not in ('editor', 'viewer') then
        raise exception 'Invalid role';
    end if;

    v_email := lower(trim(p_invitee_email));
    if v_email = '' then
        raise exception 'Invitee email is required';
    end if;

    if not exists (
        select 1
        from public.diagram_snapshots ds
        where ds.user_id = p_owner_user_id
          and ds.diagram_id = p_diagram_id
    ) then
        raise exception 'Diagram not found';
    end if;

    update public.diagram_invitations di
       set role = p_role,
           status = 'pending',
           invite_token = v_token,
           invited_by_user_id = auth.uid(),
           accepted_by_user_id = null,
           expires_at = v_expires_at,
           updated_at = v_now
     where di.owner_user_id = p_owner_user_id
       and di.diagram_id = p_diagram_id
       and lower(di.invitee_email) = v_email
       and di.status = 'pending'
    returning di.* into v_row;

    if v_row.invitation_id is null then
        insert into public.diagram_invitations (
            owner_user_id,
            diagram_id,
            invitee_email,
            role,
            status,
            invite_token,
            invited_by_user_id,
            expires_at
        )
        values (
            p_owner_user_id,
            p_diagram_id,
            v_email,
            p_role,
            'pending',
            v_token,
            auth.uid(),
            v_expires_at
        )
        returning * into v_row;
    end if;

    return v_row;
end;
$$;

grant execute on function public.create_diagram_invitation(uuid, text, text, text) to anon, authenticated;

create or replace function public.accept_diagram_invitation(
    p_invite_token text
)
returns table (
    owner_user_id uuid,
    diagram_id text,
    role text
)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_invite public.diagram_invitations;
    v_email text;
begin
    if auth.uid() is null then
        raise exception 'Not authenticated';
    end if;

    v_email := lower(coalesce(auth.jwt() ->> 'email', ''));

    select *
      into v_invite
      from public.diagram_invitations di
     where di.invite_token = p_invite_token
     for update;

    if v_invite.invitation_id is null then
        raise exception 'Invitation not found';
    end if;

    if v_invite.status <> 'pending' then
        raise exception 'Invitation is not pending';
    end if;

    if v_invite.expires_at < now() then
        update public.diagram_invitations
           set status = 'expired'
         where invitation_id = v_invite.invitation_id;
        raise exception 'Invitation expired';
    end if;

    if lower(v_invite.invitee_email) <> v_email then
        raise exception 'Invitation email mismatch';
    end if;

    if not exists (
        select 1
          from public.diagram_snapshots ds
         where ds.user_id = v_invite.owner_user_id
           and ds.diagram_id = v_invite.diagram_id
    ) then
        raise exception 'Diagram no longer exists';
    end if;

    insert into public.diagram_memberships (
        owner_user_id,
        diagram_id,
        member_user_id,
        role,
        invited_by_user_id
    )
    values (
        v_invite.owner_user_id,
        v_invite.diagram_id,
        auth.uid(),
        v_invite.role,
        v_invite.invited_by_user_id
    )
    on conflict (owner_user_id, diagram_id, member_user_id)
    do update set
        role = excluded.role,
        invited_by_user_id = excluded.invited_by_user_id,
        updated_at = now();

    update public.diagram_invitations
       set status = 'accepted',
           accepted_by_user_id = auth.uid(),
           updated_at = now()
     where invitation_id = v_invite.invitation_id;

    return query
    select v_invite.owner_user_id, v_invite.diagram_id, v_invite.role;
end;
$$;

grant execute on function public.accept_diagram_invitation(text) to anon, authenticated;

do $$
begin
    if exists (
        select 1
        from pg_publication
        where pubname = 'supabase_realtime'
    ) then
        begin
            alter publication supabase_realtime add table public.diagram_memberships;
        exception when duplicate_object then
            null;
        end;

        begin
            alter publication supabase_realtime add table public.diagram_invitations;
        exception when duplicate_object then
            null;
        end;
    end if;
end;
$$;
