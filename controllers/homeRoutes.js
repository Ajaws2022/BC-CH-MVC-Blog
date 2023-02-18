const router = require('express').Router();

const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    try {
        const allPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const posts = allPostData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err)
    }
});

router.get('/post/:id', withAuth, async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['content', 'date']
                }
            ]
        });

        const singlePost = postData.get({plain: true})

        res.render('singlepost', {
            ...singlePost,
            logged_in: true
        });
    } catch(err){
        res.status(401).json(err)
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [
                {
                    model: Post,
                    attributes: ['title', 'date']
                }
            ]
        });

        const user = userData.get({plain:true});

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch(err){
        res.status(401).json(err)
    }
});
router.get('/login', (req, res) => {
    try {
        res.render('login')
    } catch (err){
        res.status(500).json(err)
    }
});
router.get('/signup', (req, res) => {
    try {
        res.render('signup')
    } catch (err){
        res.status(500).json(err)
    }
});

module.exports = router;