module.exports = (sequelize, Sequelize) => {
    const Satisfaccion = sequelize.define("Satisfaccion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Clientes",
          key: "id"
        },
        allowNull: false
      },
      puntuacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comentarios: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  
    Satisfaccion.associate = models => {
      Satisfaccion.belongsTo(models.Clientes, {
        foreignKey: "cliente_id",
        as: "cliente"
      });
    };
  
    return Satisfaccion;
  };