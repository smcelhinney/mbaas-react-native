import gql from 'graphql-tag';

const fetchUserProfile = gql`
  query GetUserProfile {
    viewer {
      user {
        id
        profile {
          id
          location
          profileComplete
          dateOfBirth
          weight
          firstname
          lastname
          height
          sex
          note
          medicalConditionTitle
          medicalConditionDescription
          antibioticAllergies {
            edges {
              node {
                id
                antibiotic {
                  id
                  name
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
          vaccinations {
            edges {
              date
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
`;

export default fetchUserProfile;
