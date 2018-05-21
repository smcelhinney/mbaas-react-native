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

class ResetPasswordScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      showErrorMessage: false,
      showSuccessMessage: false,
      emailAddress: ''
    };
  }

  private enterEmail(ev: any) {
    this.setState({
      ...this.state,
      emailAddress: ev.nativeEvent.text
    });
  }

  private resetPassword() {
    this.setState({
      ...this.state,
      loading: true,
      showErrorMessage: false,
      showSuccessMessage: false
    });

    auth
      .auth0ResetPassword(this.state.emailAddress)
      .then(message => {
        this.setState({
          ...this.state,
          loading: false,
          showErrorMessage: false,
          showSuccessMessage: true
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          loading: false,
          showSuccessMessage: false,
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
    return !this.state.loading &&
      !this.state.showErrorMessage &&
      !this.state.showSuccessMessage ? (
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
          onSubmitEditing={() => this.resetPassword()}
        />
        <Text style={styles.instructionText}>
          Enter your email address to reset your password
        </Text>
      </KeyboardAvoidingView>
    ) : null;
  }

  private renderSuccessErrorMessages() {
    return this.state.showErrorMessage ? (
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>
          There appears to be a problem resetting your password. Are you sure
          you have the correct email?
        </Text>
      </View>
    ) : this.state.showSuccessMessage ? (
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>
          An email has been sent to you to reset your password. Once you have
          reset your password open MyBugs again and login with your new
          password.
        </Text>
      </View>
    ) : null;
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.brandingContainer}>{this.renderLoader()}</View>
        {this.renderInputs()}
        {this.renderSuccessErrorMessages()}
      </View>
    );
  }
}

export default ResetPasswordScreen;

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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFF',
    fontSize: 16
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 30
  },
  instructionText: {
    fontSize: 12,
    color: '#FFFFFF'
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
