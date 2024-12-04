module.exports = app => {
    const referidoController = require("../controllers/referidos.controller");
    var router = require("express").Router();
    router.post("/referir", referidoController.crearReferencia);
    router.get("/:cliente_id/referidos", referidoController.consultarReferencias);
    router.get("/:referido_id/referentes", referidoController.consultarClientesReferentes);

    app.use('/api/referidos', router);
  };
  