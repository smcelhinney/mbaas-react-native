import gql from 'graphql-tag';

const fetchAllVaccinations = gql`
  query AllVaccinations {
    viewer {
      allVaccinations(first: 500) {
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

export default fetchAllVaccinations;
