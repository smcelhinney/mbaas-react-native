import gql from 'graphql-tag';

const createProfile = gql`
  mutation CreateProfile($profile: CreateProfileInput!) {
    createProfile(input: $profile) {
      changedProfile {
        id
      }
    }
  }
`;

export default createProfile;
