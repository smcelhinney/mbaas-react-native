import gql from 'graphql-tag';

const deleteAllergy = gql`
  mutation DeleteAllergy($allergy: DeleteAntibioticAllergyInput!) {
    deleteAntibioticAllergy(input: $allergy) {
      changedAntibioticAllergy {
        id
      }
    }
  }
`;

export default deleteAllergy;
