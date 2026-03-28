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

router.get('/logout', handelLououtUser);

// router.get('/signin',)

router.post('/signup', handelSignupUser);
router.post('/signin', handelSigninUser)
module.exports = router;