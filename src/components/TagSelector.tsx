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
  TextStyle,
  ViewStyle
} from 'react-native';
import { sharedTypographyStyles, colorScheme } from '../constants/styles';
import SuperPicker from './SuperPicker';
import { format } from 'date-fns';
import { CheckBox } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';

class TagSelector extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      tags: [],
      prescriptionLengths: props.prescriptionLengths
    };
  }

  public componentWillReceiveProps(nextProps: any) {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      tags: nextProps.selectedItems,
      prescriptionLengths: nextProps.prescriptionLengths
    });
  }

  public componentDidMount() {
    this.setState({
      tags: this.props.selectedItems
    });
  }

  private updatePrescriptionLength(id: string, prescriptionLength: number) {
    const tags = this.state.tags.map((edge: any) => {
      const updatedEdge = {
        ...edge,
        prescriptionLength: prescriptionLength
      };
      return edge.node.id === id ? updatedEdge : edge;
    });

    this.setState({
      ...this.state,
      tags: tags
    });

    this.props.onPrescriptionLengthChange(prescriptionLength, id);
  }

  private updateDate(id: string, date: string) {
    const tags = this.state.tags.map((edge: any) => {
      const updatedEdge = {
        ...edge,
        date: date
      };
      return edge.node.id === id ? updatedEdge : edge;
    });

    this.setState({
      ...this.state,
      tags: tags
    });

    this.props.onDateChange(date, id);
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
      (edge: {
        node: { id: string; name: string; isAlert?: boolean };
        date?: string;
        prescriptionLength?: number;
      }) => {
        const showAlertIcon = edge.node.isAlert ? (
          <Icon name="md-warning" color="white" style={{ marginRight: 5 }} />
        ) : null;
        const alertTagStyles: ViewStyle | any = edge.node.isAlert
          ? { backgroundColor: '#F24B35' }
          : null;
        const alertTextStyles: TextStyle | any = edge.node.isAlert
          ? { color: 'white' }
          : null;

        return this.props.withDate ? (
          <TouchableOpacity
            key={edge.node.id}
            onLongPress={() => this.props.openDateSelector()}
            onPress={() => this.props.openSelectorModal()}
            style={[styles.tag, alertTagStyles, { width: '100%' }]}
          >
            {showAlertIcon}
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.tagDateText}>
                {this.props.dateText + ': '}
              </Text>
              <SuperPicker
                mode="date"
                displayFormat="DD MMM YYYY"
                inputTextStyle={[
                  styles.tagDateText,
                  { color: colorScheme.mediumOrange }
                ]}
                selectedValue={edge.date}
                onValueChange={(date: string) =>
                  this.updateDate(edge.node.id, date)
                }
              />
            </View>
            {this.props.withPrescriptionLength ? (
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tagDateText}>
                  {this.props.prescriptionLengthText + ': '}
                </Text>
                <SuperPicker
                  mode="select"
                  onValueChange={(length: number) =>
                    this.updatePrescriptionLength(edge.node.id, length)
                  }
                  options={this.state.prescriptionLengths}
                  inputTextStyle={[
                    styles.tagDateText,
                    { color: colorScheme.mediumOrange }
                  ]}
                  selectedValue={edge.prescriptionLength}
                />
              </View>
            ) : null}
            <Text style={[styles.tagText, alertTextStyles]}>
              {edge.node.name}
            </Text>
          </TouchableOpacity>
        ) : (
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
    const { selectedItems, name, color, count, withDate } = this.props;

    return (
      <View style={styles.primaryListSection}>
        <View style={[styles.colorCodeBand, { backgroundColor: color }]} />
        <View style={styles.primaryListSectionContent}>
          <Text style={styles.cardSubHeaderText}>
            {count + ' ' + name.toUpperCase()}
          </Text>
          <View style={styles.tagContainer}>
            {this.renderTags(this.state.tags)}
          </View>
        </View>
      </View>
    );
  }
}

export default TagSelector;

const styles = StyleSheet.create({
  ...sharedTypographyStyles,
  primaryListSection: {
    flexDirection: 'row',
    backgroundColor: colorScheme.white,
    // borderBottomWidth: StyleSheet.hairlineWidth,
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
    alignItems: 'center',
    width: 8,
    paddingTop: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
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
    backgroundColor: '#EDF2FF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'flex-start',
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
  }
});
