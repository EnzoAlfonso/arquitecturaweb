const db = require("../models");
const Cliente = db.Clientes;
const PointUsage = db.PointUsages;
const PointBalance = db.PointBalances;
const Op = db.Sequelize.Op;

// Obtener la tasa de retención de clientes
exports.retencionClientes = (req, res) => {
  Cliente.findAll({
    attributes: [
      [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'totalClientes'],
      [db.Sequelize.fn('COUNT', db.Sequelize.fn('DISTINCT', db.Sequelize.col('id'))), 'clientesRetenidos']
    ]
  })
    .then(data => {
      const tasaRetencion = (data[0].dataValues.clientesRetenidos / data[0].dataValues.totalClientes) * 100;
      res.send({ tasaRetencion });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al calcular la tasa de retención de clientes."
      });
    });
};

// Obtener el número de puntos canjeados
exports.puntosCanjeados = (req, res) => {
  PointUsage.sum('puntaje_utilizado')
    .then(totalPuntosCanjeados => {
      res.send({ totalPuntosCanjeados });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al calcular el número de puntos canjeados."
      });
    });
};

// Obtener el retorno de la inversión (ROI)
exports.retornoInversion = (req, res) => {
  PointBalance.sum('monto_operacion')
    .then(totalCompras => {
      PointUsage.sum('puntaje_utilizado')
        .then(totalPuntosCanjeados => {
          const costoPuntosCanjeados = totalPuntosCanjeados * 0.01; // Suponiendo que cada punto canjeado cuesta $0.01
          const roi = (totalCompras - costoPuntosCanjeados) / costoPuntosCanjeados;
          res.send({ roi });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocurrió un error al calcular el costo de los puntos canjeados."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al calcular el valor de las compras realizadas."
      });
    });
};