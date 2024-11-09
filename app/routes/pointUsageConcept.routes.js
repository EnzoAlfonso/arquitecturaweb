module.exports = app => {
  const pointUsageConcept = require("../controllers/pointUsageConcept.controller");
  var router = require("express").Router();

  router.post("/", pointUsageConcept.create);
  router.get("/", pointUsageConcept.findAll);
  router.get("/:id", pointUsageConcept.findOne);
  app.use('/api/pointusageconcept', router);
};
