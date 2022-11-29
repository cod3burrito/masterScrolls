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
