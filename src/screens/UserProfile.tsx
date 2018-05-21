import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { sharedTypographyStyles, colorScheme } from '../constants/styles';
import CONSTANTS from '../constants';
import { graphql, compose } from 'react-apollo';
import FETCH_USER_PROFILE from '../queries/fetchUserProfile';
import UPDATE_PROFILE_VACCINATION from '../mutations/updateProfileVaccination';
import ADD_ALLERGY from '../mutations/addAllergy';
import UPDATE_PROFILE from '../mutations/updateProfile';
import DELETE_ALLERGY from '../mutations/deleteAllergy';
import ConnectedTagSelector from '../components/ConnectedTagSelector';
import TagSelector from '../components/TagSelector';
import { format, differenceInCalendarYears } from 'date-fns';

class UserProfile extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: null,
      firstname: null,
      lastname: null,
      location: null,
      note: null,
      sex: null,
      weight: null,
      height: null,
      dateOfBirth: null,
      medicalConditionTitle: null,
      medicalConditionDescription: null
    };
  }

  public componentWillReceiveProps(newProps: any) {
    if (newProps.data.viewer) {
      this.setState({
        ...newProps.data.viewer.user.profile
      });
    }
  }

  private openEditProfile() {
    this.props.navigator.showModal({
      screen: 'modals.UserProfileEdit',
      title: 'Edit Profile',
      navigatorStyle: {
        navBarTranslucent: true,
        drawUnderNavBar: true
      }
    });
  }

  private enterProfileComment(ev: any) {
    this.setState({
      ...this.state,
      note: ev.nativeEvent.text
    });
  }

  private updateProfileComment() {
    this.props.updateProfile(this.state.id, { note: this.state.note });
  }

  private renderHeaderCard() {
    const {
      firstname,
      lastname,
      location,
      dateOfBirth,
      weight,
      height,
      sex
    } = this.state;
    const age = differenceInCalendarYears(new Date(), dateOfBirth);
    const src =
      sex === 'Female'
        ? require('../../assets/images/female.png')
        : require('../../assets/images/male.png');

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => this.openEditProfile()}>
          <View style={styles.headerRow}>
            <View style={[styles.headerRowGridItem, styles.dividerRight]}>
              <Text style={styles.gridItemInfoText}>{weight} kg</Text>
              <Text style={styles.gridItemTitle}>WEIGHT</Text>
            </View>
            <View style={[styles.headerRowGridItem, styles.dividerRight]}>
              <Text style={styles.gridItemInfoText}>{height} cm</Text>
              <Text style={styles.gridItemTitle}>HEIGHT</Text>
            </View>
            <View style={[styles.headerRowGridItem]}>
              <Text style={styles.gridItemInfoText}>{age} Years</Text>
              <Text style={styles.gridItemTitle}>AGE</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private renderCommentSection() {
    return (
      <View style={{ paddingHorizontal: 15, paddingTop: 20, marginBottom: 20 }}>
        <Text style={styles.cardSubHeaderText}>{'COMMENTS'}</Text>
        <View style={{ backgroundColor: colorScheme.lightGrey }}>
          <TextInput
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={6}
            onChange={(ev: any) => this.enterProfileComment(ev)}
            onBlur={() => this.updateProfileComment()}
            clearButtonMode="while-editing"
            style={styles.commentBox}
            value={this.state.note}
          />
        </View>
      </View>
    );
  }

  private renderAllergySection() {
    if (this.props.data.viewer) {
      const { antibioticAllergies } = this.props.data.viewer.user.profile;
      const addButton =
        antibioticAllergies.edges.length > 0 ? (
          <TouchableOpacity onPress={() => this.addAllergyToProfile()}>
            <Text
              style={[
                styles.cardSubHeaderText,
                { marginRight: 15, color: colorScheme.mediumOrange }
              ]}
            >
              {'+ ADD ALLERGY'}
            </Text>
          </TouchableOpacity>
        ) : null;
      return (
        <View>
          <View
            style={{
              paddingLeft: 15,
              paddingTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={styles.cardSubHeaderText}>
              {'ANTIBIOTIC ALLERGIES'}
            </Text>
          </View>
          {this.renderAllergyCards()}
          {this.renderAddAllergyLargButton()}
        </View>
      );
    }
  }

  private updateProfileVaccination(date: string, itemId: string) {
    const { id } = this.props.data.viewer.user.profile;
    this.props.updateProfileVaccination({
      profileId: id,
      vaccinationId: itemId,
      date: date
    });
  }

  private renderVaccinationTagSelector() {
    if (!this.props.data.viewer) {
      return;
    }
    const { id, vaccinations } = this.props.data.viewer.user.profile;
    const referenceItem = {
      profileId: id,
      type: vaccinations,
      name: 'vaccinations',
      color: '#C28CF0',
      queryType: CONSTANTS.REFERENCE_TYPES.VACCINATIONS.NAME,
      withDate: true,
      onDateChange: this.updateProfileVaccination.bind(this),
      dateText: 'Last Vaccination'
    };

    return (
      <TagSelector
        withDate={referenceItem.withDate}
        dateText={referenceItem.dateText}
        onDateChange={referenceItem.onDateChange}
        openSelectorModal={() =>
          this.openSelectorModal(
            referenceItem.profileId,
            referenceItem.type.edges,
            referenceItem.queryType
          )
        }
        key={referenceItem.name}
        typeId={this.props.profileId}
        count={referenceItem.type.edges.length}
        selectedItems={referenceItem.type.edges}
        name={referenceItem.name}
        color={referenceItem.color}
      />
    );
  }

  private renderAllergyCards() {
    if (this.props.data.viewer) {
      const { antibioticAllergies } = this.props.data.viewer.user.profile;

      return antibioticAllergies.edges.map((allergyNode: any) => {
        const allergy = allergyNode.node;
        return (
          <ConnectedTagSelector
            removeRecord={() => this.props.deleteAllergy(allergy.id)}
            openSelectorModal={() =>
              this.openSelectorModal(
                allergy.id,
                allergy.symptoms.edges,
                CONSTANTS.REFERENCE_TYPES.SYMPTOMS.NAME
              )
            }
            key={allergy.id}
            name={CONSTANTS.REFERENCE_TYPES.SYMPTOMS.NAME}
            mainItem={allergy.antibiotic}
            relatedItems={allergy.symptoms.edges}
          />
        );
      });
    }
  }

  private addAllergyToProfile() {
    if (this.props.data.viewer) {
      const queryType = CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME;
      const profileId = this.props.data.viewer.user.profile.id;

      this.props.navigator.showModal({
        screen: 'modals.SingleItemSelectionModal',
        title: 'Select Allergy',
        navigatorStyle: {
          navBarTranslucent: true,
          drawUnderNavBar: true
        },
        passProps: {
          queryType: queryType,
          typeId: profileId
        }
      });
    }
  }

  private openSelectorModal(
    itemId: string,
    selectedItems: any,
    queryType: string
  ) {
    this.props.navigator.showModal({
      screen: 'modals.ItemsSelectionModal',
      title: 'Select a..',
      navigatorStyle: {
        navBarTranslucent: true,
        drawUnderNavBar: true,
        navBarBackgroundColor: colorScheme.mediumBlue,
        navBarTextColor: colorScheme.white,
        navBarButtonColor: colorScheme.white
      },
      passProps: {
        queryType: queryType,
        selectedItems: selectedItems,
        typeId: itemId
      }
    });
  }

  private renderAddAllergyLargButton() {
    if (this.props.data.viewer) {
      const { antibioticAllergies } = this.props.data.viewer.user.profile;
      return (
        <TouchableOpacity
          style={styles.buttonLarge}
          onPress={() => this.addAllergyToProfile()}
        >
          <Text>Add Allergy</Text>
        </TouchableOpacity>
      );
    }
  }

  public render() {
    if (this.props.data.loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <KeyboardAvoidingView behavior={'position'}>
        <ScrollView style={styles.scrollViewMain}>
          <View style={styles.container}>
            {this.renderHeaderCard()}
            {this.renderVaccinationTagSelector()}
            {this.renderAllergySection()}
            {this.renderCommentSection()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default graphql(FETCH_USER_PROFILE)(
  compose(
    graphql(UPDATE_PROFILE, {
      name: 'updateUserProfile',
      props: ({ updateUserProfile }: any) => ({
        updateProfile: (id: string, options: any) => {
          updateUserProfile({ variables: { profile: { id: id, ...options } } });
        }
      })
    }),
    graphql(UPDATE_PROFILE_VACCINATION, {
      name: 'updateProfileVaccination',
      options: props => ({
        refetchQueries: [
          {
            query: FETCH_USER_PROFILE
          }
        ]
      }),
      props: ({ updateProfileVaccination }: any) => ({
        updateProfileVaccination: (options: any) => {
          updateProfileVaccination({
            variables: { profileVaccination: { ...options } }
          });
        }
      })
    }),
    graphql(DELETE_ALLERGY, {
      name: 'deleteAntibioticAllergy',
      options: props => ({
        refetchQueries: [
          {
            query: FETCH_USER_PROFILE
          }
        ]
      }),
      props: ({ deleteAntibioticAllergy }: any) => ({
        deleteAllergy: (id: string) => {
          deleteAntibioticAllergy({ variables: { allergy: { id } } });
        }
      })
    })
  )(UserProfile)
);

const styles = StyleSheet.create({
  ...sharedTypographyStyles,
  allergyCard: {},
  buttonLarge: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorScheme.white,
    padding: 15,
    borderColor: colorScheme.mediumGrey,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
    marginVertical: 10
  },
  container: {
    flex: 1,
    marginTop: 20
  },
  scrollViewMain: {
    paddingBottom: 30
  },
  header: {
    marginTop: 60,
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colorScheme.lightGrey
  },
  headerTop: {
    alignItems: 'center'
  },
  headerDetails: {
    alignItems: 'center',
    marginBottom: 15
  },
  headerMainText: {
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 18,
    color: colorScheme.lightBlue
  },
  headerSubText: {
    fontSize: 14,
    color: colorScheme.mediumGrey
  },
  profileImage: {
    width: 75,
    height: 75,
    backgroundColor: '#EAEAEA',
    borderRadius: 50
  },
  headerRow: {
    flexDirection: 'row',
    paddingTop: 10
  },
  headerRowGridItem: {
    marginBottom: 0,
    flex: 1,
    marginLeft: 15,
    paddingRight: 15
    // alignItems: "center"
  },
  gridItemInfoText: {
    fontFamily: 'HelveticaNeue-Light',
    color: colorScheme.lightBlue,
    fontSize: 18,
    paddingBottom: 5
  },
  gridItemTitle: {
    fontSize: 11,
    color: colorScheme.mediumGrey
  },
  dividerRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCCCCC'
  },
  commentBox: {
    height: 100,
    margin: 5
  }
});
