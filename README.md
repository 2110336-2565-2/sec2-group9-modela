<h1 align="center">Modela</h1>

## What is it ?

A platform for matching between Actor and Casting recruiting for acting

## Project Structure

### Apps

- `api`: [Nest.js](https://nestjs.com) + [AWS S3](https://aws.amazon.com/s3/)
- `web`: [Next.js](https://nextjs.org) + [Typescript](https://www.typescriptlang.org/) + [Material UI](https://mui.com/)

### Packages

- `database`: prisma interface which is used to communicate with postgres database and data population utility functions
- `dtos`: class-based DTOS which are used across application (`web` and `api`)
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `frontend-optimizer`: simple typescript to optimize `web` bundle size by injecting unused module with empty stub

## Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/#/) for running script binding to git hooks
- [Lint-staged](https://github.com/okonet/lint-staged) for linting only staged file

## Setup

To setup all apps and packages. First, run the following command:

```
pnpm install
```

After that, copy `.env.example` from both `apps/web` and `apps/api` to new file `.env` and fill the information

If you want to generate and populate a database, run the following command:

```
cd packages/database
pnpm run db:seed
```

## Build

To build all apps and packages, run the following command:

```
pnpm run build
```

## Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```
