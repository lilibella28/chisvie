const mongoose = require('mongoose')

const likeSchema = mongoose.Schema({
    username: String,
    userId: {type: mongoose.Schema.Types.ObjectId}
})

// Creating the postSchema, 
const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //getting the userId from the user model.Why? becuase i want the id of the user who create a post
    photoUrl: String,
    caption: String,
    likes: [likeSchema]

})



module.exports = mongoose.model('Post', postSchema)