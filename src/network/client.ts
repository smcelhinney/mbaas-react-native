import Config from 'react-native-config';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import * as React from 'react';
import { Component } from 'react';
import DeviceStorage from '../utils/storage';
import Auth from '../auth';

const auth = new Auth();
console.log(`Config: ${JSON.stringify(Config)}`);

function configureApolloClient() {
  const networkInterface = createNetworkInterface({
    uri: 'GRAPHQL_ENDPOINT'
  });

  networkInterface.use([
    {
      applyMiddleware(req: any, next: any) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        DeviceStorage.get('id_token')
          .then(token => {
            if (token) {
              req.options.headers.authorization = `Bearer ${token}`;
            } else {
            }
          })
          .then(next);
      }
    }
  ]);

  networkInterface.useAfter([
    {
      applyAfterware({ response }, next) {
        if (response.status === 401) {
          auth.logout();
        } else {
          next();
        }
      }
    }
  ]);

  return new ApolloClient({
    networkInterface,
    dataIdFromObject: (object: any) => object.id
  });
}

export default configureApolloClient;
