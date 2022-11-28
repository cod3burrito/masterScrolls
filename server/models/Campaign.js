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
            default: ''
            //empty string so we have no error with people leaving it empty
        },
        public: {
            type: Boolean,
            default: false
            //false means that its private
        },
        locations: [
            {
                type: Schema.Types.ObjectId,
                ref: "Location"
            }
        ],
    }
)

const Campaign = model('Campaign', CampaignSchema)

module.exports = Campaign

