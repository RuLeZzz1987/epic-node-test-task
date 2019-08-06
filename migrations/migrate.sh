#!/usr/bin/env bash

# Let dependent postgres-test container to start correctly
sleep 5

psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_NAME -a -f /home/migrations/migrations_tables.sql
psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_NAME -a -f /home/migrations/migrations_data.sql

# TIP: While working on creating migrations for tables, you might need to be able to iterate frequently. You can do `docker-compose down && docker-compose run --entrypoint=/bin/bash db-migrate`
# or create script with necessary SQL statements to clean database.
