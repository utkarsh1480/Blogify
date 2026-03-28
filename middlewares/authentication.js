const { validateToken } = require("../services/Authentication");

function authenticateToken(cookiename) {
    return (req, res, next) => {
        const tokenCookiesValue = req.cookies[cookiename];
        if (!tokenCookiesValue) {
            return next(); // here error comes when next in same line
        } 
        try {
            const user = validateToken(tokenCookiesValue);
            req.user = user;
        } catch (error) { }
        return next();
    }
}
module.exports = {
    authenticateToken
}
