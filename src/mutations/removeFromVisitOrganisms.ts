import gql from 'graphql-tag';

const removeFromVisitOrganisms = gql`
  mutation RemoveFromVisitOrganisms(
    $visitOrganism: RemoveFromVisitOrganismsConnectionInput!
  ) {
    removeFromVisitOrganismsConnection(input: $visitOrganism) {
      changedVisitOrganisms {
        visit {
          id
          organisms {
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

export default removeFromVisitOrganisms;
