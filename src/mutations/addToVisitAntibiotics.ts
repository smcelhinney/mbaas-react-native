import gql from 'graphql-tag';

const addToVisitAntibiotics = gql`
  mutation AddToVisitAntibiotics(
    $visitAntibiotic: AddToVisitAntibioticsConnectionInput!
  ) {
    addToVisitAntibioticsConnection(input: $visitAntibiotic) {
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

export default addToVisitAntibiotics;
