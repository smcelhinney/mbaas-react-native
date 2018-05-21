import gql from 'graphql-tag';

const updateVisit = gql`
  mutation UpdateVisit($visit: UpdateVisitInput!) {
    updateVisit(input: $visit) {
      changedVisit {
        id
        visitDate
        visitLocation
        note
        professional {
          name
          id
        }
      }
    }
  }
`;

export default updateVisit;
