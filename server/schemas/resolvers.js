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
            return User.findOne({ _id: args.id }).populate({ path: 'campaigns' })

        },
        //find a single campaign, irrespective of the user
        getCampaign: async (parent, {campaignId}) => {
            return await Campaign.findById(campaignId).populate({
                path: 'locations',
                populate: {
                    path: 'characters'
                }
            });
        },
    },
    Mutation: {
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username }).populate('campaigns');

            if (!user) {
                throw new AuthenticationError('You have not joined the ranks with these credentials! Please verify your identity or query the council for membership to our guild.')
            }

            const correctPw = await user.isCorrectPassword(password)
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password given')
            }
            const token = signToken(user)
            return { token, user }

        },
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password })
            const token = signToken(user)
            return { token, user }
        },
        deleteUser: async (parent, { userId }) => {
            return User.findOneAndDelete({ _id: userId });
        },
        createCampaign: async (parents, { name, plot }, context) => {
            if (context.user) {
                const defaultLocation = await Location.create(
                { name: "Unassociated", details: "This is the default location created when you create a campaign" },
                // { details: "This is the default location created when you create a campaign" }
                )
                //new version, potential option
                const newCampaign = await Campaign.create({ name, plot, locations: [defaultLocation._id] })
                //add the new campaign to the user's data
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { campaigns: newCampaign._id } },
                    { new: true }
                )

                return newCampaign
            } else {
                throw new AuthenticationError("You are not logged in");
            }
        },
        editCampaign: async (parents, { campaignId, name, plot }, context) => {
            // if (context.user) {
            const updatedCampaign = await Campaign.findByIdAndUpdate(
                { _id: campaignId },
                { $set: { name: name, plot: plot } },
                { new: true }

            )
            return updatedCampaign
            // }

        },
        deleteCampaign: async (parents, { userId, campaignId }, context) => {
            if (context.user) {
                const deletedCampaign = await Campaign.findByIdAndDelete(
                    { _id: campaignId }
                )
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { campaigns: campaignId } }
                )

                return deletedCampaign
            }

        },
        createLocation: async (parents, { campaignId, name, details }, context) => {
            if (context.user) {
                const newLocation = await Location.create({ name, details });
                const updateCampaign = await Campaign.findByIdAndUpdate(
                    { _id: campaignId },
                    { $push: { location: newLocation._id } }
                )
                return { newLocation, updateCampaign };
            }
        },
        editLocation: async (parent, { locationId, name, details }, context) => {
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
            if (context.user) {
                const deleteLocation = await Location.findByIdAndDelete(
                    { _id: locationId }
                )
                const updatedCampaign = await User.findByIdAndUpdate(
                    { _id: campaignId },
                    { $pull: { locations: locationId } }
                )
                return { deleteLocation, updatedCampaign }
            }
        },
        createCharacter: async (parent, args) => {
            const { locationId, name } = args;
            const newCharacter = {
                name: name
            }

            if (args.class) {
                newCharacter.class = args.class;
            }

            if (args.level) {
                newCharacter.level = args.level;
            }

            if (args.goals) {
                newCharacter.goals = args.goals;
            }

            if (args.personality) {
                newCharacter.personality = args.personality;
            }

            const createdCharacter = await Character.create(newCharacter);
            await Location.findByIdAndUpdate(locationId, { $push: { characters: createdCharacter._id } })

            return createdCharacter
        },
        editCharacter: async (parents, args) => {
            const updatedCharacter = await Character.findByIdAndUpdate(args.characterId, args, { new: true });
            return updatedCharacter
        },
        deleteCharacter: async (parents, { locationId, characterId }) => {
            const deletedCharacter = await Character.findByIdAndDelete({ _id: characterId });
            await Location.findByIdAndUpdate(locationId, { $pull: { characters: characterId } })

            return deletedCharacter;
        }
    },

};

module.exports = resolvers;