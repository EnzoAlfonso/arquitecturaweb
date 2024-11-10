const db = require("../models");
const PointBalance = db.PointBalances;
const Op = db.Sequelize.Op;

// Crear un nuevo PointBalance
exports.create = (req, res) => {
  // Validar el request
  if (!req.body.client_id || !req.body.puntaje_asignado || !req.body.saldo_puntos) {
    res.status(400).send({
      message: "Debe enviar el ID del cliente, el puntaje asignado y el saldo de puntos."
    });
    return;
  }

  // Crear un nuevo PointBalance
  const pointBalance = {
    client_id: req.body.client_id,
    fecha_asignacion: req.body.fecha_asignacion || new Date(),
    fecha_caducidad: req.body.fecha_caducidad,
    puntaje_asignado: req.body.puntaje_asignado,
    puntaje_utilizado: req.body.puntaje_utilizado || 0,
    saldo_puntos: req.body.saldo_puntos,
    monto_operacion: req.body.monto_operacion
  };

  // Guardar el registro en la base de datos
  PointBalance.create(pointBalance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear el saldo de puntos."
      });
    });
};

// Obtener un PointBalance por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  PointBalance.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el saldo de puntos con ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener el saldo de puntos con ID=" + id
      });
    });
};

// Obtener todos los PointBalances o buscar por cliente
exports.findAll = (req, res) => {
  const client_id = req.query.client_id;
  var condition = client_id ? { client_id: { [Op.eq]: client_id } } : null;

  PointBalance.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los saldos de puntos."
      });
    });
};

