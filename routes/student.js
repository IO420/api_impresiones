const express = require('express');
const router = express.Router();
const connection = require('../db');
const studentValidator = require('../validators/studentValidator');
const handleValidation = require('../middleware/handleValidation');
const verifyToken = require('../middleware/verifyToken');

router.post('/',
    verifyToken,
    studentValidator,
    handleValidation,
    (req, res) => {
        const { numAccount } = req.body;
        connection.query(
            'SELECT a.id_cuenta, a.nombre , a.correo , a.credito, b.carrera FROM alumno a JOIN carrera b ON (a.id_carrera = b.id_carrera) WHERE a.id_cuenta = ?;',
            [numAccount],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al consultar' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'Alumno no encontrado' });
                }
                res.json(results);
            }
        );
    });

module.exports = router;
