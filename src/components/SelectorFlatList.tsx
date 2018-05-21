import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SectionList,
  ViewStyle,
  TextStyle,
  KeyboardAvoidingView
} from 'react-native';
import { CheckBox } from 'native-base';
import { sharedTypographyStyles, colorScheme } from '../constants/styles';

export default class SelectorFlatList extends Component<any, any> {
  private toggleItem(isSelected: boolean, id: string) {
    return this.props.toggleItem(isSelected, id);
  }

  private renderSectionHeader(item: any) {
    return (
      <View style={styles.stickyCategoryHeader}>
        <Text>{item.section.key}</Text>
      </View>
    );
  }

  private keyExtractor(item: any) {
    return item.node.id;
  }

  private renderSectionListItem(item: any) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          this.toggleItem(item.item.node.isSelected, item.item.node.id)
        }
        key={item.item.node.id}
        style={styles.listItem}
      >
        <Text style={styles.listItemText}>{item.item.node.name}</Text>
        <View style={styles.checkBoxWrapper}>
          <CheckBox checked={item.item.node.isSelected} />
        </View>
      </TouchableOpacity>
    );
  }

  public render() {
    const hasSections = this.props.hasSections;
    const filterText = this.props.filterText;
    const regex_string = filterText;
    const filterRegex = new RegExp(regex_string, 'i');
    const standardFilter = (item: any) => {
      return filterRegex.test(item.node.name);
    };

    const filteredData = hasSections
      ? this.props.listData.map((item: any) => {
          return {
            ...item,
            data: item.data.filter(standardFilter)
          };
        })
      : this.props.listData.filter(standardFilter);

    const noSearchStyle: any = this.props.hasSearch ? {} : { marginTop: 65 };
    return (
      <KeyboardAvoidingView
        style={[styles.modalContainer, noSearchStyle]}
        behavior={'padding'}
      >
        {this.props.hasSections ? (
          <SectionList
            keyExtractor={this.keyExtractor}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderSectionListItem.bind(this)}
            sections={filteredData}
          />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.node.id}
            renderItem={({ item }) => {
              const alertStyle: TextStyle | any = item.node.isAlert
                ? { color: '#FF5956' }
                : null;
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    this.toggleItem(item.node.isSelected, item.node.id)
                  }
                  key={item.node.id}
                  style={styles.listItem}
                >
                  <Text style={[styles.listItemText, alertStyle]}>
                    {item.node.name}
                  </Text>
                  <View style={styles.checkBoxWrapper}>
                    <CheckBox checked={item.node.isSelected} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  ...sharedTypographyStyles,
  checkBoxWrapper: {},
  modalContainer: {
    flex: 1
  },
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCCCCC',
    height: 55,
    paddingLeft: 10,
    paddingRight: 35,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listItemText: {
    paddingLeft: 15,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    color: '#333333'
  },
  stickyCategoryHeader: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    backgroundColor: colorScheme.lightGrey
  }
});
