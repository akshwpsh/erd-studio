insert into storage.buckets (id, name, public)
values ('profile-images', 'profile-images', true)
on conflict (id) do update set public = excluded.public;


drop policy if exists profile_images_public_read on storage.objects;
drop policy if exists profile_images_user_insert on storage.objects;
drop policy if exists profile_images_user_update on storage.objects;
drop policy if exists profile_images_user_delete on storage.objects;

create policy profile_images_public_read
    on storage.objects for select
    using (bucket_id = 'profile-images');

create policy profile_images_user_insert
    on storage.objects for insert
    with check (
        bucket_id = 'profile-images'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy profile_images_user_update
    on storage.objects for update
    using (
        bucket_id = 'profile-images'
        and (storage.foldername(name))[1] = auth.uid()::text
    )
    with check (
        bucket_id = 'profile-images'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy profile_images_user_delete
    on storage.objects for delete
    using (
        bucket_id = 'profile-images'
        and (storage.foldername(name))[1] = auth.uid()::text
    );
