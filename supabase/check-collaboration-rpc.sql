-- Verify collaboration RPC functions exist with expected signatures.
select
  n.nspname as schema,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as identity_args
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('create_diagram_invitation', 'accept_diagram_invitation')
order by p.proname, identity_args;

-- Verify execute grants for anon/authenticated.
select
  routine_schema,
  routine_name,
  grantee,
  privilege_type
from information_schema.routine_privileges
where routine_schema = 'public'
  and routine_name in ('create_diagram_invitation', 'accept_diagram_invitation')
  and grantee in ('anon', 'authenticated')
order by routine_name, grantee, privilege_type;
