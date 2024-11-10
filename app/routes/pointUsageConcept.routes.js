module.exports = app => {
  const pointUsageConcept = require("../controllers/pointUsageConcept.controller");
  var router = require("express").Router();

  router.post("/", pointUsageConcept.create);
  router.get("/", pointUsageConcept.findAll);
  router.get("/:id", pointUsageConcept.findOne);
  router.put("/:id", pointUsageConcept.update);
  router.delete("/:id", pointUsageConcept.delete);
  app.use('/api/pointusageconcept', router);
};
