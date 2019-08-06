### Improvements

- I suppose `publisher_id` in `game_developer` table is an issue produced by "copy/paste". So I used `developer_id` field name instead suggested `publisher_id`
- From db schema for me left unclear why game has FK on developer and publisher at the same time with connection tables for storing many to many relations. I decided to use this fields for game company founder and lead developer and connected tables for developers and publishers who as well has taken part in development and publishing process.
- I don't use branches for feature implementation just for saving time but in real life nobody should push code directly to master branch 
- Unfortunately I don't have time to add for all tests. I've added just integration tests for game CRUD trying to cover all use cases. Now service experiences lack of business logic, so service layer looks poor and necessity of unit tests is low. In production environment unit tests are needed anyway. Also my tests don't have setup/teardown hooks. I prefer to setup test DB in them, run migrations, populate data, and clean up it totally.
- In future all queries from `game-service`/`player-service` I'd moved to model layer and leave just calls for models inside services focusing services on business rules instead of querying data from DB
- Usually using native DB query in production leads to loosing code readability. From my perspective of view usage of query builder like [knex](http://knexjs.org/) or ORM like [sequelize](https://sequelize.org/) / [typeorm](https://typeorm.io/#/) is more preferable for simplifying DB access, keep and make migrations in clean maintainable way. Shift emphasis from meaningless SQL to domain driven approach.
- Error handler can be implemented better e.g. validation errors should be more user friendly
- Missing any kind of documentation. I prefer [OpenAPI](https://swagger.io/specification/). It gives ability generate clients and use nice UI playground.
- Missing config files. I prefer to use [config](https://www.npmjs.com/package/config) , it allows specify all variables in one place, divide environments like development/test/staging/production, pick all necessary variables from environment variables. All postgres settings should be provided via config files as well as log level settings.
- For production usage API keys should be provided from some kind of [Vault storage](https://www.vaultproject.io/)
- I prefer to write logs using JSON format and in service instance just put them in console. Most of clouds easily read stdout/stderr streams from VM and collect logs from them for future troubleshooting, monitoring, analysis
- Production ready system should have alert notifications about 5XX errors e.g. [sentry](https://sentry.io/welcome/), health check metrics like [newrelic](https://newrelic.com/), setup emergency notification etc.
- As system will grow for dependency management between services/classes/entities better to use some IoC container like [InversifyJS](https://github.com/inversify/InversifyJS) or [bottlejs](https://github.com/young-steveo/bottlejs)
- Code quality tools should be added such as eslint, prettier, dependency analyzers.
- For better developer experience javascript can be switched to typescript with relevant tools
- Test assessment doesn't include any kind of authentication / authorization which anyway should be a part of any API
- Security audit of dependencies and hand written code can be made by `npm audit` / `yarn audit` or any other proprietary SAST tool which should be a part of build cycle.