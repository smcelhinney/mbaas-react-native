import gql from 'graphql-tag';

const fetchAllSpecimens = gql`
  query AllSpecimen {
    viewer {
      allSpecimen(first: 500) {
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

export default fetchAllSpecimens;
