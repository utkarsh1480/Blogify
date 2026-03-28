const Blog = require('../model/blog');


function handelshowBlog(req, res) {
    res.render('addblog', { User: req.user });
    
}
async function handelCreateBlog(req, res) {
    const Body = req.body;
    const { title, body } = req.body;
    if (!Body) return res.redirect('/');
    const addedBlog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`
    });
    console.log(addedBlog);
    res.redirect('/');

}

module.exports = {
    handelshowBlog,
    handelCreateBlog

}