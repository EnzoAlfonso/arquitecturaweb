// app/routes/dashboard.routes.js
module.exports = app => {
  const dashboard = require("../controllers/dashboard.controller.js");
  var router = require("express").Router();

  router.get("/retencion-clientes", dashboard.retencionClientes);
  router.get("/puntos-canjeados", dashboard.puntosCanjeados);
  router.get("/roi", dashboard.retornoInversion);

  app.use('/api/dashboard', router);
};