import gql from 'graphql-tag';

const removeVisit = gql`
  mutation RemoveVisit($visit: DeleteVisitInput!) {
    deleteVisit(input: $visit) {
      changedVisit {
        id
      }
    }
  }
`;

export default removeVisit;
