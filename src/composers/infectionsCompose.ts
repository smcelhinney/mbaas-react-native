import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';
import USER_VISIT_QUERY from '../queries/fetchUserVisit';

import FETCH_ALL_INFECTIONS from '../queries/fetchAllInfections';
import ADD_TO_VISIT_INFECTIONS from '../mutations/addToVisitInfections';
import REMOVE_FROM_VISIT_INFECTIONS from '../mutations/removeFromVisitInfections';

export default compose(
  graphql(FETCH_ALL_INFECTIONS, {
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME
  }),
  graphql(ADD_TO_VISIT_INFECTIONS, {
    name: 'addToVisitInfections',
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
    props: ({ addToVisitInfections }: any) => ({
      addToConnection: (refItemId: string, masterId: string) => {
        addToVisitInfections({
          variables: {
            visitInfection: { visitId: masterId, infectionId: refItemId }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME
  }),
  graphql(REMOVE_FROM_VISIT_INFECTIONS, {
    name: 'removeFromVisitInfections',
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
    props: ({ removeFromVisitInfections }: any) => ({
      removeFromConnection: (refItemId: string, masterId: string) => {
        removeFromVisitInfections({
          variables: {
            visitInfection: { visitId: masterId, infectionId: refItemId }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME
  })
);
