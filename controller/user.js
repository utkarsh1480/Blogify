const { TokenExpiredError } = require('jsonwebtoken');
const User = require('../model/user');
async function handelSignupUser(req, res) {
    const { first_name, email, password } = req.body;
    if (!first_name || !email || !password) return res.render('signup');
    const user = await User.create({
        first_name,
        email,
        password
    });
    res.redirect('/signin');
}

async function handelSigninUser(req, res) {
    const { email, password } = req.body;

    try {
        const token =
            await User.matchPasswordAndGenerateToken(email, password);

        res.cookie("token", token).redirect('/');
    }
    catch (error) {
        console.log(error);

        res.render('signin', {
            error: "Incorrect Email or Password",
        });
    }
}

function handelLououtUser(req, res) {
    res.clearCookie("token").redirect('/');
}


module.exports = {
    handelSignupUser,
    handelSigninUser,
    handelLououtUser,

}
