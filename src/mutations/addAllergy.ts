import gql from 'graphql-tag';

const addAllergy = gql`
  mutation CreateAllergy($allergy: CreateAntibioticAllergyInput!) {
    createAntibioticAllergy(input: $allergy) {
      changedAntibioticAllergy {
        id
      }
    }
  }
`;

export default addAllergy;
