import * as React from 'react';
import { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colorScheme } from '../constants/styles';
import Authentication from '../auth';
import { withApollo } from 'react-apollo';

const auth = new Authentication();

class MoreScreen extends Component<any, any> {
  private logoutUser() {
    auth.logout(this.props.client);
  }

  private showTermsScreen() {
    this.props.navigator.push({
      screen: 'screens.Terms'
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.listItemContainer}>
          <TouchableOpacity
            style={styles.listItemDefault}
            onPress={() => this.showTermsScreen()}
          >
            <Text style={styles.listItemText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItemDefault}
            onPress={() => this.logoutUser()}
          >
            <Text style={styles.listItemText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withApollo(MoreScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  },
  listItemContainer: {
    marginTop: 100,
    backgroundColor: colorScheme.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colorScheme.mediumGrey
  },
  listItemText: {
    fontSize: 18,
    padding: 10,
    color: colorScheme.mediumRed
  },
  listItemDefault: {
    alignItems: 'center',
    borderColor: colorScheme.mediumGrey,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
    paddingVertical: 10
  }
});
