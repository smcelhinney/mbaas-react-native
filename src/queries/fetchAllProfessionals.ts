import gql from 'graphql-tag';

const fetchAllProfessionals = gql`
  query AllProfessionals {
    viewer {
      allMedicalProfessions(first: 500) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

export default fetchAllProfessionals;
