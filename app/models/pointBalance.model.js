module.exports = (sequelize, Sequelize) => {
    const PointBalance = sequelize.define("PointBalance", {
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
      fecha_asignacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      fecha_caducidad: {
        type: Sequelize.DATE
      },
      puntaje_asignado: {
        type: Sequelize.INTEGER
      },
      puntaje_utilizado: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      saldo_puntos: {
        type: Sequelize.INTEGER
      },
      monto_operacion: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
    return PointBalance;
  };