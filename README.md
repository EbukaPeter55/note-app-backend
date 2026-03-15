# Notes API

Simple Notes API built with Node.js, TypeScript, Express and PostgreSQL.

## Technologies used
- Node.js
- TypeScript
- Express
- PostgreSQL
- pg (Postgres client)
- Zod (request validation)
- Swagger (swagger-jsdoc + swagger-ui-express) for API docs
- dotenv for environment variables
- ts-node-dev for local development
- Type definitions for Node/Express/pg

## Project structure
- src/app.ts — Express app setup ([src/app.ts](src/app.ts))
- src/server.ts — Server bootstrap ([src/server.ts](src/server.ts))
- src/config/env.ts — Environment config & variables ([`env`](src/config/env.ts))
- src/config/database.ts — Postgres pool ([`pool`](src/config/database.ts))
- src/database/runMigrations.ts — Run SQL migrations script ([`runMigrations`](src/database/runMigrations.ts))
- src/modules/notes — Notes module (routes, controller, service, repository)

## Getting started

Prerequisites:
- Node.js (recommended >= 18)
- PostgreSQL

1. Install dependencies
```sh
npm install
```

2. Create a `.env` in the project root (see [`env`](src/config/env.ts) for used variables). Example:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=notes_db
```

3. Create the database in Postgres (e.g. `notes_db`) and run migrations:
```sh
npm run migrate
```
This runs the SQL files in `src/database/migrations` via [`runMigrations`](src/database/runMigrations.ts).

4. Run in development:
```sh
npm run dev
```

5. API docs (Swagger):
Open http://localhost:3000/api-docs after starting the server.

## Useful scripts (from [package.json](package.json))
- npm run dev — start development server with ts-node-dev
- npm run build — compile TypeScript to `dist`
- npm run start — run compiled build
- npm run migrate — run migrations (TypeScript script)

## Notes
- Validation uses Zod schemas in `src/modules/notes/note.validation.ts`.
- Database connection is managed by the Postgres pool in [`pool`](src/config/database.ts).
- If you add new migrations, place them in `src/database/migrations` and re-run `npm run migrate`.

## License
MIT