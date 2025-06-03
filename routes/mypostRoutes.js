const express = require('express');
const router = express.Router();
const postController = require('../controller/mypostController');

// Show form
router.get('/mypost', postController.showPostForm);
router.get('/view/:id', postController.viewPost);       // View blog
router.get('/edit/:id', postController.showEditForm);   // Edit form
router.post('/edit/:id', postController.updatePost);    // Save changes
router.post('/delete/:id', postController.deletePost);  // Delete post

// Handle form submission
router.post('/submit-post', postController.submitPost);

module.exports = router;
