import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';
import USER_VISIT_QUERY from '../queries/fetchUserVisit';

import FETCH_ALL_ORGANISMS from '../queries/fetchAllOrganisms';
import ADD_TO_VISIT_ORGANISMS from '../mutations/addToVisitOrganisms';
import REMOVE_FROM_VISIT_ORGANISMS from '../mutations/removeFromVisitOrganisms';

export default compose(
  graphql(FETCH_ALL_ORGANISMS, {
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.ORGANISMS.NAME
  }),
  graphql(ADD_TO_VISIT_ORGANISMS, {
    name: 'addToVisitOrganisms',
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
    props: ({ addToVisitOrganisms }: any) => ({
      addToConnection: (refItemId: string, masterId: string) => {
        addToVisitOrganisms({
          variables: {
            visitOrganism: { visitId: masterId, organismId: refItemId }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.ORGANISMS.NAME
  }),
  graphql(REMOVE_FROM_VISIT_ORGANISMS, {
    name: 'removeFromVisitOrganisms',
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
    props: ({ removeFromVisitOrganisms }: any) => ({
      removeFromConnection: (refItemId: string, masterId: string) => {
        removeFromVisitOrganisms({
          variables: {
            visitOrganism: { visitId: masterId, organismId: refItemId }
          }
        });
      }
    }),
    skip: props => props.queryType !== CONSTANTS.REFERENCE_TYPES.ORGANISMS.NAME
  })
);
