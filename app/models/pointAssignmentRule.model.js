// pointAssignmentRule.model.js
module.exports = (sequelize, Sequelize) => {
  const PointAssignmentRule = sequelize.define("PointAssignmentRule", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      limite_inferior: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true  // Puede ser null si no se define límite inferior
      },
      limite_superior: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true  // Puede ser null si no se define límite superior
      },
      equivalencia_punto: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false // Define el monto equivalente para 1 punto
      }
  });
  return PointAssignmentRule;
};
