import gql from 'graphql-tag';

const fetchUserVisit = gql`
  query GetVisit($id: ID!) {
    getVisit(id: $id) {
      id
      visitLocation
      professional {
        id
        name
      }
      visitDate
      note
      specimens {
        edges {
          date
          node {
            id
            name
          }
        }
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
        edges {
          date
          prescriptionLength
          node {
            id
            name
          }
        }
        aggregations {
          count
        }
      }
    }
  }
`;

export default fetchUserVisit;
