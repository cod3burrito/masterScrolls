import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      email
      username
      campaigns {
        _id
        name
        plot
      }
    }
  }
}
`;

export const ADD_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        username
        email
        _id
        campaigns {
          _id
          name
          plot
        }
      }
      token
    }
  }
`
export const CREATE_CAMPAIGN = gql`
  mutation createCampaign($name: String!, $plot: String) {
    createCampaign(name: $name, plot: $plot) {
      _id
      name
      plot
    }
  }
`
export const CREATE_LOCATION = gql`
mutation CreateLocation($campaignId: ID!, $name: String!, $details: String) {
  createLocation(campaignId: $campaignId, name: $name, details: $details) {
    _id
    details
    name
    characters {
      _id
      alive
      allies
      class
      goals
      level
      name
      notes
      personality
    }
  }
}`

export const EDIT_LOCATION = gql`
mutation EditLocation($locationId: ID!, $name: String, $details: String, $campaignId: ID!) {
  editLocation(locationId: $locationId, name: $name, details: $details, campaignId: $campaignId) {
    details
    name
    _id
  }
}
`

export const DELETE_LOCATION = gql`
mutation DeleteLocation($campaignId: ID!, $locationId: ID!) {
  deleteLocation(campaignId: $campaignId, locationId: $locationId) {
    _id
 
  }
}
`

export const EDIT_CAMPAIGN = gql`
  mutation Mutation($campaignId: ID!, $name: String, $plot: String) {
    editCampaign(campaignId: $campaignId, name: $name, plot: $plot) {
      _id
      name
      plot
    }
  }
`

export const DELETE_CAMPAIGN = gql`
  mutation deleteCampaign($campaignId: ID!) {
    deleteCampaign(campaignId: $campaignId) {
      _id
    }
  }
`
export const CREATE_CHARACTER = gql`
mutation CreateCharacter($locationId: ID!, $name: String!, $class: String, $level: String, $goals: String, $personality: String, $allies: [String], $notes: [String]) {
  createCharacter(locationId: $locationId, name: $name, class: $class, level: $level, goals: $goals, personality: $personality, allies: $allies, notes: $notes) {
    alive
    allies
    class
    goals
    level
    name
    notes
    personality
    _id
  }
}
`;
export const EDIT_CHARACTER = gql`
mutation Mutation($characterId: ID!, $name: String, $class: String, $level: String, $goals: String, $personality: String, $allies: [String], $notes: [String]) {
    editCharacter(characterId: $characterId, name: $name, class: $class, level: $level, goals: $goals, personality: $personality, allies: $allies, notes: $notes) {
      name
      alive
      allies
      class
      goals
      level
      notes
      personality
    }
  }
  `;

export const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($locationId: ID!, $characterId: ID!) {
    deleteCharacter(locationId: $locationId, characterId: $characterId) {
      name
    }
  }
  `;