module.exports = app => {
  const pointExpiration = require("../controllers/pointExpiration.controller");
  var router = require("express").Router();

  router.post("/", pointExpiration.create);
  router.get("/", pointExpiration.findAll);
  router.get("/:id", pointExpiration.findOne);
  app.use('/api/pointexpiration', router);
};
