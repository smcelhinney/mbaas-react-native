import gql from 'graphql-tag';

const createVisit = gql`
  mutation CreateVisit($visit: CreateVisitInput!) {
    createVisit(input: $visit) {
      changedVisit {
        id
        visitDate
        visitLocation
      }
    }
  }
`;

export default createVisit;
