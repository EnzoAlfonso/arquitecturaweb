module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("Client", {
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
      }
    });
    return Client;
  };