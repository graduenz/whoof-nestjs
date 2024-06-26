whoof-nestjs
---

> **Update:** This project is part of [Whoof](https://rdnz.dev/labs/whoof/) and it will not be worked on anymore.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=graduenz_whoof-nestjs&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=graduenz_whoof-nestjs)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=graduenz_whoof-nestjs&metric=bugs)](https://sonarcloud.io/summary/new_code?id=graduenz_whoof-nestjs)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=graduenz_whoof-nestjs&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=graduenz_whoof-nestjs)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=graduenz_whoof-nestjs&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=graduenz_whoof-nestjs)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=graduenz_whoof-nestjs&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=graduenz_whoof-nestjs)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=graduenz_whoof-nestjs&metric=coverage)](https://sonarcloud.io/summary/new_code?id=graduenz_whoof-nestjs)

## Description

Implementation of [Whoof API](https://rdnz.dev/labs/whoof/) using NestJS, Prisma and PostgreSQL.

## Milestones

- [x] Create all APIs
- [x] PostgreSQL with Prisma
- [x] REST schema validation
- [x] Swagger
- [x] Unit tests
- [ ] E2E tests
- [x] SonarCloud + coverage report
- [ ] Adequate logging
- [ ] CI/CD with GitHub Actions
- [ ] Launch

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
