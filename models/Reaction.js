const { Schema, model } = require('mongoose');
const formatDate = function () {
    return this.createdAt.toLocaleDateString('en-US');;
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: mongoose.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;