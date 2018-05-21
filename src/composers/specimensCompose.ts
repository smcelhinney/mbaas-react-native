import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';
import USER_VISIT_QUERY from '../queries/fetchUserVisit';

import FETCH_ALL_SPECIMENS from '../queries/fetchAllSpecimens';
import ADD_TO_VISIT_SPECIMENS from '../mutations/addToVisitSpecimens';
import REMOVE_FROM_VISIT_SPECIMENS from '../mutations/removeFromVisitSpecimens';

export default compose(
  graphql(FETCH_ALL_SPECIMENS, {
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.SPECIMENS.NAME
  }),
  graphql(ADD_TO_VISIT_SPECIMENS, {
    name: 'addToVisitSpecimens',
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
    props: ({ addToVisitSpecimens }: any) => ({
      addToConnection: (refItemId: string, masterId: string) => {
        addToVisitSpecimens({
          variables: {
            visitSpecimen: { visitId: masterId, specimenId: refItemId }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.SPECIMENS.NAME
  }),
  graphql(REMOVE_FROM_VISIT_SPECIMENS, {
    name: 'removeFromVisitSpecimens',
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
    props: ({ removeFromVisitSpecimens }: any) => ({
      removeFromConnection: (refItemId: string, masterId: string) => {
        removeFromVisitSpecimens({
          variables: {
            visitSpecimen: { visitId: masterId, specimenId: refItemId }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.SPECIMENS.NAME
  })
);
