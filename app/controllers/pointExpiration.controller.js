const db = require("../models");
const PointExpiration = db.PointExpirations;
const Op = db.Sequelize.Op;

// Crear un nuevo PointExpiration
exports.create = (req, res) => {
  // Validar el request
  if (!req.body.fecha_inicio || !req.body.fecha_fin || !req.body.duracion_dias) {
    res.status(400).send({
      message: "Debe enviar la fecha de inicio, la fecha de fin y la duración en días."
    });
    return;
  }

  // Crear un nuevo PointExpiration
  const pointExpiration = {
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin,
    duracion_dias: req.body.duracion_dias
  };

  // Guardar el registro en la base de datos
  PointExpiration.create(pointExpiration)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear la expiración de puntos."
      });
    });
};

// Obtener un PointExpiration por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  PointExpiration.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró la expiración de puntos con ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener la expiración de puntos con ID=" + id
      });
    });
};

// Obtener todos los PointExpirations
exports.findAll = (req, res) => {
  PointExpiration.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las expiraciones de puntos."
      });
    });
};
