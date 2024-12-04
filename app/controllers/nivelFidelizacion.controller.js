const db = require("../models");
const NivelFidelizacion = db.nivelFidelizacions;
const Cliente = db.Clientes;
const Op = db.Sequelize.Op;

// Crear un nuevo nivel de fidelización
exports.create = (req, res) => {
  // Validar el request
  if (!req.body.nombre || req.body.puntos_requeridos === undefined) {
    res.status(400).send({
      message: "Debe enviar el nombre y los puntos requeridos del nivel de fidelización."
    });
    return;
  }

  // Crear nivel de fidelización
  const nivel = {
    nombre: req.body.nombre,
    puntos_requeridos: req.body.puntos_requeridos,
    beneficios: req.body.beneficios || {}
  };

  // Guardar en la base de datos
  NivelFidelizacion.create(nivel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear el nivel de fidelización."
      });
    });
};

// Obtener todos los niveles de fidelización
exports.findAll = (req, res) => {
  NivelFidelizacion.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los niveles de fidelización."
      });
    });
};

// Obtener un nivel de fidelización por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  NivelFidelizacion.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró nivel de fidelización con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener nivel de fidelización con id=" + id
      });
    });
};

// Actualizar un nivel de fidelización por id
exports.update = (req, res) => {
  const id = req.params.id;

  NivelFidelizacion.update(req.body, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Nivel de fidelización actualizado exitosamente." });
      } else {
        res.status(404).send({ message: `No se encontró nivel de fidelización con id=${id} o no se realizaron cambios.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error al actualizar el nivel de fidelización con id=" + id });
    });
};

// Eliminar un nivel de fidelización por id
exports.delete = (req, res) => {
  const id = req.params.id;

  NivelFidelizacion.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Nivel de fidelización eliminado exitosamente." });
      } else {
        res.status(404).send({ message: `No se encontró nivel de fidelización con id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error al eliminar el nivel de fidelización con id=" + id });
    });
};