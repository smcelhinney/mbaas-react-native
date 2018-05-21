import gql from 'graphql-tag';

const removeFromVisitSpecimens = gql`
  mutation RemoveFromVisitSpecimens(
    $visitSpecimen: RemoveFromVisitSpecimensConnectionInput!
  ) {
    removeFromVisitSpecimensConnection(input: $visitSpecimen) {
      changedVisitSpecimens {
        visit {
          id
          specimens {
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

export default removeFromVisitSpecimens;
