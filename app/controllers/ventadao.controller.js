const db = require("../models");
const Ventas = db.Ventas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// Validate request
if (!req.body.factura) {
res.status(400).send({
  message: "Debe enviar numero de factura!"
});
return;
}
// crea una venta
const venta = {
  cliente: req.body.cliente,
  factura: req.body.factura,
  total: req.body.total
};
// Guardamos a la base de datos
Ventas.create(venta).then(data => {
    res.send(data);
}).catch(err => {
  res.status(500).send({
    message:
      err.message || "Ha ocurrido un error al crear una venta."
    });
  });
};