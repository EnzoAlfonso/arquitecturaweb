const db = require("../models");
const Cliente = db.Clientes;
const Op = db.Sequelize.Op;

// Crear un nuevo cliente
exports.create = (req, res) => {
  // Validar el request
  if (!req.body.numero_documento) {
    res.status(400).send({
      message: "Debe enviar el número de documento del cliente."
    });
    return;
  }

  // Crear cliente
  const cliente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    numero_documento: req.body.numero_documento,
    tipo_documento: req.body.tipo_documento,
    nacionalidad: req.body.nacionalidad,
    email: req.body.email,
    telefono: req.body.telefono,
    fecha_nacimiento: req.body.fecha_nacimiento
  };

  // Guardar en la base de datos
  Cliente.create(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear el cliente."
      });
    });
};

// Buscar un cliente por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró cliente con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener cliente con id=" + id
      });
    });
};

// Obtener todos los clientes o buscar por nombre
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Cliente.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener los clientes."
      });
    });
};