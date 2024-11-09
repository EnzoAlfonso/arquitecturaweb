module.exports = (sequelize, Sequelize) => {
    const PointUsage = sequelize.define("PointUsage", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Clients", // Nombre del modelo al que hace referencia
          key: "id"
        }
      },
      puntaje_utilizado: {
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      concepto_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "PointUsageConcepts", // Nombre del modelo al que hace referencia
          key: "id"
        }
      }
    });
    return PointUsage;
  };