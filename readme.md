# GraphQL API

Running the backend graphQL API

### Requirements
- Postgres Database
- sync the versions for node and npm

#### Installation

```
npm install
```

#### Setup .env file using .env.sample
```
.env
```
#### Environment Variables

```
JWTSECRET="Your jwt secret here"
TOKENEXPIRESIN="When token expires e.g 24h"
DATABASE_URL=""
TEST_DATABASE_URL=""
PORT=4000
```
#### Environment Variables (when running with Docker)
```
JWTSECRET="somesecret"
TOKENEXPIRESIN="7h"
DATABASE_URL=postgres://postgres:postgres@postgress-db:5432/homelike
TEST_DATABASE_URL=postgres://postgres:postgres@postgress-db:5432/homelike_test
PORT=4000

POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
POSTGRES_MULTIPLE_DATABASES=homelike,homelike_test

```

#### Running the API Directly
#### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

#### Running the API with docker
#### `docker-compose build`
#### `docker-compose up`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

This lunches the graphQL playground 

#### Running test
Ensure test database is created before running
```
npm run test
```
