// routes/pointUsage.routes.js
module.exports = (app) => {
  const pointUsageController = require("../controllers/pointUsage.controller.js");
  const express = require("express");
  const router = express.Router();

  // Ruta para crear un nuevo PointUsage
  router.post("/", pointUsageController.create);

  // Ruta para obtener todos los PointUsages
  router.get("/", pointUsageController.findAll);

  // Ruta para obtener un PointUsage por ID
  router.get("/:id", pointUsageController.findOne);

  // Configurar la ruta base para PointUsage
  app.use('/api/pointusage', router);
};
