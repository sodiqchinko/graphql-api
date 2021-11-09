# Homelike API

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
PORT=4000

# Set if running with docker
POSTGRES_PASSWORD=
POSTGRES_USER=
POSTGRES_DB=
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
