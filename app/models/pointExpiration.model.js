module.exports = (sequelize, Sequelize) => {
  const PointExpiration = sequelize.define("PointExpiration", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      fecha_inicio: {
          type: Sequelize.DATE,
          allowNull: false
      },
      fecha_fin: {
          type: Sequelize.DATE,
          allowNull: false
      },
      duracion_dias: {
          type: Sequelize.INTEGER,
          allowNull: false
      }
  });
  return PointExpiration;
};