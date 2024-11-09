module.exports = app => {
  const pointBalance = require("../controllers/pointBalance.controller.js");
  var router = require("express").Router();
  router.post("/", pointBalance.create);
  router.get("/", pointBalance.findAll);
  router.get("/:id", pointBalance.findOne);
  app.use('/api/pointbalance', router);
};
