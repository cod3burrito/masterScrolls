const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        campaigns: [ID]
    }

    type Campaign {
        _id: ID
        name: String
        plot: String
        locations: [ID]
    }

    type Location {
        _id: ID
        name: String
        details: String
        characters: [Character]
    }

    type Character {
        _id: ID
        name: String
        class: String
        alive: Boolean
        level: Int
        goals: String
        personality: String
        allies: [String]
        notes: [String]
    }

    type Query{
        
        getUser(id: ID!): User
        getCampaign: [Campaign]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        deleteUser(userId: ID!): User
        createCampaign(userId:ID!,name: String!, plot: String): Campaign
        editCampaign(campaignId: ID!, name: String, plot: String): Campaign
        deleteCampaign(campaignId: ID!): Campaign
        createLocation(campaignId: ID!, name: String!, details: String): Location
        editLocation(campaignId: ID!, locationId: ID!, name: String, details: String): Location
        deleteLocation(campaignId: ID!, locationId: ID!): Location
        createCharacter(campaignId: ID!, locationId: ID!, name: String!, class: String, level: Int, goals: String, personality: String): Character
        editCharacter(campaignId: ID!, locationId: ID!, characterId: ID!, name: String, class: String, level: Int, goals: String, personality: String, allies: [String], notes: [String]): Character
        deleteCharacter(campaignId: ID!, locationId: ID!, characterId: ID!): Character
        login(username: String!, password: String!): User
    }
`;

module.exports = typeDefs;