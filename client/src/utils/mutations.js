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
mutation CreateLocation($name: String!, $details: String) {
  createLocation(name: $name, details: $details) {
    details
    name
    _id
  }
}`

export const EDIT_CAMPAIGN = gql`
  mutation Mutation($campaignId: ID!, $name: String, $plot: String) {
    editCampaign(campaignId: $campaignId, name: $name, plot: $plot) {
      _id
      name
      plot
    }
  }
`

export const EDIT_CHARACTER = gql`
mutation Mutation($characterId: ID!, $name: String, $class: String, $level: Int, $goals: String, $personality: String, $allies: [String], $notes: [String]) {
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