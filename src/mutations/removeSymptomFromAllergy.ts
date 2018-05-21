import gql from 'graphql-tag';

const removeSymptomFromAllergy = gql`
  mutation RemoveFromAntibioticAllergySymptomConnection(
    $allergySymptom: RemoveFromAntibioticAllergySymptomConnectionInput!
  ) {
    removeFromAntibioticAllergySymptomConnection(input: $allergySymptom) {
      changedAntibioticAllergySymptom {
        antibioticAllergy {
          profile {
            id
            antibioticAllergies {
              edges {
                node {
                  id
                  antibiotic {
                    id
                  }
                  symptoms {
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
        }
      }
    }
  }
`;

export default removeSymptomFromAllergy;
