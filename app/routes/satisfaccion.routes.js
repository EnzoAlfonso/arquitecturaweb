module.exports = app => {
    const satisfaccion = require("../controllers/satisfaccion.controller.js");
    var router = require("express").Router();
  
    router.post("/", satisfaccion.create);
    router.get("/", satisfaccion.findAll);
    router.get("/:id", satisfaccion.findOne);
    router.delete("/:id", satisfaccion.delete);
  
    app.use('/api/satisfaccion', router);
  };