<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> Server-side backend for database management university project.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

Sure! Here's an extended and professional version of the `README.md` file with detailed explanations for each section:

---

# Project Setup and Execution

## Prerequisites

Before starting with the project, ensure that you have the necessary tools installed:

- **Node.js**: This project requires Node.js, which you can install from the official website: [https://nodejs.org/](https://nodejs.org/).
- **npm**: npm (Node Package Manager) is installed alongside Node.js. If you don't have the latest version of npm, you can update it using the following command:

```bash
$ npm install -g npm@latest
```

This will install the latest version of npm globally.

## Project Setup

Once you have the necessary tools installed, you can begin by setting up the project:

1. **Install project dependencies**:
   After cloning or downloading the project repository, navigate to the project directory and run:

   ```bash
   $ npm install
   ```

   This will install all the required dependencies defined in the `package.json` file.

2. **Environment Configuration**:
   The project may require configuration of environment variables to connect to services like databases. These should be defined in a `.env` file located in the `src` directory.

---

## Compile and Run the Project

There are multiple ways to run the project depending on the environment you're working in. Here are the commands to compile and run the project:

### Development Mode

To start the project in development mode, where it will automatically reload when code changes are detected, run:

```bash
$ npm run start
```

This will run the project using the development configurations.

### Watch Mode

To start the project in watch mode, which keeps the application running and restarts it automatically when any files are modified, run:

```bash
$ npm run start:dev
```

This mode is useful during active development as it eliminates the need to manually restart the server after each change.

### Production Mode

To start the project in production mode, use the following command:

```bash
$ npm run start:prod
```

This mode runs the application in a more optimized way for production environments, typically with minified code and performance enhancements.

---

## Prisma Considerations

Prisma is an ORM (Object-Relational Mapping) tool that facilitates communication between your application and the database. The following commands are related to Prisma and its integration into the project.

### 1. **Generate Prisma Client**

Whenever you make changes to the Prisma schema (located in `prisma/schema.prisma`), such as adding, removing, or updating models, fields, or relationships between models, you need to regenerate the Prisma Client to ensure that the client is in sync with the schema.

To generate the Prisma Client, run the following command:

```bash
$ npx prisma generate
```

This will regenerate the Prisma Client based on the current schema.

**Important**: You should run this command:

- When adding, removing, or updating models or fields.
- When changing relationships between models.
- When setting up Prisma for the first time in a project.
- If you update the `@prisma/client` package, you need to regenerate the client to ensure compatibility with the new version.

### 2. **Running Migrations**

Prisma uses migrations to manage changes to the database schema over time. When you modify the Prisma schema (e.g., adding a new model or changing a model's structure), you'll need to create and apply a migration to reflect those changes in the database.

To create a new migration and apply it to your development database, run:

```bash
$ npx prisma migrate dev --name <migration_name>
```

Where:

- **`<migration_name>`**: A descriptive name for the migration, e.g., `add-new-field-to-user`.

This will:

- Create a new migration file under the `prisma/migrations` folder.
- Apply the migration to the database in development mode.

In production, you'll use the following command to deploy the migrations without generating new migration files:

```bash
$ npx prisma migrate deploy
```

This command applies any unapplied migrations to the production database.

---

## ENV Configuration

The project requires database credentials for Prisma to connect to your database. These credentials are defined in the `.env` file located in the `src` directory.

Here’s an example of how to configure the `.env` file for connecting to a PostgreSQL database:

```bash
# ./src/.env

## DATABASE ENVS FOR PRISMA
DATABASE_URL="postgresql://postgres.aukamsjbzhgvkbwjkehl:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.aukamsjbzhgvkbwjkehl:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

- **`DATABASE_URL`**: This is the primary URL Prisma uses to connect to your PostgreSQL database. It includes the username, password, host, and port.
- **`DIRECT_URL`**: This is another database connection URL that may be used directly (e.g., for internal or non-connection pooling operations).

**Important**: Replace `[PASSWORD]` with the actual password for your PostgreSQL database.

These environment variables should be kept secure, especially when deploying the application in production.
