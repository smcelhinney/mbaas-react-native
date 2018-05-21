import gql from 'graphql-tag';

const updateVisitSpecimen = gql`
  mutation updateVisitSpecimen(
    $visitSpecimen: UpdateVisitSpecimensConnectionInput!
  ) {
    updateVisitSpecimensConnection(input: $visitSpecimen) {
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

export default updateVisitSpecimen;
