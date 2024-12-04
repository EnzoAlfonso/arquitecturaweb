module.exports = (sequelize, DataTypes) => {
    const Referido = sequelize.define("Referido", {
      cliente_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Clientes",
          key: "id",
        },
        allowNull: false,
      },
      referido_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Clientes",
          key: "id",
        },
        allowNull: false,
      },
      fecha_referencia: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      beneficio_otorgado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    Referido.associate = (models) => {
      Referido.belongsTo(models.Cliente, {
        foreignKey: "cliente_id",
        as: "referente",
      });
      Referido.belongsTo(models.Cliente, {
        foreignKey: "referido_id",
        as: "referido",
      });
    };
  
    return Referido;
  };
  