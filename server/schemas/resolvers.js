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
        login: async () => {

        },
        logout: async () => {

        },
        createUser: async () => {

        },
        deleteUser: async () => {

        },
        createCampaign: async () => {

        },
        editCampaign: async () => {

        },
        deleteCampaign: async () => {

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