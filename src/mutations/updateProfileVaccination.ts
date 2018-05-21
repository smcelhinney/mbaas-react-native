import gql from 'graphql-tag';

const updateProfileVaccination = gql`
  mutation UpdateProfileVaccination(
    $profileVaccination: UpdateProfileVaccinationsConnectionInput!
  ) {
    updateProfileVaccinationsConnection(input: $profileVaccination) {
      changedProfileVaccinations {
        date
      }
    }
  }
`;

export default updateProfileVaccination;
