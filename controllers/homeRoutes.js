const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      // order: [['id', 'ASC']],
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
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          // attributes: ['username'],
        },
      ]});

    const post = dbPostData.get({ plain: true });
    
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
      // username: Post.user_id
    });
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

// router.get('/dashboard', withAuth, (req, res) => {
//   // If a session exists, redirect the request to the homepage
//   if (!req.session.logged_in) {
//     res.redirect('/login');
//     return;
//   // } else {
//   //   res.redirect('/login');
//   }

//   res.render('dashboard', { logged_in: req.session.logged_in });
// });

// GET ALL POSTS BY AUTHOR aka DASHBOARD ROUTE
router.get('/dashboard', withAuth, async (req, res) => {
  // if (!req.session.logged_in) {
  //   res.redirect('/login')
  // } else {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        // include: [ { model: User, attributes: ['username'] } ],
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// router.post('/post/:id', async (req, res) => {
//   try {
//     const dbPostData = await Post.create(req.params.id);

//     const post = dbPostData.get({ plain: true });
    
//     res.render('post', { post, logged_in: req.session.logged_in });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;