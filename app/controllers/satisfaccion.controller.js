const db = require("../models");
const Satisfaccion = db.Satisfaccions;
const Cliente = db.Clientes;

// Crear una nueva encuesta de satisfacción
exports.create = (req, res) => {
  if (!req.body.cliente_id || req.body.puntuacion === undefined) {
    return res.status(400).send({
      message: "Debe enviar el cliente_id y la puntuacion."
    });
  }

  const encuesta = {
    cliente_id: req.body.cliente_id,
    puntuacion: req.body.puntuacion,
    comentarios: req.body.comentarios || ""
  };

  Satisfaccion.create(encuesta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear la encuesta de satisfacción."
      });
    });
};

// Obtener todas las encuestas de satisfacción
exports.findAll = (req, res) => {
  Satisfaccion.findAll({ include: ["cliente"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las encuestas de satisfacción."
      });
    });
};

// Obtener una encuesta de satisfacción por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Satisfaccion.findByPk(id, { include: ["cliente"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró la encuesta de satisfacción con ID=${id}.⁠`⁠
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener la encuesta de satisfacción con ID=" + id
      });
    });
};

// Eliminar una encuesta de satisfacción por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Satisfaccion.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Encuesta de satisfacción eliminada exitosamente." });
      } else {
        res.status(404).send({
          message: `No se encontró la encuesta de satisfacción con ID=${id}.⁠`⁠
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al eliminar la encuesta de satisfacción con ID=" + id
      });
    });
};