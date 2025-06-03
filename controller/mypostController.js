const Post = require('../models/mypostModel');


// Show the form to create a post
exports.showPostForm = (req, res) => {
  res.render('mypost'); // Assumes views/post.ejs exists
};

// Handle post submission
exports.submitPost = async (req, res) => {
  const { title, category, content } = req.body;
  try {
    await Post.createPost(title, category, content);
    res.redirect('/home');
  } catch (err) {
    res.status(500).send('Error saving post: ' + err.message);
  }
};
exports.viewPost = async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.render('viewpost', { post });
  } catch (error) {
    console.error('Error viewing post:', error);
    res.status(500).send('Server error');
  }
};

exports.showEditForm = async (req, res) => {
    const post = await Post.getById(req.params.id);
    res.render('editpost', { post });
};

exports.updatePost = async (req, res) => {
    const { title, category, content } = req.body;
    await Post.update(req.params.id, { title, category, content });
    res.redirect('/home');
};

exports.deletePost = async (req, res) => {
  await Post.delete(req.params.id);
  res.redirect('/home');
};

