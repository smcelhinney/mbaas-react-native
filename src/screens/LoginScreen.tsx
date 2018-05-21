import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  NetInfo,
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import DeviceStorage from '../utils/storage';
import { gql, graphql, withApollo, compose } from 'react-apollo';
import Authentication from '../auth';
import CREATE_PROFILE from '../mutations/createProfile';

const auth = new Authentication();

class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      showErrorMessage: false,
      emailAddress: '',
      password: ''
    };
  }

  private enterEmail(ev: any) {
    this.setState({
      ...this.state,
      emailAddress: ev.nativeEvent.text
    });
  }

  private enterPassword(ev: any) {
    this.setState({
      ...this.state,
      password: ev.nativeEvent.text
    });
  }

  private navigateToPasswordScreen() {
    this.props.navigator.push({
      screen: 'screens.ResetPasswordScreen'
    });
  }

  private navigateToRegisterScreen() {
    this.props.navigator.push({
      screen: 'screens.RegisterScreen'
    });
  }

  private loginWithUsernameAndPassword() {
    this.setState({
      ...this.state,
      loading: true
    });

    auth
      .auth0Login(this.state.emailAddress, this.state.password)
      .then(token => {
        this.props
          .mutate({ variables: { token: { idToken: token } } })
          .then((data: any) => {
            if (data.data.loginUserWithAuth0.user.profile) {
              return this.props.client.resetStore();
            } else {
              return this.props.createUserProfile({
                variables: {
                  profile: {
                    userId: data.data.loginUserWithAuth0.user.id,
                    firstname: null,
                    lastname: null,
                    location: null,
                    dateOfBirth: null,
                    weight: null,
                    height: null,
                    sex: null,
                    medicalConditionTitle: null,
                    medicalConditionDescription: null
                  }
                }
              });
            }
          })
          .then(() => {
            auth.userAuthenticated();
          });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          loading: false,
          showErrorMessage: true
        });
      });
  }

  private renderLoader() {
    return this.state.loading ? (
      <View style={[styles.centering]}>
        <ActivityIndicator
          animating={true}
          color={'white'}
          style={{ height: 80 }}
          size="large"
        />
      </View>
    ) : null;
  }

  private renderInputs() {
    return !this.state.loading ? (
      <KeyboardAvoidingView style={styles.inputsContainer} behavior={'padding'}>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Email Address"
          style={styles.inputs}
          value={this.state.emailAddress}
          onChange={ev => this.enterEmail(ev)}
          clearButtonMode={'while-editing'}
          keyboardType={'email-address'}
        />
        <TextInput
          underlineColorAndroid="transparent"
          secureTextEntry
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Password"
          style={styles.inputs}
          value={this.state.password}
          onChange={ev => this.enterPassword(ev)}
          returnKeyType={'go'}
          clearButtonMode={'while-editing'}
          onSubmitEditing={() => this.loginWithUsernameAndPassword()}
        />
        <Text style={styles.instructionText}>
          Enter your email address and password to login.
        </Text>
        <View style={styles.accountLinks}>
          <Text
            style={styles.resetPassWordText}
            onPress={() => this.navigateToPasswordScreen()}
          >
            Reset Password
          </Text>
          <Text
            style={styles.resetPassWordText}
            onPress={() => this.navigateToRegisterScreen()}
          >
            Register for My Bugs
          </Text>
        </View>
      </KeyboardAvoidingView>
    ) : null;
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.brandingContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 200 }}
            resizeMode="contain"
          />
          {this.renderLoader()}
        </View>

        {this.renderInputs()}
      </View>
    );
  }
}

const LOGIN_USER = gql`
  mutation Login($token: LoginUserWithAuth0Input!) {
    loginUserWithAuth0(input: $token) {
      user {
        id
        username
        profile {
          id
        }
      }
    }
  }
`;

const loginScreenWithApollo = withApollo(LoginScreen);

export default graphql(LOGIN_USER)(
  compose(
    graphql(CREATE_PROFILE, {
      name: 'createUserProfile'
    })
  )(loginScreenWithApollo)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C95C0'
  },
  accountLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputsContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    paddingHorizontal: 20
  },
  brandingContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 30
  },
  instructionText: {
    fontSize: 12,
    color: '#FFFFFF'
  },
  resetPassWordText: {
    fontSize: 14,
    color: '#FFFFFF',
    paddingBottom: 5,
    textDecorationLine: 'underline',
    lineHeight: 100,
    textAlign: 'center'
  },
  inputs: {
    fontSize: 25,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    height: 50,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 0,
    marginBottom: 10,
    color: '#FFFFFF'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonSolid: {
    backgroundColor: '#FFFFFF'
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  button: {
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    width: '48%'
  },
  buttonText: {
    color: '#3C95C0',
    fontSize: 18
  },
  buttonTextWhite: {
    color: '#FFFFFF',
    fontSize: 18
  }
});
