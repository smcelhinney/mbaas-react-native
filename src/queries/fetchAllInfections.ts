import gql from 'graphql-tag';

const fetchAllInfections = gql`
  query AllInfections {
    viewer {
      allInfections(first: 500) {
        edges {
          node {
            id
            name
            category
          }
        }
      }
    }
  }
`;

export default fetchAllInfections;
