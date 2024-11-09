module.exports = (sequelize, Sequelize) => {
    const PointExpiration = sequelize.define("PointExpiration", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      duracion_dias: {
        type: Sequelize.INTEGER
      }
    });
    return PointExpiration;
  };