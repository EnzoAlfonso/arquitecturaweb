const db = require("../models");
const Referido = db.Referidos;
const Cliente = db.Clientes;

// Crear una referencia de un cliente hacia otro
exports.crearReferencia = async (req, res) => {
  const { cliente_id, referido_id } = req.body;

  // Validar que el cliente y el referido existan
  const cliente = await Cliente.findByPk(cliente_id);
  const referido = await Cliente.findByPk(referido_id);

  if (!cliente || !referido) {
    return res.status(400).send({
      message: "Uno de los clientes no existe.",
    });
  }

  // Verificar que el cliente no se haya referido a sí mismo
  if (cliente_id === referido_id) {
    return res.status(400).send({
      message: "El cliente no puede referirse a sí mismo.",
    });
  }

  // Crear la referencia
  Referido.create({
    cliente_id,
    referido_id,
  })
    .then(async (referido) => {
      // Lógica para otorgar beneficio
      // Aquí puedes definir la lógica del beneficio que se otorga a ambos
      await Cliente.update(
        { puntos: db.Sequelize.literal('puntos + 10') },
        { where: { id: cliente_id } }
      );
      await Cliente.update(
        { puntos: db.Sequelize.literal('puntos + 5') },
        { where: { id: referido_id } }
      );

      res.send({ message: "Referencia creada con éxito.", referido });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la referencia.",
      });
    });
};

// Consultar todas las referencias de un cliente
exports.consultarReferencias = (req, res) => {
  const cliente_id = req.params.cliente_id;

  Referido.findAll({
    where: { cliente_id },
    include: [
      {
        model: Cliente,
        as: "referido",
        attributes: ["id", "nombre", "apellido", "email"],
      },
    ],
  })
    .then((referidos) => {
      res.send(referidos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las referencias.",
      });
    });
};

// Consultar todos los clientes que refirieron a otros
exports.consultarClientesReferentes = (req, res) => {
  const referido_id = req.params.referido_id;

  Referido.findAll({
    where: { referido_id },
    include: [
      {
        model: Cliente,
        as: "referente",
        attributes: ["id", "nombre", "apellido", "email"],
      },
    ],
  })
    .then((referentes) => {
      res.send(referentes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los clientes referentes.",
      });
    });
};
