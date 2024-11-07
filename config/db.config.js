module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123",
  PORT: 3333,
  DB: "bdpwb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};