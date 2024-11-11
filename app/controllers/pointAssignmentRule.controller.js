const db = require("../models");
const PointAssignmentRule = db.PointAssignmentRule;
const Op = db.Sequelize.Op;

// Crear una nueva regla de asignación de puntos
exports.create = (req, res) => {
    if (!req.body.equivalencia_punto) {
        res.status(400).send({ message: "Debe enviar la equivalencia de puntos." });
        return;
    }

    const regla = {
        limite_inferior: req.body.limite_inferior,
        limite_superior: req.body.limite_superior,
        equivalencia_punto: req.body.equivalencia_punto
    };

    PointAssignmentRule.create(regla)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al crear la regla de asignación de puntos." }));
};

// Obtener todas las reglas o buscar por límite inferior o superior
exports.findAll = (req, res) => {
    const limiteInferior = req.query.limite_inferior;
    const limiteSuperior = req.query.limite_superior;
    let condition = limiteInferior || limiteSuperior ? { [Op.and]: [] } : null;

    if (limiteInferior) condition[Op.and].push({ limite_inferior: { [Op.gte]: limiteInferior } });
    if (limiteSuperior) condition[Op.and].push({ limite_superior: { [Op.lte]: limiteSuperior } });

    PointAssignmentRule.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Error al obtener las reglas de asignación de puntos." }));
};

// Obtener una regla por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PointAssignmentRule.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: 'No se encontró la regla con id=${id}. '});
        })
        .catch(err => res.status(500).send({ message: "Error al obtener la regla con id=" + id }));
};

// Actualizar una regla por id
exports.update = (req, res) => {
    const id = req.params.id;

    PointAssignmentRule.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Regla actualizada exitosamente." });
            else res.status(404).send({ message: 'No se encontró la regla con id=${id} o no se realizaron cambios.' });
        })
        .catch(err => res.status(500).send({ message: "Error al actualizar la regla con id=" + id }));
};

// Eliminar una regla por id
exports.delete = (req, res) => {
    const id = req.params.id;

    PointAssignmentRule.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Regla eliminada exitosamente." });
            else res.status(404).send({ message: 'No se encontró la regla con id=${id}. '});
        })
        .catch(err => res.status(500).send({ message: "Error al eliminar la regla con id=" + id }));
};