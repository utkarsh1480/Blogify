const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const { connect } = require('./connect.js');
const port = 3000;
const route = require('./routes/user.js');
const cookieParser = require('cookie-parser')
const { authenticateToken } = require('./middlewares/authentication.js');
const blogRoute = require('./routes/addblog.js')



connect("mongodb://127.0.0.1:27017/Blogify")
  .then((e) => console.log("MongoDB connected"))
  .catch((error) => console.log(error))

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));

app.use(authenticateToken("token"));
app.use('/', route);
app.use('/add-blog', blogRoute);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});