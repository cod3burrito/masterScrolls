import { gql } from '@apollo/client';

export const QUERY_GETUSER = gql`
    query getUser($getUserId: ID!) {
        getUser(id: $getUserId) {
            campaigns {
                _id
                name
                plot
                locations {
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
            }
        }
    }
`;

export const QUERY_GETCAMPAIGN = gql`
query GetCampaign($getCampaignId: ID!) {
    getCampaign(id: $getCampaignId) {
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
`