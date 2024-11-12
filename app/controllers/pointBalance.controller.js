const db = require("../models");
const PointBalance = db.PointBalances;
const Op = db.Sequelize.Op;

// Crear o actualizar el saldo de puntos
exports.createOrUpdatePointBalance = (req, res) => {
  if (req.body.client_id === undefined || req.body.monto_operacion === undefined || req.body.saldo_puntos === undefined) {
    return res.status(400).send({
      message: "Debe enviar el ID del cliente, el monto de la operación y el saldo de puntos."
    });
  }

  const montoOperacion = req.body.monto_operacion;
  let puntosAsignados = 0;

  // Calcular puntos según la regla
  if (montoOperacion >= 0 && montoOperacion <= 199999) {
    puntosAsignados = Math.floor(montoOperacion / 50000);
  } else if (montoOperacion >= 200000 && montoOperacion <= 499999) {
    puntosAsignados = Math.floor(montoOperacion / 30000);
  } else if (montoOperacion >= 500000) {
    puntosAsignados = Math.floor(montoOperacion / 20000);
  }

  // Definir el saldo de puntos actualizado
  const saldoPuntosCalculado = req.body.saldo_puntos + puntosAsignados;

  // Crear o actualizar el saldo de puntos
  const pointBalance = {
    client_id: req.body.client_id,
    fecha_asignacion: req.body.fecha_asignacion || new Date(),
    fecha_caducidad: req.body.fecha_caducidad,
    puntaje_asignado: puntosAsignados,
    puntaje_utilizado: req.body.puntaje_utilizado || 0,
    saldo_puntos: saldoPuntosCalculado,
    monto_operacion: montoOperacion
  };

  // Guardar o actualizar en la base de datos
  PointBalance.upsert(pointBalance)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Ha ocurrido un error al crear o actualizar el saldo de puntos."
    }));
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
    .catch(err => res.status(500).send({
      message: "Error al obtener el saldo de puntos con ID=" + id
    }));
};

// Obtener todos los PointBalances o buscar por cliente
exports.findAll = (req, res) => {
  const client_id = req.query.client_id;
  const condition = client_id ? { client_id: { [Op.eq]: client_id } } : null;

  PointBalance.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Ocurrió un error al obtener los saldos de puntos."
    }));
};


// Eliminar un PointBalance por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  PointBalance.destroy({ where: { id } })
    .then(num => {
      if (num === 1) {
        res.send({ message: "El saldo de puntos fue eliminado con éxito." });
      } else {
        res.status(404).send({
          message: `No se pudo encontrar el saldo de puntos con ID=${id}.`
        });
      }
    })
    .catch(err => res.status(500).send({
      message: "Error al eliminar el saldo de puntos con ID=" + id
    }));
};