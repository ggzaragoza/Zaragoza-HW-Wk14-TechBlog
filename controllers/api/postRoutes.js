const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// // GET one post
// router.get('/:user_id', async (req, res) => {
//   try {
//     const dbPostData = await Post.findByPk(req.params.id);

//     const post = dbPostData.get({ plain: true });
    
//     res.render('post', { post });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });



// GET ALL POSTS BY AUTHOR aka DASHBOARD ROUTE
// router.get('/', async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       include: [ { model: User } ],
//       where: {
//         user_id: req.session.user_id
//       },
//     }
//     );

//     const posts = postData.map((post) => post.get({ plain: true }));

//     res.render('dashboard', {
//       posts,
//       // Pass the logged in flag to the template
//       user_id: req.session.user_id,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
