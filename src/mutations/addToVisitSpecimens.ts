import gql from 'graphql-tag';

const addToVisitSpecimens = gql`
  mutation AddToVisitSpecimens(
    $visitSpecimen: AddToVisitSpecimensConnectionInput!
  ) {
    addToVisitSpecimensConnection(input: $visitSpecimen) {
      changedVisitSpecimens {
        visit {
          id
          visitDate
          specimens {
            edges {
              date
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

export default addToVisitSpecimens;
