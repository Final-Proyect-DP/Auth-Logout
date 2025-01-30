const { deleteToken } = require('../utils/redisUtils');
const handleErrors = require('../utils/handleErrors');

async function logoutUser(req, res) {
    try {
        const result = await deleteToken(req.userId);
        res.status(200).json(result);
    } catch (error) {
        const handledError = handleErrors(error);
        res.status(handledError.status).json(handledError.response);
    }
}

module.exports = { logoutUser };
