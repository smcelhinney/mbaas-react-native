const CONSTANTS = {
  APP: {
    CLIENT_ID: 'QSf34ZLNnrqC-IHTzrAehuD7sS49cE6x',
    CLIENT_SECRET:
      '9AsZQTtmpvueKEal9VTHELoMT58eoDky562DwA_7DArElHzzYkv76w9EShJpeYAF'
  },
  AUTH: {
    AUTH0URL: 'https://fibronote.eu.auth0.com/oauth/ro',
    AUTH0RESETURL:
      'https://fibronote.eu.auth0.com/dbconnections/change_password',
    AUTH0REGISTER: 'https://fibronote.eu.auth0.com/dbconnections/signup',
    TOKEN_STORE_KEY: 'id_token'
  },
  REFERENCE_TYPES: {
    ORGANISMS: { NAME: 'ORGANISMS', KEY: 'allOrganisms', add: '', remove: '' },
    INFECTIONS: {
      NAME: 'INFECTIONS',
      KEY: 'allInfections',
      add: '',
      remove: ''
    },
    ANTIBIOTICS: {
      NAME: 'ANTIBIOTICS',
      KEY: 'allAntibiotics',
      add: '',
      remove: ''
    },
    SPECIMENS: { NAME: 'SPECIMENS', KEY: 'allSpecimen', add: '', remove: '' },
    ALLERGIES: { NAME: 'ALLERGIES', KEY: 'allAllergies', add: '', remove: '' },
    SYMPTOMS: { NAME: 'SYMPTOMS', KEY: 'allSymptoms', add: '', remove: '' },
    VACCINATIONS: {
      NAME: 'VACCINATIONS',
      KEY: 'allVaccinations',
      add: '',
      remove: ''
    },
    PROFESSIONALS: {
      NAME: 'PROFESSIONALS',
      KEY: 'allMedicalProfessions',
      add: '',
      remove: ''
    }
  }
};

export default CONSTANTS;
