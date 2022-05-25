// require models, post
const Post = require('../models/post');
const { v4: uuidv4 } = require("uuid");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // A new instans of the aws-sdk-/clients/s3

module.exports = {
	create,
	index,
};

// I want to create a post with text, videos or pictures
function create(req, res) {
	try {
		const filePath = `${uuidv4()}/${req.file.originalname}`;
		const params = { Bucket: process.env.BUCKET_NAME, key: filePath, Body: req.file.buffer };
		s3.upload(params, async function (err, data) {
			const post = await post.create({ caption: req.body.caption, user: req.user, photoUrl: data.Location });
			console.log(post, "I AM A POST ")
			await post.populate('user'); // We need to populate he user before sending the data post back
			res.status(201).json({ post: post });
		});
	} catch (err) {
		// catching the error from the s3.upload
		res.json({ data: err });
	}
}
// Populate the user after it find the post
async function index(req, res) {
	try {
		const posts = await Post.find({}).populate('user').exec();
		res.status(200).json({ posts });
	} catch (err) {}
}
