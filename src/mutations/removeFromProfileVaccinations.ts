import gql from 'graphql-tag';

const removeFromProfileVaccinations = gql`
  mutation RemoveFromProfileVaccinations(
    $profileVaccination: RemoveFromProfileVaccinationsConnectionInput!
  ) {
    removeFromProfileVaccinationsConnection(input: $profileVaccination) {
      changedProfileVaccinations {
        profile {
          id
        }
      }
    }
  }
`;

export default removeFromProfileVaccinations;
