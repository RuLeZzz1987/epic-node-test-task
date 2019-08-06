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

        if not exists (select 1 from developer) then
            insert into developer (id, slug, name) values
            ('57c3b60c-23f6-4895-b8dc-6049f70d31ed', 'jjelm', 'John Elm'),
            ('570fbd7a-fbbb-4eb9-b24d-bb8bd753ead5', 'bknut', 'Boris Knut'),
            ('aa067f24-47b0-4580-a83f-1096119bed41', 'emi', 'Elli Mi');
        end if;

        if not exists (select 1 from game) then
            insert into game (id, developer_id, publisher_id, name, slug) values
            ('67a40797-b0b0-4e4c-8fbe-285a02445e41', '57c3b60c-23f6-4895-b8dc-6049f70d31ed', 'ea396a58-7b7b-46b0-8c2a-029d0828f512', 'Unreal Tournament', 'unreal-tournament'),
            ('bae03278-b702-4d04-ac89-93a35670cf71', '57c3b60c-23f6-4895-b8dc-6049f70d31ed', 'ea396a58-7b7b-46b0-8c2a-029d0828f512', 'Zone 66', 'zone-66'),
            ('dc5b2cd0-3296-4f3b-a8e2-a95d26cb1122', '570fbd7a-fbbb-4eb9-b24d-bb8bd753ead5', 'f3ac3539-133e-45e9-8410-7a322548065c', 'Metal Gear Solid', 'mgs'),
            ('dc5b2cd0-3296-4f3b-a8e2-a95d26cb4322', '570fbd7a-fbbb-4eb9-b24d-bb8bd753ead5', 'f3ac3539-133e-45e9-8410-7a322548065c', 'Contra', 'contra');
        end if;

        if not exists (select 1 from game_developer) then
            insert into game_developer (id, game_id, developer_id) values
            (1, '67a40797-b0b0-4e4c-8fbe-285a02445e41', 'aa067f24-47b0-4580-a83f-1096119bed41'),
            (2, 'bae03278-b702-4d04-ac89-93a35670cf71', 'aa067f24-47b0-4580-a83f-1096119bed41');
        end if;

        if not exists (select 1 from game_publisher) then
            insert into game_publisher (id, game_id, publisher_id) values
            (1, 'dc5b2cd0-3296-4f3b-a8e2-a95d26cb1122', '4f6de11d-aadf-4246-8c04-0feb7535d3a8'),
            (2, 'bae03278-b702-4d04-ac89-93a35670cf71', '4f6de11d-aadf-4246-8c04-0feb7535d3a8');
        end if;

        if not exists (select 1 from player_game) then
            insert into player_game (id, game_id, player_id) values
            (1, '67a40797-b0b0-4e4c-8fbe-285a02445e41', 'eade1f90-13d6-4575-9948-228e4625030d'),
            (2, 'bae03278-b702-4d04-ac89-93a35670cf71', 'eade1f90-13d6-4575-9948-228e4625030d'),
            (3, '67a40797-b0b0-4e4c-8fbe-285a02445e41', '9b551b96-b811-4020-b8a6-6b981eaa38f4');
        end if;

    end
$$