const express = require('express')
const router = express.Router();
const postsCtrl = require('../../controllers/posts')
const multer = require('multer') //multer handle multipar data coming from the image we upload
const upload = multer() //multipart data 

// Public routes 
router.post('/', upload.single('photo'), postsCtrl.create)
router.get('/', postsCtrl.index);

module.exports = router;
