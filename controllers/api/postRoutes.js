const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Prevent non logged in users from viewing the post
router.get('/posts/:id', withAuth, async (req, res) => {
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
