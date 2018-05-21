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
  updateSelectionList,
  saveItemSelections,
  queryReferenceTypeKey,
  filterSingleSelectionList,
  updateSingleSelectionList
} from '../utils';
import { graphql, compose } from 'react-apollo';
import * as _ from 'lodash';
import CONSTANTS from '../constants';
import SelectorFlatList from '../components/SelectorFlatList';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchAllProfessionals from '../queries/fetchAllProfessionals';
import updateVisit from '../mutations/updateVisit';
import FETCH_ALL_ANTIBIOTICS from '../queries/fetchAllAntibiotics';
import CREATE_ANTIBIOTIC_ALLERGY from '../mutations/addAllergy';
import USER_PROFILE_QUERY from '../queries/fetchUserProfile';
import SuperSearchBar from './SuperSearchBar';

class SingleItemSelectionModal extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      allItemsWithSelected: [],
      selectedItemId: '',
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
    this.saveSingleItemSelections();
    this.props.navigator.dismissModal();
  }

  private saveSingleItemSelections() {
    this.props.updateParentType(this.props.typeId, this.state.selectedItemId);
  }

  private toggleItem(isSelected: boolean, itemId: string) {
    this.setState({
      allItemsWithSelected: updateSingleSelectionList(
        itemId,
        this.state.allItemsWithSelected
      ),
      selectedItemId: itemId
    });
  }

  private setItemsListOnState(newProps: any) {
    const key: string = queryReferenceTypeKey(this.props.queryType);

    if (!newProps.data.loading) {
      const allItems = newProps.data.viewer[key].edges;
      const listWithSelection = filterSingleSelectionList(
        this.props.selectedItem,
        allItems
      );

      this.setState({
        allItemsWithSelected: listWithSelection,
        selectedItemId: this.props.selectedItem
          ? this.props.selectedItem.id
          : null
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
          hasSeach={this.props.showSearch}
          filterText={this.state.filterText}
          listData={this.state.allItemsWithSelected}
          toggleItem={this.toggleItem}
        />
      </View>
    );
  }
}

export default compose(
  graphql(fetchAllProfessionals, {
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.PROFESSIONALS.NAME
  }),
  graphql(FETCH_ALL_ANTIBIOTICS, {
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME
  }),
  graphql(CREATE_ANTIBIOTIC_ALLERGY, {
    name: 'createAntibioticAllergy',
    options: props => ({
      refetchQueries: [
        {
          query: USER_PROFILE_QUERY
        }
      ]
    }),
    props: ({ createAntibioticAllergy }: any) => ({
      updateParentType: (parentId: string, refId: string) => {
        createAntibioticAllergy({
          variables: { allergy: { profileId: parentId, antibioticId: refId } }
        });
      }
    }),
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME
  }),
  graphql(updateVisit, {
    name: 'updateVisit',
    props: ({ updateVisit }: any) => ({
      updateParentType: (parentId: string, refId: string) => {
        updateVisit({
          variables: { visit: { id: parentId, professionalId: refId } }
        });
      }
    }),
    skip: props =>
      props.queryType !== CONSTANTS.REFERENCE_TYPES.PROFESSIONALS.NAME
  })
)(SingleItemSelectionModal);
