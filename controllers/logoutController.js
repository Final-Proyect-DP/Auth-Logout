const logoutService = require('../services/logoutService');
const logger = require('../logger');

async function logoutUser(req, res) {
    const { userId, token } = req.params;

    if (!userId || !token) {
        const message = 'User ID and token are required';
        logger.warn(message);
        return res.status(400).json({ message });
    }

    try {
        const message = await logoutService.logoutUser(userId, token);
        res.status(200).json({ message });
    } catch (error) {
        const message = `Error logging out user: ${error.message}`;
        logger.error(message);
        res.status(500).json({ message });
    }
}

module.exports = {
    logoutUser
};
