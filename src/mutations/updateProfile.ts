import gql from 'graphql-tag';

const updateVisit = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(input: $profile) {
      changedProfile {
        id
        firstname
        lastname
        location
        dateOfBirth
        weight
        height
        sex
        medicalConditionTitle
        medicalConditionDescription
      }
    }
  }
`;

export default updateVisit;
