// controllers/pointUsage.controller.js

const db = require("../models");
const PointUsage = db.PointUsages;
const PointBalance = db.PointBalances; 
const Op = db.Sequelize.Op;

// Crear un nuevo PointUsage
exports.create = (req, res) => {
  if (!req.body.client_id || req.body.puntaje_utilizado === undefined || !req.body.concepto_id) {
    return res.status(400).send({
      message: "Debe enviar el client_id, puntaje_utilizado y concepto_id."
    });
  }

  const clientId = req.body.client_id;
  const puntajeUtilizado = req.body.puntaje_utilizado;

  // Buscar el saldo de puntos del cliente
  PointBalance.findOne({ where: { client_id: clientId } })
    .then(pointBalance => {
      if (!pointBalance) {
        return res.status(404).send({
          message: `No se encontró el saldo de puntos para el cliente con ID=${clientId}.`
        });
      }

      // Verificar si el cliente tiene suficientes puntos
      if (puntajeUtilizado > pointBalance.saldo_puntos) {
        return res.status(400).send({
          message: "El cliente no tiene suficientes puntos para realizar esta operación."
        });
      }

      // Descontar los puntos del saldo de puntos del cliente
      const newSaldoPuntos = pointBalance.saldo_puntos - puntajeUtilizado;

      // Actualizar el saldo de puntos del cliente
      PointBalance.update({ saldo_puntos: newSaldoPuntos }, { where: { client_id: clientId } })
        .then(() => {
          // Crear el nuevo PointUsage
          const pointUsage = {
            client_id: clientId,
            puntaje_utilizado: puntajeUtilizado,
            concepto_id: req.body.concepto_id
          };

          // Guardar el uso de puntos en la base de datos
          PointUsage.create(pointUsage)
            .then(data => {
              res.send(data); // Responder con el uso de puntos creado
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || "Ha ocurrido un error al crear el uso de puntos."
              });
            });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error al actualizar el saldo de puntos del cliente."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener el saldo de puntos del cliente."
      });
    });
};

// Obtener todos los PointUsages
exports.findAll = (req, res) => {
  PointUsage.findAll()
    .then(data => {
      res.send(data); // Enviar los datos encontrados
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al obtener los usos de puntos."
      });
    });
};

// Obtener un PointUsage por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  PointUsage.findByPk(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `No se encontró el uso de puntos con ID=${id}.`
        });
      }
      res.send(data); // Enviar los datos encontrados
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener el uso de puntos con ID=" + id
      });
    });
};
