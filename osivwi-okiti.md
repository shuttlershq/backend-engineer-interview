# Interview Test

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file and

    ``` src > config > database.config.ts ```

3. Run `npm start` command

## Database
 Postgres database is used. Typeorm is used to design our models and query the database. Postgres extensions used are

 - PostGIS (for storing locations as GeoJson)
 - uuid-ossip (auto-generated uuid in place of SQL auto-incremented int for primary column).

 ### Migrations
 To run database migrations simple use the command
 ``` npx run typeorm migration:run ```

 ## Tests
 Testing is implemented using Jest and suppertest. unit tests and integration tests are both implemented.

For unit tests use the following command

 ``` npm run test ```

For Integration (E2E) test use the command

 ``` npm run test:e2e ```
