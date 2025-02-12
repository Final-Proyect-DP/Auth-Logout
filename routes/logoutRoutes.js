const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout/{id}:
 *   post:
 *     summary: Logout a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT Token
 *     responses:
 *       200:
 *         description: Session successfully closed
 *       401:
 *         description: Invalid or expired token
 *       500:
 *         description: Server error
 */
router.post('/:id', verifyToken, logoutController.logoutUser);

module.exports = router;
