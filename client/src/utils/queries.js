import { gql } from '@apollo/client';

export const QUERY_GETUSER = gql`
  query getUser($getUserId: ID!) {
    getUser(id: $getUserId) {
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
`;

export const QUERY_GETCAMPAIGN = gql`
query getCampaign($campaignId: ID!) {
    getCampaign(campaignId: $campaignId) {
      _id
      name
      plot
      locations {
        name
        details
        _id
        characters {
          name
          _id
          alive
          allies
          class
          goals
          level
          notes
          personality
        }
      }
    }
  }
`;