import * as React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

class SuperSearchBar extends React.Component<any, any> {
  public render() {
    return (
      <View style={styles.searchBackground}>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Search"
          onChange={(ev: any) => this.props.onChange(ev.nativeEvent.text)}
          clearButtonMode="while-editing"
          style={styles.searchBar}
          value={this.props.filterText}
        />
      </View>
    );
  }
}

export default SuperSearchBar;

const styles = StyleSheet.create({
  searchBackground: {
    backgroundColor: '#DDDDDD'
  },
  searchBar: {
    height: 40,
    marginTop: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 10
  }
});
