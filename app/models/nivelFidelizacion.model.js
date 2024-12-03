module.exports = (sequelize, Sequelize) => {
  const NivelFidelizacion = sequelize.define("NivelFidelizacion", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(20),
      unique: true
    },
    puntos_requeridos: {
      type: Sequelize.INTEGER
    },
    beneficios: {
      type: Sequelize.JSON
    }
  });
  return NivelFidelizacion;
};