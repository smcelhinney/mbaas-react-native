import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import DeviceStorage from '../utils/storage';
import { gql, graphql, withApollo } from 'react-apollo';
import Authentication from '../auth';

const auth = new Authentication();

class RegisterScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      showErrorMessage: false,
      showSuccessMessage: false,
      emailAddress: '',
      password: '',
      termsAgreed: false
    };
  }

  private openTermsModal() {
    this.props.navigator.showModal({
      screen: 'screens.Terms',
      title: 'Terms And Conditions',
      navigatorButtons: {
        rightButtons: [
          {
            id: 'closeModal',
            title: 'Done'
          }
        ]
      }
    });
  }

  private agreeWithTerms() {
    this.setState({
      ...this.state,
      termsAgreed: !this.state.termsAgreed
    });
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

  private registerWithUsernameAndPassword() {
    this.setState({
      ...this.state,
      loading: true
    });

    auth
      .auth0Register(this.state.emailAddress, this.state.password)
      .then(user => {
        console.log(user);
        this.setState({
          ...this.state,
          loading: false,
          showSuccessMessage: true
        });
      })
      .catch(err => {
        console.log(err);
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
          onSubmitEditing={() => this.registerWithUsernameAndPassword()}
        />
        <Text style={styles.instructionText}>
          Enter your email address and a password to register. By registering
          for MyBugs you are agreeing to the terms and conditions.
        </Text>
        <Text
          style={styles.instructionText}
          onPress={() => this.openTermsModal()}
        >
          Tap here to view the Terms and Conditions.
        </Text>
      </KeyboardAvoidingView>
    ) : null;
  }

  private renderSuccessMessage() {
    console.log('success');
    return (
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Thanks!, You can now login to MyBugs.</Text>
      </View>
    );
  }
  private renderErrorMessage() {
    console.log('fail');
    return (
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>
          There seems to be a problem with registration. Perhaps you have
          already signed up with that email address?
        </Text>
      </View>
    );
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.brandingContainer}>{this.renderLoader()}</View>

        {this.state.showSuccessMessage
          ? this.renderSuccessMessage()
          : this.state.showErrorMessage
            ? this.renderErrorMessage()
            : this.renderInputs()}
      </View>
    );
  }
}

const LoginMutation = gql`
  mutation Login($token: LoginUserWithAuth0Input!) {
    loginUserWithAuth0(input: $token) {
      user {
        id
        username
      }
    }
  }
`;

export default withApollo(graphql(LoginMutation)(RegisterScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C95C0'
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 30
  },
  text: {
    color: '#FFF',
    fontSize: 16
  },
  instructionText: {
    fontSize: 12,
    color: '#FFFFFF',
    paddingBottom: 5
  },
  instructionTextHighlight: {
    fontSize: 12,
    color: '#FFFFFF',
    paddingBottom: 5,
    fontWeight: 'bold'
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
