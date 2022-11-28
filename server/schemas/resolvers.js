const { User, Campaign, Location, Character } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        //this is retrieving the logged in users info
        getUser: async (parent, args, context) => {
            // if (context.user) {
            // return User.findOne({ _id: context.user._id }).populate('campaign').populate('location').populate('characters')
            // }
            // throw new AuthenticationError('you must be logged in!')
            return User.findOne({ _id: args.id })

        },
        //find a single campaign, irrespective of the user
        getCampaign: async (parent, args) => {
            return Campaign.findById(args.id).populate('location').populate('characters')
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('You have not joined the ranks with these credentials! Please verify your identity or query the council for membership to our guild.')
            }
        },
        createUser: async (parent, { username, email, password }) => {
            return await User.create({ username, email, password })
        },
        deleteUser: async (parent, { userId }) => {
            return User.findOneAndDelete({ _id: userId });
        },
        createCampaign: async (parents, { userId, name, plot }, context) => {
            // if (context.user) {
            const defaultLocation = await Location.create(
                { name: "Unassociated", details: "This is the default location created when you create a campaign" },
                // { details: "This is the default location created when you create a campaign" }
            )
            //new version, potential option
            const newCampaign = await Campaign.create({ name, plot, locations: [defaultLocation._id] })
            //add the new campaign to the user's data
            const updatedUser = await User.findByIdAndUpdate(
                // { _id: context.user._id },
                { _id: userId },
                { $push: { campaigns: newCampaign._id } },
                { new: true }
            )
            //old version
            // const newCampaign = await Campaign.create({ name, plot })
            //option for adding in the default location
            // const updatedCampaign = await Campaign.findByIdAndUpdate(
            //     { _id: newCampaign._id },
            //     { $push: { locations: defaultLocation._id } }
            // )
            return newCampaign
            // }
        },
        editCampaign: async (parents, { campaignId, name, plot }, context) => {
            // if (context.user) {
            const updatedCampaign = await Campaign.findByIdAndUpdate(
                { _id: campaignId },
                { $set: { name: name, plot: plot } }

            )
            return updatedCampaign
            // }

        },
        deleteCampaign: async (parents, { campaignId }, context) => {
            // if (context.user) {
            const deletedCampaign = await Campaign.findByIdAndDelete(
                { _id: campaignId }
            )
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { campaigns: campaignId } }
            )
            return { deletedCampaign, updatedUser }
            // }

        },
        createLocation: async (parents, {campaignId, name, details}, context) => {
            if (context.user) {
                const newLocation = await Location.create({name, details});
                const updateCampaign = await Campaign.findByIdAndUpdate(
                    { _id: campaignId },
                    { $push: { location: newLocation._id}}
                )
                return {newLocation, updateCampaign};
            }
        },
        editLocation: async (parent, {locationId, name, details}, context) => {
            if (context.user) {  
                const updateLocation = await Location.findByIdAndUpdate( 
                    { _id: locationId },
                    {
                        $set: { name: name, details: details }
                    },
                )
                return updateLocation
            }
        },
        deleteLocation: async (parents, { campaignId, locationId }, context) => {
            if (context.user){
                const deleteLocation = await Location.findByIdAndDelete(
                    { _id: locationId }
                )
                const updatedCampaign = await User.findByIdAndUpdate(
                    { _id: campaignId },
                    { $pull: { locations: locationId } }
                )
                return {deleteLocation, updatedCampaign}
            }
        },
        createCharacter: async () => {

        },
        editCharacter: async () => {

        },
        deleteCharacter: async () => {

        }
    },

};

module.exports = resolvers;