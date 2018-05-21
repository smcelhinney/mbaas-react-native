import gql from 'graphql-tag';

const removeFromVisitInfections = gql`
  mutation RemoveFromVisitInfections(
    $visitInfection: RemoveFromVisitInfectionsConnectionInput!
  ) {
    removeFromVisitInfectionsConnection(input: $visitInfection) {
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

export default removeFromVisitInfections;
