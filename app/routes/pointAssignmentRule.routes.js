// pointAssignmentRule.routes.js
module.exports = app => {
  const pointAssignmentRule = require("../controllers/pointAssignmentRule.controller");
  const router = require("express").Router();
  router.post("/", pointAssignmentRule.create);
  router.get("/", pointAssignmentRule.findAll);
  router.get("/:id", pointAssignmentRule.findOne);
  router.put("/:id", pointAssignmentRule.update);
  router.delete("/:id", pointAssignmentRule.delete);
  app.use("/api/pointassignmentrule", router);
};