const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout/{id}:
 *   post:
 *     summary: Desloguear un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *       401:
 *         description: Token inválido o expirado
 *       500:
 *         description: Error del servidor
 */
router.post('/:id', verifyToken, logoutController.logoutUser);

module.exports = router;
