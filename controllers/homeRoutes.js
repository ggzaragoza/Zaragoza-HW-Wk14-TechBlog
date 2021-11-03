const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SINGLE POST
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);

    const post = dbPostData.get({ plain: true });
    
    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  // } else {
  //   res.redirect('/login');
  }

  res.render('login');
});

router.get('/dashboard', withAuth, (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  // } else {
  //   res.redirect('/login');
  }

  res.render('dashboard', { logged_in: req.session.logged_in });
});

module.exports = router;