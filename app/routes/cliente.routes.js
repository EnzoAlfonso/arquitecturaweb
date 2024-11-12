module.exports = app => {
  const cliente = require("../controllers/cliente.controller.js");
  var router = require("express").Router();
  router.post("/", cliente.create);
  router.get("/", cliente.findAll);
  router.get("/:id", cliente.findOne);
  router.delete("/:id", cliente.delete);
  app.use('/api/cliente', router);
};