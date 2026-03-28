const express = require('express');
const router = express.Router();
const { handelshowBlog, handelCreateBlog } = require('../controller/add-blog')
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})
const upload = multer({ storage: storage })

router.get('/', handelshowBlog);
router.post('/', upload.single('coverImage'), handelCreateBlog);

router.get('/:id', async (req, res) => {
    const blogId = req.params.id;
    const Blog = await User.findById(blogId).populate('createdBy');
    if (!Blog) {
        return res.status(404).send('Blog not found');
    }
    res.render('viewBlog', { User: User, blog: Blog });
});



module.exports = router;