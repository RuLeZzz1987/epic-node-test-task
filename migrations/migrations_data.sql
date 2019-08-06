do $$
    begin
        if not exists (select 1 from player) then
            insert into player (id, last_seen, display_name, email) values
            ('eade1f90-13d6-4575-9948-228e4625030d', now(), 'aveing', 'aveing@mailinator.com'),
            ('9b551b96-b811-4020-b8a6-6b981eaa38f4', now(), 'hollaolla', 'hollaolla@mailinator.com'),
            ('fd253a35-0c1f-4da8-8ce7-0bb17e4078a1', now(), 'fiz', 'fiz@mailinator.com');
        end if;

        if not exists (select 1 from publisher) then
            insert into publisher (id, slug, name) values
            ('ea396a58-7b7b-46b0-8c2a-029d0828f512', 'epic-games', 'Epic Games'),
            ('f3ac3539-133e-45e9-8410-7a322548065c', 'konami', 'Konami'),
            ('4f6de11d-aadf-4246-8c04-0feb7535d3a8', 'blizzard', 'Blizzard');
        end if;

    end
$$