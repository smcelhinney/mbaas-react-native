import gql from 'graphql-tag';

const fetchAllSymptoms = gql`
  query allSymptoms {
    viewer {
      allSymptoms(first: 500) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export default fetchAllSymptoms;
