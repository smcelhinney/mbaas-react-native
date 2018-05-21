import { graphql, compose } from 'react-apollo';
import CONSTANTS from '../constants';

import INFECTIONS_COMPOSE from './infectionsCompose';
import ORGANISMS_COMPOSE from './organismsCompose';
import ANTIBIOTICS_COMPOSE from './antibioticsCompose';
import SPECIMENS_COMPOSE from './specimensCompose';
import ALLERGY_SYMPTOM_COMPOSE from './symptomsCompose';
import VACCINATIONS_COMPOSE from './vaccinationsCompose';

export default (ModalComponent: any) =>
  compose(
    INFECTIONS_COMPOSE,
    ORGANISMS_COMPOSE,
    ANTIBIOTICS_COMPOSE,
    SPECIMENS_COMPOSE,
    ALLERGY_SYMPTOM_COMPOSE,
    VACCINATIONS_COMPOSE
  )(ModalComponent);
