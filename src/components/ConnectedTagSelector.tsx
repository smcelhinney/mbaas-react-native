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
  Modal,
  FlatList,
  LayoutAnimation,
  Image,
  ViewStyle,
  TextStyle
} from 'react-native';
import { sharedTypographyStyles, colorScheme } from '../constants/styles';
import { format } from 'date-fns';
import { CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';

class ConnectedTagSelector extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      mainItem: props.mainItem,
      tags: props.relatedItems
    };
  }

  componentWillReceiveProps(nextProps: any) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      mainItem: nextProps.mainItem,
      tags: nextProps.relatedItems
    });
  }

  private renderTags(tags: any) {
    if (tags.length === 0) {
      return (
        <TouchableOpacity
          onPress={() => this.props.openSelectorModal()}
          style={styles.tag}
        >
          <Text style={styles.tagText}>
            + Add {this.props.name.toLowerCase()}
          </Text>
        </TouchableOpacity>
      );
    }

    return this.state.tags.map(
      (edge: { node: { id: string; name: string; isAlert?: boolean } }) => {
        const showAlertIcon = edge.node.isAlert ? (
          <Icon name="md-warning" color="white" style={{ marginRight: 5 }} />
        ) : null;
        const alertTagStyles = edge.node.isAlert
          ? { backgroundColor: '#F24B35' }
          : null;
        const alertTextStyles = edge.node.isAlert ? { color: 'white' } : null;

        return (
          <TouchableOpacity
            onPress={() => this.props.openSelectorModal()}
            key={edge.node.id}
            style={[styles.tag, alertTagStyles]}
          >
            {showAlertIcon}
            <Text style={[styles.tagText, alertTextStyles]}>
              {edge.node.name}
            </Text>
          </TouchableOpacity>
        );
      }
    );
  }

  public render() {
    const { mainItem, relatedItems } = this.state;

    return (
      <View style={styles.primaryListSection}>
        <View style={styles.primaryListSectionContent}>
          <Text style={styles.cardSubHeaderText}>
            {mainItem.name.toUpperCase()}
          </Text>
          <View style={styles.tagContainer}>
            {this.renderTags(this.state.tags)}
          </View>
        </View>
        <View style={styles.colorCodeBand}>
          <TouchableOpacity onPress={() => this.props.removeRecord()}>
            <Image
              style={{ height: 20, width: 20 }}
              source={require('../../assets/images/bin.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ConnectedTagSelector;

const styles: any = StyleSheet.create({
  ...sharedTypographyStyles,
  primaryListSection: {
    flexDirection: 'row',
    backgroundColor: colorScheme.white,
    borderRadius: 5,
    borderColor: '#CCCCCC',
    margin: 10,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowColor: 'black'
  },
  primaryListSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  primaryListSectionContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  colorCodeBand: {
    justifyContent: 'center',
    width: 30
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorScheme.white
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#EDF2FF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    marginBottom: 3
  },
  checkBoxWrapper: {
    width: 30
  },
  modalContainer: {
    flex: 1
  },
  modalHeader: {
    marginTop: 20,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC'
  },
  modalCloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginRight: 10
  },
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCCCCC',
    height: 40,
    paddingLeft: 15,
    alignItems: 'center'
  },
  listItemText: {
    paddingLeft: 15,
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    color: '#333333'
  },
  trashButton: {
    justifyContent: 'center'
  }
});
