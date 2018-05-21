import gql from 'graphql-tag';

const fetchAllUserVisits = gql`
  query GetVisits {
    viewer {
      user {
        id
        visits {
          aggregations {
            count
          }
          edges {
            node {
              id
              visitLocation
              visitDate
              modifiedAt
              notes {
                aggregations {
                  count
                }
              }
              specimens {
                aggregations {
                  count
                }
              }
              organisms {
                edges {
                  node {
                    id
                    name
                    isAlert
                  }
                }
                aggregations {
                  count
                }
              }
              infections {
                aggregations {
                  count
                }
                edges {
                  node {
                    id
                    name
                  }
                }
                aggregations {
                  count
                }
              }
              antibiotics {
                aggregations {
                  count
                }
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default fetchAllUserVisits;
