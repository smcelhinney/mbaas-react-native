import * as React from 'react';
import { Component } from 'react';
import {
  NetInfo,
  Alert,
  Modal,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import configureApolloClient from '../network/client';

const client = configureApolloClient();

const ApolloProviderWrapper = (WrappedComponent: any) => {
  return class extends Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
        isConnected: true
      };
    }

    public componentDidMount() {
      NetInfo.isConnected.addEventListener(
        'connectionChange',
        this.handleConnectionChange
      );
    }

    public componentWillUnmount() {
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this.handleConnectionChange
      );
    }

    private handleConnectionChange = (isConnected: boolean) => {
      this.setState({
        isConnected: isConnected
      });
    };

    private renderOfflineModal() {
      return (
        <View style={{ flex: 1 }}>
          <Modal
            onRequestClose={() => {}}
            animationType="fade"
            transparent={true}
            visible={!this.state.isConnected}
          >
            <View
              style={{ marginTop: 22, padding: 10, backgroundColor: '#e26a84' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator
                  animating={true}
                  color={'white'}
                  style={{ height: 20, marginRight: 5 }}
                  size="small"
                />
                <Text style={{ color: 'white' }}>
                  Offline. Waiting for connection...
                </Text>
              </View>
            </View>
          </Modal>
          <WrappedComponent {...this.props} />
        </View>
      );
    }

    render() {
      return (
        <ApolloProvider client={client}>
          {this.renderOfflineModal()}
        </ApolloProvider>
      );
    }
  };
};

export default ApolloProviderWrapper;
