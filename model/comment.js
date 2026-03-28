const { Schema, model } = require('mongoose');
const commentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }


}, { timestamps: true });
const comment = model("comment", commentSchema);

module.exports = comment;