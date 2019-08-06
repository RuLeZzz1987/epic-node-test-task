### Improvements

- I suppose `publisher_id` in `game_developer` table is an issue produced by "copy/paste". So I used `developer_id` field name instead suggested `publisher_id`
- From db schema for me left unclear why game has FK on developer and publisher at the same time with connection tables for storing many to many relations. I decided to use this fields for game company founder and lead developer and connected tables for developers and publishers who as well has taken part in development and publishing process.
