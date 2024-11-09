module.exports = app => {
  const pointUsage = require("../controllers/pointUsage.controller.js");
  var router = require("express").Router();

  router.post("/", pointUsage.create);
  router.get("/", pointUsage.findAll);
  router.get("/:id", pointUsage.findOne);
  app.use('/api/pointusage', router);
};
