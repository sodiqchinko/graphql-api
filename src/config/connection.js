const development = {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    }
};

const production = {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    }
};

const test = {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    }
};

const config = {
    development,
    production,
    test,
};
module.exports = config;
