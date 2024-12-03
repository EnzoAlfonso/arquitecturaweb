module.exports = app => {
  const nivelFidelizacion = require("../controllers/nivelFidelizacion.controller.js");
  var router = require("express").Router();

  router.post("/", nivelFidelizacion.create);
  router.get("/", nivelFidelizacion.findAll);
  router.get("/:id", nivelFidelizacion.findOne);
  router.put("/:id", nivelFidelizacion.update);
  router.delete("/:id", nivelFidelizacion.delete);

  app.use('/api/nivelFidelizacion', router);
};