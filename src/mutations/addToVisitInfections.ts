import gql from 'graphql-tag';

const addToVisitInfections = gql`
  mutation AddToVisitInfection(
    $visitInfection: AddToVisitInfectionsConnectionInput!
  ) {
    addToVisitInfectionsConnection(input: $visitInfection) {
      changedVisitInfections {
        visit {
          id
          infections {
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
`;

export default addToVisitInfections;
