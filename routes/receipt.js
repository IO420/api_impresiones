const express = require('express');
const router = express.Router();
const connection = require('../db');
const receiptValidator = require('../validators/receiptValidator');
const handleValidation = require('../middleware/handleValidation');
const verifyToken = require('../middleware/verifyToken');

router.post('/',
    verifyToken,
    receiptValidator,
    handleValidation,
    (req, res) => {
    const { fol, amount, date, numAccount } = req.body;
    const idUser = req.user.id_usuario;

    connection.query(
        'SELECT * FROM recibo WHERE folio_recibo = ?;',
        [fol],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al verificar recibo' });
            }

            if (results.length > 0) {
                return res.status(409).json({ error: 'El recibo ya existe' });
            }

            connection.query(
                'INSERT INTO recibo (folio_recibo, monto, fecha_recibo, id_cuenta, id_usuario) VALUES (?, ?, ?, ?, ?);',
                [fol, amount, date, numAccount, idUser],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error al guardar recibo' });
                    }

                    // Luego actualizamos el crédito
                    connection.query(
                        'UPDATE alumno SET credito = credito + ? WHERE id_cuenta = ?;',
                        [amount, numAccount],
                        (err) => {
                            if (err) {
                                return res.status(500).json({ error: 'Recibo guardado pero falló la actualización del crédito' });
                            }

                            res.json({ message: 'Recibo guardado correctamente y crédito actualizado' });
                        }
                    );
                }
            );
        }
    );
});

module.exports = router;
