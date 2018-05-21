import gql from 'graphql-tag';

const addSymptomToAllergy = gql`
  mutation AddToAntibioticAllergySymptomConnection(
    $allergySymptom: AddToAntibioticAllergySymptomConnectionInput!
  ) {
    addToAntibioticAllergySymptomConnection(input: $allergySymptom) {
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

export default addSymptomToAllergy;
