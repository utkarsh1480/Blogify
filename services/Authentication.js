const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function createTokenForUser(User) {
    const payload = {  // what to store in token and what is Token
        _id: User._id,
        email: User.email,
        profileImgUrl: User.profileImgUrl,
        role: User.role
    };
    const token = JWT.sign(payload, secret);
    return token;
}
function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}
