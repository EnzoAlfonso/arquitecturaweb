module.exports = (sequelize, Sequelize) => {
    const PointUsageConcept = sequelize.define("PointUsageConcept", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descripcion: {
        type: Sequelize.STRING(100)
      },
      puntos_requeridos: {
        type: Sequelize.INTEGER
      }
    });
    return PointUsageConcept;
  };