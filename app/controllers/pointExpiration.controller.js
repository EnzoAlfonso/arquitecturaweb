const db = require("../models");
const PointExpiration = db.PointExpirations;

// Crear una nueva parametrización de vencimiento de puntos
exports.create = (req, res) => {
    if (!req.body.fecha_inicio || !req.body.fecha_fin || !req.body.duracion_dias) {
        res.status(400).send({ message: "Todos los campos son obligatorios (fecha_inicio, fecha_fin, duracion_dias)." });
        return;
    }

    const expiration = {
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        duracion_dias: req.body.duracion_dias
    };

    PointExpiration.create(expiration)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al crear la parametrización de vencimiento de puntos." }));
};

// Obtener todas las parametrizaciones de vencimientos
exports.findAll = (req, res) => {
    PointExpiration.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al obtener las parametrizaciones de vencimiento de puntos." }));
};

// Obtener una parametrización de vencimiento por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PointExpiration.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `No se encontró la parametrización con id=${id}.` });
        })
        .catch(err => res.status(500).send({ message: "Error al obtener la parametrización con id=" + id }));
};

// Actualizar una parametrización de vencimiento por id
exports.update = (req, res) => {
    const id = req.params.id;

    PointExpiration.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Parametrización actualizada exitosamente." });
            else res.status(404).send({ message: `No se encontró la parametrización con id=${id} o no se realizaron cambios.` });
        })
        .catch(err => res.status(500).send({ message: "Error al actualizar la parametrización con id=" + id }));
};

// Eliminar una parametrización de vencimiento por id
exports.delete = (req, res) => {
    const id = req.params.id;

    PointExpiration.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Parametrización eliminada exitosamente." });
            else res.status(404).send({ message: `No se encontró la parametrización con id=${id}. `});
        })
        .catch(err => res.status(500).send({ message: "Error al eliminar la parametrización con id=" + id }));
};