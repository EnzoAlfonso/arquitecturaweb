module.exports = app => {
  const pointExpiration = require("../controllers/pointExpiration.controller.js");
  const router = require("express").Router();
  router.post("/", pointExpiration.create);
  router.get("/", pointExpiration.findAll);
  router.get("/:id", pointExpiration.findOne);
  router.put("/:id", pointExpiration.update);
  router.delete("/:id", pointExpiration.delete);
  app.use("/api/pointExpiration", router);
};