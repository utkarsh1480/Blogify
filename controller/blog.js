const Blog = require('../model/blog');


function handelshowBlog(req, res) {
    res.render('addblog', { User: req.user });

}
async function handelCreateBlog(req, res) {
    const { title, body } = req.body;

    if (!title || !body || !req.file) {
        return res.render('addblog', {
            User: req.user,
            error: 'All fields are required, please fill all fields',
        });
    }

    await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`,
    });

    return res.redirect('/?success=Blog added successfully!');
}

async function handelDeleteBlog(req, res) {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    if (blog.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
    }
    await Blog.findByIdAndDelete(req.params.id);
    return res.redirect('/profile?success=Blog deleted successfully');
}

async function handelShowEditPage(req, res) {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    if (blog.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
    }
    res.render('editBlog', { User: req.user, blog });
}

async function handelUpdateBlog(req, res) {
    const { title, body } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    if (blog.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).send("Unauthorized");
    }

    const updateData = { title, body };
    if (req.file) {
        updateData.coverImage = `/uploads/${req.file.filename}`;
    }

    await Blog.findByIdAndUpdate(req.params.id, updateData);
    return res.redirect(`/blog/${req.params.id}?success=Blog updated successfully`);
}

module.exports = {
    handelshowBlog,
    handelCreateBlog,
    handelDeleteBlog,
    handelShowEditPage,
    handelUpdateBlog
}