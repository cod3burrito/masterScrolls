const { Schema, model, Types } = require('mongoose')

const LocationSchema = new Schema(
    {
        locationId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        name: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        characters: [
            {
                type: Schema.Types.ObjectId,
                ref: "Character"
            }
        ],
    }
)

const Location = model('Location', LocationSchema)

module.exports = Location