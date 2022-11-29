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
      }
      token
    }
  }
`
export const CREATE_CAMPAIGN = gql`
  mutation createCampaign($name: String!, $plot: String, $userId: ID) {
    createCampaign(name: $name, plot: $plot, userId: $userId) {
      _id
      name
      plot
    }
  }
`