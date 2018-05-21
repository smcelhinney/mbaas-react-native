import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { sharedTypographyStyles, colorScheme } from '../constants/styles';
import { graphql, compose } from 'react-apollo';
import FETCH_USER_PROFILE from '../queries/fetchUserProfile';
import UPDATE_PROFILE from '../mutations/updateProfile';
import { format } from 'date-fns';
import {
  formatDateToISO,
  generatePickerOptions,
  generatePrescriptionLengths
} from '../utils';
import SuperPicker from '../components/SuperPicker';
import TextInputSuper from '../components/TextInputSuper';

const SEXES: { [key: string]: { label: string } } = {
  Female: {
    label: 'Female'
  },
  Male: {
    label: 'Male'
  }
};
const WEIGHTS: { [key: number]: { label: string } } = generatePickerOptions(
  0,
  700,
  'kg'
);
const HEIGHTS: { [key: number]: { label: string } } = generatePickerOptions(
  0,
  300,
  'cm'
);

class UserProfileEdit extends Component<any, any> {
  constructor(props: any) {
    super(props);

    const {
      id,
      firstname,
      lastname,
      location,
      sex,
      weight,
      height,
      dateOfBirth,
      medicalConditionTitle,
      medicalConditionDescription
    } = props.data.viewer.user.profile;

    this.state = {
      id,
      firstname,
      lastname,
      location,
      sex,
      weight,
      height,
      dateOfBirth,
      medicalConditionTitle,
      medicalConditionDescription
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  public componentWillReceiveProps(nextProps: any) {
    const {
      id,
      firstname,
      lastname,
      location,
      sex,
      height,
      weight,
      dateOfBirth,
      medicalConditionTitle,
      medicalConditionDescription
    } = nextProps.data.viewer.user.profile;

    this.setState({
      id,
      firstname,
      lastname,
      location,
      sex,
      weight,
      height,
      dateOfBirth,
      medicalConditionTitle,
      medicalConditionDescription
    });
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

  private onNavigatorEvent(event: any) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'save') {
        this.updateUserProfile();
        this.props.navigator.dismissModal();
      }
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal();
      }
    }
  }

  private updateUserProfile() {
    this.props.updateProfile(this.state.id, this.state);
  }

  private updateDate(date: string) {
    const dateOfBirth = formatDateToISO(date);
    this.setState({
      ...this.state,
      dateOfBirth
    });
  }

  private updateWeight(weight: number) {
    this.setState({
      ...this.state,
      weight
    });
  }

  private updateHeight(height: number) {
    this.setState({
      ...this.state,
      height
    });
  }

  private updateSex(sex: string) {
    this.setState({
      ...this.state,
      sex
    });
  }

  private enterFirstname(ev: any) {
    this.setState({
      ...this.state,
      firstname: ev.nativeEvent.text
    });
  }

  private enterLastname(ev: any) {
    this.setState({
      ...this.state,
      lastname: ev.nativeEvent.text
    });
  }

  private updateLocation(ev: any) {
    this.setState({
      ...this.state,
      location: ev.nativeEvent.text
    });
  }

  private updateMedConditionTitle(ev: any) {
    this.setState({
      ...this.state,
      medicalConditionTitle: ev.nativeEvent.text
    });
  }

  private updateMedConditionDesc(ev: any) {
    this.setState({
      ...this.state,
      medicalConditionDescription: ev.nativeEvent.text
    });
  }

  private renderEditScreen() {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.listItemDefault}>
          <Text style={styles.listItemDefaultInputTitle}>
            MEDICAL CONDITION
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Medical condition title"
            onChange={(ev: any) => this.updateMedConditionTitle(ev)}
            clearButtonMode="while-editing"
            style={styles.listItemDefaultInput}
            value={this.state.medicalConditionTitle}
          />
        </View>
        <View style={styles.listItemDefault}>
          <Text style={styles.listItemDefaultInputTitle}>
            MEDICAL CONDITION DESCRIPTION
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={6}
            onChange={(ev: any) => this.updateMedConditionDesc(ev)}
            clearButtonMode="while-editing"
            style={styles.listItemCommentInput}
            value={this.state.medicalConditionDescription}
          />
        </View>
        <View style={styles.listItemDefault}>
          <Text style={styles.listItemDefaultInputTitle}>DATE OF BIRTH</Text>
          <SuperPicker
            mode="date"
            onValueChange={(date: string) => this.updateDate(date)}
            inputTextStyle={styles.listItemPickerDefaultInput}
            inputButtonStyle={{ justifyContent: 'center' }}
            displayFormat="Do MMM YYYY"
            selectedValue={this.state.dateOfBirth}
          />
        </View>
        <View style={styles.listItemDefault}>
          <Text style={styles.listItemDefaultInputTitle}>SEX</Text>
          <SuperPicker
            mode="select"
            onValueChange={(sex: string) => this.updateSex(sex)}
            options={SEXES}
            inputTextStyle={styles.listItemPickerDefaultInput}
            inputButtonStyle={{ justifyContent: 'center' }}
            selectedValue={this.state.sex}
          />
        </View>
        <View style={styles.listItemDefault}>
          <Text style={styles.listItemDefaultInputTitle}>WEIGHT</Text>
          <SuperPicker
            mode="select"
            onValueChange={(weight: number) => this.updateWeight(weight)}
            options={WEIGHTS}
            inputTextStyle={styles.listItemPickerDefaultInput}
            inputButtonStyle={{ justifyContent: 'center' }}
            selectedValue={this.state.weight}
          />
        </View>
        <View style={[styles.listItemDefault, styles.listItemDefaultLast]}>
          <Text style={styles.listItemDefaultInputTitle}>HEIGHT</Text>
          <SuperPicker
            options={HEIGHTS}
            mode="select"
            onValueChange={(height: number) => this.updateHeight(height)}
            inputTextStyle={styles.listItemPickerDefaultInput}
            inputButtonStyle={{ justifyContent: 'center' }}
            selectedValue={this.state.height}
          />
        </View>
      </View>
    );
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollViewMain}
        >
          <View style={styles.container}>{this.renderEditScreen()}</View>
        </ScrollView>
      </View>
    );
  }
}

export default graphql(FETCH_USER_PROFILE)(
  compose(
    graphql(UPDATE_PROFILE, {
      props: ({ mutate }: any) => ({
        updateProfile: (id: string, options: any) => {
          mutate({ variables: { profile: { id: id, ...options } } });
        }
      })
    })
  )(UserProfileEdit)
);

const styles = StyleSheet.create({
  ...sharedTypographyStyles,
  container: {
    flex: 1,
    marginTop: 10
  },
  scrollViewMain: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    paddingBottom: 30
  },
  listItemContainer: {
    marginTop: 60,
    backgroundColor: colorScheme.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colorScheme.mediumGreyBorder,
    marginBottom: 20
  },
  listItemDefault: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colorScheme.mediumGreyBorder,
    marginHorizontal: 10,
    paddingTop: 10
  },
  listItemDefaultLast: {
    borderBottomWidth: 0
  },
  listItemPickerDefaultInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 7
  },
  listItemDefaultInputTitle: {
    fontSize: 12,
    color: colorScheme.mediumGrey
  },
  listItemDefaultInput: {
    height: 50,
    fontSize: 16,
    color: '#333'
  },
  listItemCommentInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 7,
    height: 100
  }
});
