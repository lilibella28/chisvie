const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');


const s3 = new S3();

module.exports = {
    create,
    index,
    deletePost
}

function create(req, res){
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});
			await post.populate('user');
            res.status(201).json({post: post})
        })


    } catch(err){
        res.json({data: err})
    }
}
function deletePost(req, res){
    try {
        
        const post = await Post.findOne({'posts._id': req.params.id});
        post.remove(req.params.id) 
        await post.save() 
        res.json({data: 'post removed'})
    } catch(err){
        res.status(400).json({err})
    }
}

async function index(req, res){
    try {
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}