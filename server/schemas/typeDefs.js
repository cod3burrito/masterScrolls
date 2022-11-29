const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        campaigns: [Campaign]
    }

    type Campaign {
        _id: ID
        name: String
        plot: String
        locations: [Location]
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

    type Auth {
        token: ID!
        user: User
      }
      
    type Query{
        getUser(id:ID!): User
        getCampaign(campaignId:ID!): Campaign
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        deleteUser(userId: ID!): User
        createCampaign(userId: ID, name: String!, plot: String): Campaign
        editCampaign(campaignId: ID!, name: String, plot: String): Campaign
        deleteCampaign(userId:ID!,campaignId: ID!): Campaign
        createLocation(campaignId: ID!, name: String!, details: String): Location
        editLocation(campaignId: ID!, locationId: ID!, name: String, details: String): Location
        deleteLocation(campaignId: ID!, locationId: ID!): Location
        createCharacter(locationId: ID!, name: String!, class: String, level: Int, goals: String, personality: String): Character
        editCharacter(characterId: ID!, name: String, class: String, level: Int, goals: String, personality: String, allies: [String], notes: [String]): Character
        deleteCharacter(locationId: ID!, characterId: ID!): Character
        login(username: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;