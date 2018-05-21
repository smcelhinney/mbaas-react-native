import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';
import USER_PROFILE_QUERY from '../queries/fetchUserProfile';

import FETCH_ALL_SYMPTOMS from '../queries/fetchAllSymptoms';
import ADD_SYMPTOM_TO_ALLERGY from '../mutations/addSymptomToAllergy';
import REMOVE_SYMPTOM_FROM_ALLERGY from '../mutations/removeSymptomFromAllergy';

export default compose(
  graphql(FETCH_ALL_SYMPTOMS, {
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.SYMPTOMS.NAME
  }),
  graphql(ADD_SYMPTOM_TO_ALLERGY, {
    name: 'addToAntibioticAllergySymptomConnection',
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY
        }
      ]
    }),
    props: ({ addToAntibioticAllergySymptomConnection }: any) => ({
      addToConnection: (refItemId: string, masterId: string) => {
        addToAntibioticAllergySymptomConnection({
          variables: {
            allergySymptom: {
              antibioticAllergyId: masterId,
              symptomId: refItemId
            }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.SYMPTOMS.NAME
  }),
  graphql(REMOVE_SYMPTOM_FROM_ALLERGY, {
    name: 'removeFromAntibioticAllergySymptomConnection',
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY
        }
      ]
    }),
    props: ({ removeFromAntibioticAllergySymptomConnection }: any) => ({
      removeFromConnection: (refItemId: string, masterId: string) => {
        removeFromAntibioticAllergySymptomConnection({
          variables: {
            allergySymptom: {
              antibioticAllergyId: masterId,
              symptomId: refItemId
            }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.SYMPTOMS.NAME
  })
);
