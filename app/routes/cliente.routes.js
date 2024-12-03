module.exports = app => {
  const cliente = require("../controllers/cliente.controller.js");
  var router = require("express").Router();

  router.get("/segmentacion", cliente.segmentar)

  router.post("/", cliente.create);
  router.get("/", cliente.findAll);
  router.get("/:id", cliente.findOne);
  router.delete("/:id", cliente.delete);
  router.put("/:id/nivel", cliente.actualizarNivelFidelizacion);

  app.use('/api/cliente', router);
};