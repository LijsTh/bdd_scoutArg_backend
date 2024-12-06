# Football Website Backend

This repository contains the back-end infrastructure for a football-focused website, built using **Node.js**, **NestJS**, **PostgreSQL**, **Firebase**, and **Prisma**. The back-end handles user data, real-time updates, and dynamic content, designed for high availability, performance, and scalability.

---

## Authors

| Nombre        | Apellido   | Padrón | Gmail                 |
| ------------- | ---------- | ------ | --------------------- |
| Joaquin       | Batemarco  | 110222 | jbatemarco@fi.uba.ar  |
| Franco Ariel  | Alani      | 111147 | falani@fi.uba.ar      |
| Franco Martin | Fusco      | 102692 | ffusco@fi.uba.ar      |
| Benicio       | Braunstein | 110126 | bbraunstein@fi.uba.ar |
| Juan Martin   | de la Cruz | 109588 | jdelacruz@fi.uba.ar   |
| Theo          | Lijs       | 109472 | tlijs@fi.uba.ar       |

---

## Table of Contents

1. [Repository Structure](#repository-structure)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
    - 3.1. [Install Project Dependencies](#install-project-dependencies)
    - 3.2. [Configure Environment Variables](#configure-environment-variables)
4. [Compile and Run the Project](#compile-and-run-the-project)
    - 4.1. [Development Mode](#development-mode)
    - 4.2. [Watch Mode](#watch-mode)
    - 4.3. [Production Mode](#production-mode)
5. [Prisma Considerations](#prisma-considerations)
    - 5.1. [Generate Prisma Client](#generate-prisma-client)
    - 5.2. [Running Migrations](#running-migrations)
6. [ENV Configuration](#env-configuration)
7. [Contributing](#contributing)
8. [License](#license)

---

## Repository Structure

```plaintext
├── src/                  # Application source code
│   ├── app.module.ts     # Main application module
│   ├── main.ts           # Application entry point
│   ├── database/         # Database-related files
│   │   ├── firebase/     # Firebase configuration and utilities
│   │   ├── prisma/       # Prisma ORM configuration and migrations
│   │   └── scripts/      # Database or project-related scripts
│   ├── domains/          # Business logic related to entities (e.g., players, teams)
│   │   ├── opinions/     # Opinions module
│   │   ├── players/      # Players module
│   │   ├── teams/        # Teams module
│   │   └── users/        # Users module
│   └── utils/            # Utility functions and helpers
├── .gitignore            # Git ignore file
├── LICENSE               # Project license
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
├── serviceAccountKey.json # Firebase service account key (required)
├── tsconfig.json         # TypeScript configuration
├── tsconfig.build.json   # TypeScript build configuration
├── nest-cli.json         # NestJS CLI configuration
├── .env                  # Environment variables for configuration
├── .eslintrc.js          # ESLint configuration
└── .prettierrc           # Prettier configuration
```

---

## Prerequisites

Before starting with the project, ensure that you have the following tools installed:

-   **Node.js**: Install from [https://nodejs.org/](https://nodejs.org/)
-   **npm**: Install or update to the latest version of npm by running the following command:

```bash
$ npm install -g npm@latest
```

---

## Project Setup

### 1. Install project dependencies

After cloning or downloading the repository, navigate to the project directory and install the dependencies by running:

```bash
$ npm install
```

### 2. Configure environment variables

Create a `.env` file in the `src` directory and configure the necessary environment variables for the database, Firebase connection and JWT Authentication

Example configuration:

```bash
# ./src/.env

## DATABASE ENVS FOR PRISMA
DATABASE_URL="postgresql://postgres.aukamsjbzhgvkbwjkehl:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.aukamsjbzhgvkbwjkehl:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"

## DATABASE ENVS FOR FIREBASE
GOOGLE_APPLICATION_CREDENTIALS="path_to_serviceAccountKey.json"

## AUTH JWT SECRET
JWT_SECRET='example_jwt'
```

> **Important**: Replace `[PASSWORD]` with the actual PostgreSQL password and set the correct path for the **serviceAccountKey.json** file. The `serviceAccountKey.json` should be placed in the **root** of your project.

---

## Compile and Run the Project

To run the project, if this is your first time, you will need to generate the Prisma client to ensure that Prisma is properly set up. You can do so by following these steps: [Generate Prisma Client](#1-generate-prisma-client).

### Development Mode

To start the project in development mode, where it automatically reloads when code changes are made, run:

```bash
$ npm run start
```

### Watch Mode

To start the project in watch mode, which restarts the application when file changes occur, run:

```bash
$ npm run start:dev
```

---

## Prisma Considerations

Prisma is an ORM (Object-Relational Mapping) tool that facilitates communication between your application and the database. Below are the commands related to Prisma and its integration into the project.

### 1. **Generate Prisma Client**

Whenever you make changes to the Prisma schema (located in `./src/database/prisma/schema.prisma`), such as adding, removing, or updating models, fields, or relationships between models, you need to regenerate the Prisma Client to ensure that the client is in sync with the schema.

To generate the Prisma Client, run the following command:

```bash
$ npx prisma generate --schema ./src/database/prisma/schema.prisma
```

**Important**: Run this command when:

-   Adding, removing, or updating models or fields.
-   Changing relationships between models.
-   Setting up Prisma for the first time in a project.
-   Updating the `@prisma/client` package to ensure compatibility with the new version.

### 2. **Running Migrations**

Prisma uses migrations to manage changes to the database schema over time. When you modify the Prisma schema (e.g., adding a new model or changing a model's structure), you’ll need to create and apply a migration to reflect those changes in the database.

To create a new migration and apply it to your development database, run:

```bash
$ npx prisma migrate dev --name <migration_name> --schema ./src/database/prisma/schema.prisma
```

Where:

-   **`<migration_name>`**: A descriptive name for the migration (e.g., `add-new-field-to-user`).

This will:

-   Create a new migration file under the `prisma/migrations` folder.
-   Apply the migration to the database in development mode.

In production, you can deploy the migrations without generating new migration files by using the following command:

```bash
$ npx prisma migrate deploy --schema ./src/database/prisma/schema.prisma
```

This command applies any unapplied migrations to the production database.

---

## ENV Configuration

Make sure your `.env` file is properly configured to connect both the PostgreSQL database and Firebase. The file should contain the necessary connection URLs and service account credentials.

---

## Contributing

Feel free to fork the repository and submit a pull request. Please follow the project coding standards and ensure that all tests pass before submitting your changes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
