const { Schema, model } = require('mongoose')
const LocationSchema = require('./Location')
const CampaignSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        plot: {
            type: String,
        },
        public: {
            type: Boolean,
            default: false
            //false means that its private
        },
        locations: [LocationSchema],
    }
)

const Campaign = model('Campaign', CampaignSchema)

module.exports = Campaign

