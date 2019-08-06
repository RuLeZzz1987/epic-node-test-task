CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS dummy (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY
);

