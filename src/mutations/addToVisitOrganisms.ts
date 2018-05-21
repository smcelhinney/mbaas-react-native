import gql from 'graphql-tag';

const addToVisitOrganisms = gql`
  mutation AddToVisitOrganisms(
    $visitOrganism: AddToVisitOrganismsConnectionInput!
  ) {
    addToVisitOrganismsConnection(input: $visitOrganism) {
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

export default addToVisitOrganisms;
