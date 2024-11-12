module.exports = app => {
  const pointBalance = require("../controllers/pointBalance.controller.js");
  const router = require("express").Router();
  router.post("/", pointBalance.createOrUpdatePointBalance);
  router.get("/", pointBalance.findAll);
  router.get("/:id", pointBalance.findOne);
  router.delete("/:id", pointBalance.delete);
  app.use('/api/pointBalance', router);
};
