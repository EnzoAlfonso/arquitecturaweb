module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("Cliente", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(50)
    },
    apellido: {
      type: Sequelize.STRING(50)
    },
    numero_documento: {
      type: Sequelize.STRING(20),
      unique: true
    },
    tipo_documento: {
      type: Sequelize.STRING(20)
    },
    nacionalidad: {
      type: Sequelize.STRING(30)
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true
    },
    telefono: {
      type: Sequelize.STRING(20)
    },
    fecha_nacimiento: {
      type: Sequelize.DATE
    },
    ubicacion: {
      type: Sequelize.STRING(100)
    },
    historial_compras: {
      type: Sequelize.JSON
    },
    // Clave foránea para nivel de fidelización
    nivel_fidelizacion_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "NivelFidelizacions",
        key: "id"
      }
    }
  });

  Cliente.associate = models => {
    Cliente.belongsTo(models.NivelFidelizacions, {
      foreignKey: "nivel_fidelizacion_id",
      as: "nivelFidelizacion"
    });
  };

  return Cliente;
};