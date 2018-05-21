import gql from 'graphql-tag';

const fetchAllOrganisms = gql`
  query AllOrganisms {
    viewer {
      allOrganisms(first: 500) {
        edges {
          node {
            id
            name
            isAlert
          }
        }
      }
    }
  }
`;

export default fetchAllOrganisms;
