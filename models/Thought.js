const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM/DD/YYYY hh:mm a')
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

    const ThoughtSchema = new Schema(
        {
            thoughtText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (createdAtVal) => moment(createdAtVal).format('MM/DD/YYYY hh:mm a')
            },
            reactions: [ReactionSchema],
        },
            {
                toJSON: {
                    virtuals: true,
                    getters: true
                },
                id: false
            }
    );

    const Thought = model('Thought', ThoughtSchema);

    ThoughtSchema.virtual('reactionsCount').get(function() {
        return this.reactions.length;
    });

    module.exports = Thought;