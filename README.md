# Assignment

This assignment consists of working on the different components of typical Node.js REST service. The domain of the REST service is
working with data about games and players. We encourage you to spend no more than 4 hours on this task. You will be evaluated based on the quality of the code.

What we look for when evaluating code quality:

- Logical organization: Is the project easy to reason about? How fast can someone new familiarize themselves with the project as it grows?
- Clarity: Is the purpose of a function or variable reasonably understood from its name? Are functions and methods easy to reason about?
- Brevity: How simple is the code? Organization and clarity are not to be sacrificed for fewer lines of code.

## Tasks

Below is the list of tasks to work on. Accomplish as much as possible within 4 hours. If you don't have time to finish everything, you can outline your ideas as comments in code or use `IMPROVEMENTS.md`.

- [x] Creating database migrations
  - [x] In `migrations_tables.sql` write SQL for creating tables according `migrations/ERD.png` diagram
  - [x] In `migrations_data.sql` write SQL for populating tables with dummy data. See below the instructions on how to work with the database and migrations.
- [ ] Implement API endpoints
  - [ ] CRUD APIs for the `game` entity
  - [ ] POST API for creating a game, developer and publisher at once
  - [ ] GET API for fetching data about a player, its games, its developers and publishers at once
  - [ ] GET /external/ API endpoint. In that handler, you will need to demonstrate how you would implement querying 3 external services and gather the response into the following format:
    ```
    {
        "service1": {"success": true, ...service1ResponseData},
        "service2": {"success": true, ...service2ResponseData},
        "service3": {"success": true, ...service3ResponseData}
    }
    ```
    If one of the requests fails then the value for corresponding key should be just {"success": false}
    Note that the implementation should allow a user to easily debug which service request failed and the reason of failure.
    For emulating HTTP requests, you can use services like https://www.mocky.io/, but more ideal would be use [nock](https://github.com/nock/nock) library.
- [ ] Logging of all database SQL queries
- [ ] Logging of all HTTP requests to external services - log method and url, log response status code
- [ ] Tests

The goal of this assignment is to demonstrate skills on:

- code organization
- application readiness for troubleshooting problems
- REST API design
- maintainability
- extendability

The knowledge and astute usage of JavaScript helper functions, object methods, and Node.js built-in libs are evaluated as well, but with less focus.

Some things to consider:

- When adding logging, think about a solution that can be easily maintained when app grows.
- When working with querying external services, think how we can make querying code reusable and maintainable when application grows to work with 100 internal services.
- When working with database queries, think how we can make querying code reusable.

Requirements for assignment submission:

- Before starting the work, initialize project with git `git init`
- Keep track of your code changes in git with clear commit message. _Projects that do not include a git history will not be accepted._
- Add the following to the IMPROVEMENTS.md file:
  - Brief description of changes you made. If you did not have enough time to implement something the "right" way (e.g. implementation of some API
    endpoint), but know how it must be implemented in a production ready application, tell about that here.
  - Thoughts on further improvements and project enhancements. Be as detailed as possible, if you think there are some obvious things not worth mentioning, it's better to still mention them.
  - Security checklist that given app should go through. What are the things security-wise need to be checked in the deployment setup, Node.js application code, etc.?

If you haven't completed everything within 4 hours, please still submit the work you completed. You still be evaluated according to our assignment review system.

## Dev environment

To start:

```
=# docker-compose run --service-ports web-dev
// then inside container
/www=# yarn install
/www=# yarn dev
Example app listening on port 3000!
```

To clean containers and start from scratch

```
// exit from container
// To delete containers created by docker-compose and start dev environment from scratch
=# docker-compose down
=# docker-compose run --service-ports web-dev
```

To work with migrations and database

```
// exit from container and clean containers created by docker-compose
// Go to db-migrate container
=# docker-compose run --entrypoint=/bin/bash db-migrate
// while inside container, apply migrations
/home/migrations=# /home/migrations/migrate.sh
// get into Postgres shell
=# psql -h postgres-test -U postgres -d rest_service
// check migrations are applied correctly
rest_service=#\dt
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | dummy | table | postgres
```
