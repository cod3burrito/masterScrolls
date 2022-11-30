const { Schema, model, Types } = require('mongoose')

const CharacterSchema = new Schema(
    {
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
            type: String,
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

const Character = model('Character', CharacterSchema)

module.exports = Character