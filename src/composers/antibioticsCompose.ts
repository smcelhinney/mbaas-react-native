import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';
import USER_VISIT_QUERY from '../queries/fetchUserVisit';

import FETCH_ALL_ANTIBIOTICS from '../queries/fetchAllAntibiotics';
import ADD_TO_VISIT_ANTIBIOTICS from '../mutations/addToVisitAntibiotics';
import REMOVE_FROM_VISIT_ANTIBIOTICS from '../mutations/removeFromVisitAntibiotics';

export default compose(
  graphql(FETCH_ALL_ANTIBIOTICS, {
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME
  }),
  graphql(ADD_TO_VISIT_ANTIBIOTICS, {
    name: 'addToVisitAntibiotics',
    options: (props: any) => ({
      refetchQueries: [
        {
          query: USER_VISIT_QUERY,
          variables: {
            id: props.typeId
          }
        }
      ]
    }),
    props: ({ addToVisitAntibiotics }: any) => ({
      addToConnection: (refItemId: string, masterId: string) => {
        addToVisitAntibiotics({
          variables: {
            visitAntibiotic: { visitId: masterId, antibioticId: refItemId }
          }
        });
      }
    }),
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME
  }),
  graphql(REMOVE_FROM_VISIT_ANTIBIOTICS, {
    name: 'removeFromVisitAntibiotics',
    options: (props: any) => ({
      refetchQueries: [
        {
          query: USER_VISIT_QUERY,
          variables: {
            id: props.typeId
          }
        }
      ]
    }),
    props: ({ removeFromVisitAntibiotics }: any) => ({
      removeFromConnection: (refItemId: string, masterId: string) => {
        removeFromVisitAntibiotics({
          variables: {
            visitAntibiotic: { visitId: masterId, antibioticId: refItemId }
          }
        });
      }
    }),
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME
  })
);
