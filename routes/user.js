const express = require('express');
const router = express.Router();
const { handelSignupUser, handelSigninUser, handelLououtUser } = require('../controller/user');
const Blog = require('../model/blog');
router.get('/signin', (req, res) => {
    res.render('signin')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.render('home', {
        User: req.user,
        Blogs : blogs
        
    })
})

router.get('/explore', async (req, res) => {
    const searchQuery = req.query.q || '';
    let blogs;
    if (searchQuery) {
        blogs = await Blog.find({
            title: { $regex: searchQuery, $options: 'i' }
        }).sort({ createdAt: -1 });
    } else {
        blogs = await Blog.find({}).sort({ createdAt: -1 });
    }
    res.render('explore', {
        User: req.user,
        Blogs: blogs,
        query: searchQuery,
    });
})

router.get('/profile', async (req, res) => {
    if (!req.user) return res.redirect('/signin');
    const userBlogs = await Blog.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.render('profile', {
        User: req.user,
        Blogs: userBlogs
    });
});

router.get('/logout', handelLououtUser);

// router.get('/signin',)

router.post('/signup', handelSignupUser);
router.post('/signin', handelSigninUser)
module.exports = router;