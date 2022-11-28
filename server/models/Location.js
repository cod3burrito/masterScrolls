const {Schema, model, Types} = require('mongoose')
const LocationSchema = require('./Character')

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
        characters: [characterSchema],
    }
)

module.exports = LocationSchema