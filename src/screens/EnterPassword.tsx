import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

export default class EnterPassword extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      emailAdress: ''
    };
  }

  public componentDidMount() {
    this.setState({
      emailAdress: this.props.emailAdress
    });
  }

  private enterPassword(ev: any) {
    this.setState({
      password: ev.target.value
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.inputsContainer}
          behavior={'position'}
        >
          <TextInput
            underlineColorAndroid="transparent"
            autoFocus={true}
            placeholder="Password"
            style={styles.inputs}
            secureTextEntry={true}
            onChange={ev => this.enterPassword(ev)}
            value={this.state.password}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#3C95C0'
  },
  inputsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 100
  },
  brandingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionText: {
    fontSize: 12,
    color: '#FFFFFF'
  },
  inputs: {
    fontSize: 30,
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
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#FFFFFF',
    height: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#3C95C0',
    fontSize: 18
  }
});
