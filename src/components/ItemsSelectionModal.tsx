import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  StatusBar
} from 'react-native';
import {
  getUpdateLists,
  filterSelectionList,
  updateSectionSelectionList,
  filterSectionSelectionList,
  updateSelectionList,
  saveItemSelections,
  queryReferenceTypeKey
} from '../utils';
import * as _ from 'lodash';
import CONSTANTS from '../constants';
import SelectorFlatList from '../components/SelectorFlatList';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemSelectionModalComposer from '../composers/itemSelectionModal';
import SuperSearchBar from './SuperSearchBar';

class ItemsSelectionModal extends Component<any, any> {
  private searchBar: any;

  constructor(props: any) {
    super(props);

    this.state = {
      allItemsWithSelected: [],
      filterText: ''
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.toggleItem = this.toggleItem.bind(this);
  }

  private onNavigatorEvent(event: any) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'save') {
        this.saveItemsUpdatesAndClose();
      }
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal();
      }
    }
  }

  private saveItemsUpdatesAndClose() {
    this.saveItemSelections();
    StatusBar.setBarStyle('default');
    this.props.navigator.dismissModal();
  }

  private saveItemSelections() {
    const hasSections =
      this.props.queryType === CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME;
    saveItemSelections(
      hasSections,
      this.props.typeId,
      this.props.selectedItems,
      this.state.allItemsWithSelected,
      this.props.removeFromConnection,
      this.props.addToConnection
    );
  }

  private toggleItem(isSelected: boolean, itemId: string) {
    const hasSections =
      this.props.queryType === CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME;
    const updatedWithSelectionList = hasSections
      ? updateSectionSelectionList(
          isSelected,
          itemId,
          this.state.allItemsWithSelected
        )
      : updateSelectionList(
          isSelected,
          itemId,
          this.state.allItemsWithSelected
        );

    this.setState({
      allItemsWithSelected: updatedWithSelectionList
    });
  }

  private setItemsListOnState(newProps: any) {
    const hasSections =
      this.props.queryType === CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME;
    const key: string = queryReferenceTypeKey(this.props.queryType);

    if (!newProps.data.loading) {
      const allItems = newProps.data.viewer[key].edges;
      const listWithSelections = hasSections
        ? filterSectionSelectionList(this.props.selectedItems, allItems)
        : filterSelectionList(this.props.selectedItems, allItems);

      this.setState({
        allItemsWithSelected: listWithSelections
      });
    }
  }

  public componentWillReceiveProps(newProps: any) {
    return this.setItemsListOnState(newProps);
  }

  public componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'save',
          title: 'Save'
        }
      ],
      leftButtons: [
        {
          id: 'cancel',
          title: 'Cancel'
        }
      ]
    });
  }

  private onChange(text: string) {
    this.setState({
      filterText: text
    });
  }

  public render() {
    if (this.props.data.loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar animated={true} barStyle="light-content" />
        {this.props.showSearch ? (
          <SuperSearchBar
            filterText={this.state.filterText}
            onChange={this.onChange.bind(this)}
          />
        ) : null}
        <SelectorFlatList
          hasSections={
            this.props.queryType === CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME
          }
          hasSearch={this.props.showSearch}
          filterText={this.state.filterText}
          listData={this.state.allItemsWithSelected}
          toggleItem={this.toggleItem}
        />
      </View>
    );
  }
}

export default ItemSelectionModalComposer(ItemsSelectionModal);
