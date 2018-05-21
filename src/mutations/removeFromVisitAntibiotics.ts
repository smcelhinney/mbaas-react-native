import gql from 'graphql-tag';

const removeFromVisitAntibiotics = gql`
  mutation RemoveFromVisitAntibiotics(
    $visitAntibiotic: RemoveFromVisitAntibioticsConnectionInput!
  ) {
    removeFromVisitAntibioticsConnection(input: $visitAntibiotic) {
      changedVisitAntibiotics {
        visit {
          id
          antibiotics {
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

export default removeFromVisitAntibiotics;
