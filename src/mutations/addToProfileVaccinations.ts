import gql from 'graphql-tag';

const addToProfileVaccinations = gql`
  mutation AddToProfileVaccinations(
    $profileVaccination: AddToProfileVaccinationsConnectionInput!
  ) {
    addToProfileVaccinationsConnection(input: $profileVaccination) {
      changedProfileVaccinations {
        profile {
          id
        }
      }
    }
  }
`;

export default addToProfileVaccinations;
