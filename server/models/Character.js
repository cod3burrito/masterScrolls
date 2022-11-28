const { Schema, model, Types } = require('mongoose')

const characterSchema = new Schema(
    {
        characterId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        name: {
            type: String,
            required: true
        },
        alive: {
            type: Boolean,
            default: true,
        },
        class: {
            type: String,
        },
        level: {
            type: Number,
        },
        goals: {
            type: String,
        },
        personality: {
            type: String,
        },
        allies: [
            {
                type: String,
            }
        ],
        notes: [
            {
                type: String
            }
        ]


    }
)

module.exports = characterSchema