const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./app/models");


var corsOptions = {
  origin: "http://localhost:9091"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Arquitectura web" });
});

require("./app/routes/venta.routes")(app);
require('./app/routes/cliente.routes.js')(app);
require('./app/routes/pointBalance.routes.js')(app);
require('./app/routes/pointExpiration.routes.js')(app);
require('./app/routes/pointUsageConcept.routes.js')(app);
require('./app/routes/pointUsage.routes.js')(app);
require("./app/routes/pointAssignmentRule.routes.js")(app);
require("./app/routes/nivelFidelizacion.routes.js")(app);
require("./app/routes/referidos.routes.js")(app);
require("./app/routes/dashboard.routes.js")(app);
require("./app/routes/satisfaccion.routes.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}.`);
});