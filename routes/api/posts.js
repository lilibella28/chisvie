const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer  = require('multer')
const upload = multer();// I am here to handle multiform data
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)




module.exports = router;