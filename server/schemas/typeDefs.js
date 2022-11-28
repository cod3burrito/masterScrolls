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

    type Query{
        getUser: User
        getCampaign: [Campaign]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        deleteUser(_id: ID!): User
        createCampaign(name: String!, plot: String): Campaign
        editCampaign(_id: ID!, name: String, plot: String): Campaign
        deleteCampaign(_id: ID!): Campaign
        createLocation(name: String!, details: String): Location
        editLocation(_id: ID!, name: String, details: String): Location
        deleteLocation(_id: ID!): Location
        createCharacter(name: String!, class: String, level: Int, goals: String, personality: String): Character
        editCharacter(_id: ID!, name: String, class: String, level: Int, goals: String, personality: String, allies: [String], notes: [String]): Character
        deleteCharacter(_id: ID!): Character
        login(username: String!, password: String!): User
    }
`;

module.exports = typeDefs;