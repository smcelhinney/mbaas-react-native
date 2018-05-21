import * as React from 'react';
import { Component } from 'react';

import { TextInput, Text, View } from 'react-native';

export default class TextInputSuper extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  private shouldFocus() {
    this.setState({
      isFocused: true
    });
  }

  private shouldBlur() {
    this.props.onBlur();

    this.setState({
      isFocused: false
    });
  }

  public render() {
    const focusStyle = this.state.isFocused
      ? {
          backgroundColor: this.props.focusColor,
          shadowRadius: 9,
          shadowOpacity: 0.1,
          shadowColor: 'black',
          bottom: 0.5
        }
      : null;

    return (
      <TextInput
        {...this.props}
        style={[focusStyle, this.props.superInputStyles]}
        onFocus={() => this.shouldFocus()}
        onBlur={() => this.shouldBlur()}
        underlineColorAndroid="transparent"
      />
    );
  }
}
