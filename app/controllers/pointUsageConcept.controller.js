const db = require("../models");
const PointUsageConcept = db.PointUsageConcepts;
const Op = db.Sequelize.Op;

// Crear un nuevo PointUsageConcept
exports.create = (req, res) => {
  // Validar el request
  if (!req.body.descripcion || req.body.puntos_requeridos === undefined) {
    res.status(400).send({
      message: "Debe enviar la descripción y los puntos requeridos."
    });
    return;
  }

  // Crear un nuevo PointUsageConcept
  const pointUsageConcept = {
    descripcion: req.body.descripcion,
    puntos_requeridos: req.body.puntos_requeridos
  };

  // Guardar en la base de datos
  PointUsageConcept.create(pointUsageConcept)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear el concepto de uso de puntos."
      });
    });
};

// Obtener un PointUsageConcept por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  PointUsageConcept.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el concepto de uso de puntos con ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener el concepto de uso de puntos con ID=" + id
      });
    });
};

// Obtener todos los PointUsageConcepts
exports.findAll = (req, res) => {
  PointUsageConcept.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los conceptos de uso de puntos."
      });
    });
};

// Actualizar un concepto por id
exports.update = (req, res) => {
  const id = req.params.id;

  PointUsageConcept.update(req.body, { where: { id: id } })
      .then(num => {
          if (num == 1) res.send({ message: "Concepto actualizado exitosamente." });
          else res.status(404).send({ message: `No se encontró el concepto con id=${id} o no se realizaron cambios.` });
      })
      .catch(err => res.status(500).send({ message: "Error al actualizar el concepto con id=" + id }));
};

// Eliminar un concepto por id
exports.delete = (req, res) => {
  const id = req.params.id;

  PointUsageConcept.destroy({ where: { id: id } })
      .then(num => {
          if (num == 1) res.send({ message: "Concepto eliminado exitosamente." });
          else res.status(404).send({ message: `No se encontró el concepto con id=${id}.` });
      })
      .catch(err => res.status(500).send({ message: "Error al eliminar el concepto con id=" + id }));
};
