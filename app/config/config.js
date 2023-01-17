const config = {
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DBNAME || "newimdb",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DIALECT || "postgres",
};

module.exports = config;
