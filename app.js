require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const route = require('./routes/user.js');
const cookieParser = require('cookie-parser')
const { authenticateToken } = require('./middlewares/authentication.js');
const blogRoute = require('./routes/blog.js')
const dbConnect = require('./auth/connection.js');



dbConnect();
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.use(authenticateToken("token"));
app.use('/', route);
app.use('/blog', blogRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});

module.exports = app;