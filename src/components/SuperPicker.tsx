import * as React from 'react';
import { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  DatePickerIOS,
  DatePickerAndroid,
  Picker,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { format, getDay, parse } from 'date-fns';
import { colorScheme } from '../constants/styles';

interface DaysMap {
  [key: number]: string;
}

const DAYS: { [key: number]: string } = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  0: 'Sunday'
};

export default class SuperPicker extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false,
      selectedValue: props.selectedValue
    };

    this._onChange = this._onChange.bind(this);
  }

  private _onChange(val: any) {
    this.setState({ ...this.state, selectedValue: val });
  }

  private _confirmChange() {
    this.props.onValueChange(this.state.selectedValue);
    this._togglePickerModal();
  }

  private _confirmDateChange() {
    const outputFormat = this.props.outputFormat
      ? this.props.outputFormat
      : null;
    this.props.onValueChange(
      format(
        this.state.selectedValue ? this.state.selectedValue : new Date(),
        outputFormat
      )
    );
    this._togglePickerModal();
  }

  private _updateAndroidDate(pickerResp: any) {
    const outputFormat = this.props.outputFormat
      ? this.props.outputFormat
      : null;
    const date = {
      year: pickerResp.year,
      month: pickerResp.month + 1,
      day: pickerResp.day
    };
    const dateString = new Date(
      `${date.year}/${date.month}/${date.day}`
    ).toISOString();
    this.props.onValueChange(format(dateString, outputFormat));
  }

  private _togglePickerModal() {
    this.setState({
      ...this.state,
      isVisible: !this.state.isVisible
    });
  }

  private _openAndroidDatePicker(
    currentDate: Date,
    minDate: Date,
    maxDate: Date
  ) {
    DatePickerAndroid.open({
      date: currentDate,
      minDate,
      maxDate
    }).then(res => {
      if (res.action === 'dateSetAction') {
        this._updateAndroidDate(res);
      }
    });
  }

  private _renderSuperDatePicker() {
    const { mode, minDate, maxDate, displayFormat } = this.props;
    const minDateParsed = minDate ? parse(minDate) : new Date('1970/01/01'); // Should return instanceOf Date
    const maxDateParsed = maxDate ? parse(maxDate) : new Date('2019/12/30'); // Should return instanceOf Date
    const dateObjectFromState = new Date(this.state.selectedValue);
    const dateObjectFromProps = new Date(this.props.selectedValue);
    const formattedInputDisplayDate = displayFormat
      ? format(dateObjectFromProps, displayFormat)
      : format(dateObjectFromProps, 'DD MM YYYY');
    const showDay =
      mode === 'date' || mode === 'datetime' ? (
        <Text style={styles.dayDisplay}>
          {DAYS[getDay(this.state.selectedValue)]}{' '}
        </Text>
      ) : null;
    const defaultDate = this.state.selectedValue
      ? dateObjectFromState
      : new Date();
    return Platform.OS === 'ios' ? (
      <View>
        <View style={[styles.superPickerInputBase]}>
          <TouchableOpacity
            style={
              this.props.inputButtonStyle ? this.props.inputButtonStyle : null
            }
            onPress={() => this._togglePickerModal()}
          >
            <Text
              style={
                this.props.inputTextStyle ? this.props.inputTextStyle : null
              }
            >
              {this.props.selectedValue
                ? formattedInputDisplayDate
                : 'No date provided'}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          onRequestClose={() => {}}
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
        >
          <View style={styles.modalContent}>
            <View style={styles.pickerContainerIOS}>
              <View style={styles.pickerButtonBarIOS}>
                <TouchableOpacity
                  onPress={() => this._togglePickerModal()}
                  style={styles.buttonTouch}
                >
                  <Text style={[styles.button, styles.cancel]}>Cancel</Text>
                </TouchableOpacity>
                {showDay}
                <TouchableOpacity
                  onPress={() => this._confirmDateChange()}
                  style={styles.buttonTouch}
                >
                  <Text style={[styles.button, styles.confirm]}>Select</Text>
                </TouchableOpacity>
              </View>
              <DatePickerIOS
                mode={this.props.mode}
                date={defaultDate}
                minimumDate={minDateParsed}
                maximumDate={maxDateParsed}
                onDateChange={this._onChange.bind(this)}
              />
            </View>
          </View>
        </Modal>
      </View>
    ) : (
      <View>
        <View style={[styles.superPickerInputBase]}>
          <TouchableOpacity
            style={
              this.props.inputButtonStyle ? this.props.inputButtonStyle : null
            }
            onPress={() =>
              this._openAndroidDatePicker(dateObjectFromProps, minDate, maxDate)
            }
          >
            <Text
              style={
                this.props.inputTextStyle ? this.props.inputTextStyle : null
              }
            >
              {this.props.selectedValue
                ? formattedInputDisplayDate
                : 'No date provided'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  private _renderSuperPicker() {
    const { options } = this.props;
    const selectedValue = this.state.selectedValue
      ? options[this.state.selectedValue].label
      : 'Select...';
    return (
      <View>
        <View style={[styles.superPickerInputBase]}>
          <TouchableOpacity
            style={
              this.props.inputButtonStyle ? this.props.inputButtonStyle : null
            }
            onPress={() => this._togglePickerModal()}
          >
            <Text
              style={
                this.props.inputTextStyle ? this.props.inputTextStyle : null
              }
            >
              {selectedValue}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          onRequestClose={() => {}}
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
        >
          <View style={styles.modalContent}>
            <View style={styles.pickerContainerIOS}>
              <View style={styles.pickerButtonBarIOS}>
                <TouchableOpacity
                  onPress={() => this._togglePickerModal()}
                  style={styles.buttonTouch}
                >
                  <Text style={[styles.button, styles.cancel]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._confirmChange()}
                  style={styles.buttonTouch}
                >
                  <Text style={[styles.button, styles.confirm]}>Select</Text>
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={
                  this.state.selectedValue
                    ? this.state.selectedValue.toString()
                    : '0'
                }
                onValueChange={this._onChange.bind(this)}
              >
                {Object.keys(options).map(key => (
                  <Picker.Item
                    key={key}
                    value={key}
                    label={options[key].label}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  public render() {
    const { mode } = this.props;
    return (Platform.OS === 'ios' || Platform.OS === 'android') &&
      mode === 'select'
      ? this._renderSuperPicker()
      : (Platform.OS === 'ios' || Platform.OS === 'android') &&
        (mode === 'date' || mode === 'datetime' || mode === 'time')
        ? this._renderSuperDatePicker()
        : null;
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  superPickerInputBase: {},
  pickerButtonBarIOS: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colorScheme.lightGrey
  },
  pickerContainerIOS: {
    backgroundColor: 'white',
    shadowRadius: 50,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    bottom: 0
  },
  dayDisplay: {
    alignSelf: 'center'
  },
  button: {
    fontSize: 20
  },
  buttonTouch: {
    // backgroundColor: "#CCCCCC",
    // padding: 10
  },
  confirm: {
    color: colorScheme.mediumOrange
  },
  cancel: {
    color: colorScheme.mediumGrey
  }
});
