## Getting Started

```
cp -n .env.example .env
cp -n docker-compose.override.example.yml docker-compose.override.yml
```

## Docker

```bash
# run a stack of services
$ docker-compose up --build -dV
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test

```bash
# e2e tests
$ npm run test:e2e
```

## pgAdmin

```bash
{SCHEME}://{HOST}:{PORT}/browser
1. Login credentials
  Email: PGADMIN_DEFAULT_EMAIL
  Password: PGADMIN_DEFAULT_PASSWORD
2. Create server
  Host: DB_HOST
  Port: DB_PORT
  Username: DB_USERNAME
  Password: DB_PASSWORD
```
