const { User, Campaign } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        //this is retrieving the logged in users info
        getUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('campaign').populate('location').populate('characters')
            }
            throw new AuthenticationError('you must be logged in!')
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
        createUser: async (parent, { user }) => {
            const user = await User.create{( username, email, password, )},
            const token = signToken(user),
            return User.create({ token, user }), 
        },
        deleteUser: async (parent, { user }) => {
            return User.findOneAndDelete({ user: userName }); 
        }, 
        createCampaign: async (parents, { name, plot }, context) => {
            if (context.user) {
                const newCampaign = await Campaign.create({ name, plot })
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { campaigns: newCampaign._id } }
                )
                return { newCampaign, updatedUser }
            }
        },
        editCampaign: async (parents, { campaignId, name, plot }, context) => {
            if (context.user) {
                const updatedCampaign = await Campaign.findByIdAndUpdate(
                    { _id: campaignId },
                    { $set: { name: name, plot: plot } }
                )
                return updatedCampaign
            }

        },
        deleteCampaign: async (parents, { campaignId }, context) => {
            if (context.user) {
                const deletedCampaign = await Campaign.findByIdAndDelete(
                    { _id: campaignId }
                )
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { campaigns: campaignId } }
                )
                return { deletedCampaign, updatedUser }
            }

        },
        createLocation: async () => {

        },
        editLocation: async () => {

        },
        deleteLocation: async () => {

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