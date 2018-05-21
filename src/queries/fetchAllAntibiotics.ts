import gql from 'graphql-tag';

const fetchAllAntibiotics = gql`
  query AllAntibiotics {
    viewer {
      allAntibiotics(first: 500) {
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

export default fetchAllAntibiotics;
