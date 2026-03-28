const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require('../services/Authentication')
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        
    },
    password: {
        type: String,
        required: true,
    },
    profileImgUrl: {
        type: String,
        default: 'images/avtar.png'
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }

}, { timestamps: true })


// Remove next completely

// userSchema.pre("save", async function () {

//     if (!this.isModified("password")) return;

//     const salt = randomBytes(16).toString("hex");

//     const hashPassword = createHmac("sha256", salt)
//         .update(this.password)
//         .digest("hex");
//     this.salt = salt;
//     this.password = hashPassword;
// });
// ✅ No next()
// ✅ Cleaner
// ✅ Industry standard

//Method 2 
// If you want to use next, then remove async:

// userSchema.pre("save", function (next) {

//     if (!this.isModified("password"))
//         return next();

//     const salt = randomBytes(16).toString("hex");

//     const hashPassword = createHmac("sha256", salt)
//         .update(this.password)
//         .digest("hex");

//     this.salt = salt;
//     this.password = hashPassword;

//     next();
// });

userSchema.pre("save", async function (next) { //
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = randomBytes(16).toString('hex');
    const hashPassword = createHmac("sha256", salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashPassword;
   
}) // may be a middleware function before saving a user
userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {

    const user = await this.findOne({ email });
 
    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const hashPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== hashPassword)
        throw new Error("Invalid Password");

    const token = createTokenForUser(user);
    
    return token;
};
const User = model("User", userSchema);
module.exports = User;