const db = require("../models");
const PointUsage = db.PointUsages;
const Op = db.Sequelize.Op;

// Crear un nuevo PointUsage
exports.create = (req, res) => {
  // Validar el request
  if (!req.body.client_id || req.body.puntaje_utilizado === undefined || !req.body.concepto_id) {
    res.status(400).send({
      message: "Debe enviar el client_id, puntaje_utilizado y concepto_id."
    });
    return;
  }

  // Crear un nuevo PointUsage
  const pointUsage = {
    client_id: req.body.client_id,
    puntaje_utilizado: req.body.puntaje_utilizado,
    concepto_id: req.body.concepto_id
  };

  // Guardar en la base de datos
  PointUsage.create(pointUsage)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear el uso de puntos."
      });
    });
};

// Obtener un PointUsage por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  PointUsage.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el uso de puntos con ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener el uso de puntos con ID=" + id
      });
    });
};

// Obtener todos los PointUsages
exports.findAll = (req, res) => {
  PointUsage.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los usos de puntos."
      });
    });
};
