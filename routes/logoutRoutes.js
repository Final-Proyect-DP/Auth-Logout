const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout/{userId}/{token}:
 *   post:
 *     summary: Desloguear un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT del usuario
 *     responses:
 *       200:
 *         description: Usuario deslogueado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User ID y token son requeridos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al desloguear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/:userId/:token', logoutController.logoutUser);

module.exports = router;
