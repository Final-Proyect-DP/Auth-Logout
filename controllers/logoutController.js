const { deleteToken } = require('../utils/redisUtils');
const handleErrors = require('../utils/handleErrors');
const {sendLogoutMessage } = require('../producer/kafkaProducer');

async function logoutUser(req, res) {
    try {
        sendLogoutMessage(req.userId, req.token);
        
        const result = await deleteToken(req.userId);
        res.status(200).json(result);
    } catch (error) {
        const handledError = handleErrors(error);
        res.status(handledError.status).json(handledError.response);
    }

}

module.exports = { logoutUser };
