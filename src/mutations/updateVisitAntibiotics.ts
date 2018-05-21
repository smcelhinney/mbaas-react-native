import gql from 'graphql-tag';

const UpdateVisitAntibiotics = gql`
  mutation updateVisitAntibiotics(
    $visitAntibiotics: UpdateVisitAntibioticsConnectionInput!
  ) {
    updateVisitAntibioticsConnection(input: $visitAntibiotics) {
      changedVisitAntibiotics {
        visit {
          id
          visitDate
          antibiotics {
            edges {
              date
              prescriptionLength
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

export default UpdateVisitAntibiotics;
