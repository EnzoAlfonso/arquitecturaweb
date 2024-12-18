const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Ventas = require("./venta.model.js")(sequelize, Sequelize);
db.Clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.PointBalances = require("./pointBalance.model.js")(sequelize, Sequelize);
db.PointExpirations = require("./pointExpiration.model.js")(sequelize, Sequelize);
db.PointUsageConcepts = require("./pointUsageConcept.model.js")(sequelize, Sequelize);
db.PointUsages = require("./pointUsage.model.js")(sequelize, Sequelize);
db.PointAssignmentRules = require("./pointAssignmentRule.model.js")(sequelize, Sequelize);
db.nivelFidelizacions = require("./nivelFidelizacion.model.js")(sequelize, Sequelize);
db.referidos = require("./referido.model.js")(sequelize, Sequelize);
db.sequelize.sync({alter: true});


module.exports = db;