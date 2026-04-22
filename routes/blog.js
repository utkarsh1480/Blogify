const express = require('express');
const router = express.Router();
const { handelshowBlog, handelCreateBlog, handelDeleteBlog, handelShowEditPage, handelUpdateBlog } = require('../controller/blog')
const path = require('path');
const multer = require('multer')
const blog = require('../model/blog');
const comment = require('../model/comment');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', handelshowBlog);
router.post('/', upload.single('coverImage'), handelCreateBlog);

router.get('/edit/:id', handelShowEditPage);
router.post('/edit/:id', upload.single('coverImage'), handelUpdateBlog);
router.get('/delete/:id', handelDeleteBlog);

router.get('/:id', async (req, res) => {
    const blogId = req.params.id;

    const Blog = await blog.findById(blogId).populate('createdBy');
    const comments = await comment.find({ blogId: req.params.id }).populate(
        "createdBy"
    );

    if (!Blog) {
        return res.status(404).send('Blog not found');
    }
    res.render('viewBlog', { User: req.user, blog: Blog, comments: comments });
});

router.post('/comments/:id', async (req, res) => {
    const blogId = req.params.id;
    const { title } = req.body;

    if (!title) {
        return res.status(400).send('Comment title is required');
    }
    await comment.create({
        title,
        createdBy: req.user._id,
        blogId
    });
    res.redirect(`/blog/${blogId}`);
});



module.exports = router;