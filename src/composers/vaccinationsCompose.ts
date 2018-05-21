import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';
import FETCH_USER_PROFILE from '../queries/fetchUserProfile';

import FETCH_ALL_VACCINATIONS from '../queries/fetchAllVaccinations';
import ADD_TO_PROFILE_VACCINATIONS from '../mutations/addToProfileVaccinations';
import REMOVE_FROM_PROFILE_VACCINATIONS from '../mutations/removeFromProfileVaccinations';

export default compose(
  graphql(FETCH_ALL_VACCINATIONS, {
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.VACCINATIONS.NAME
  }),
  graphql(ADD_TO_PROFILE_VACCINATIONS, {
    name: 'addToProfileVaccinations',
    options: props => ({
      refetchQueries: [
        {
          query: FETCH_USER_PROFILE
        }
      ]
    }),
    props: ({ addToProfileVaccinations }: any) => ({
      addToConnection: (refItemId: string, masterId: string) => {
        addToProfileVaccinations({
          variables: {
            profileVaccination: {
              profileId: masterId,
              vaccinationId: refItemId
            }
          }
        });
      }
    }),
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.VACCINATIONS.NAME
  }),
  graphql(REMOVE_FROM_PROFILE_VACCINATIONS, {
    name: 'removeFromProfileVaccinations',
    options: props => ({
      refetchQueries: [
        {
          query: FETCH_USER_PROFILE
        }
      ]
    }),
    props: ({ removeFromProfileVaccinations }: any) => ({
      removeFromConnection: (refItemId: string, masterId: string) => {
        removeFromProfileVaccinations({
          variables: {
            profileVaccination: {
              profileId: masterId,
              vaccinationId: refItemId
            }
          }
        });
      }
    }),
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.VACCINATIONS.NAME
  })
);
