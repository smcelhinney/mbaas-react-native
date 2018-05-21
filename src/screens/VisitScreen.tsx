import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Picker,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { sharedTypographyStyles, colorScheme } from '../constants/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import gql from 'graphql-tag';
import CONSTANTS from '../constants';
import { format } from 'date-fns';
import { graphql, compose } from 'react-apollo';
import SuperPicker from '../components/SuperPicker';
import { formatDateToISO, generatePrescriptionLengths } from '../utils';
import TagSelector from '../components/TagSelector';
import TextInputSuper from '../components/TextInputSuper';
import EventEmitter from 'EventEmitter';

import FETCH_USER_VISIT from '../queries/fetchUserVisit';
import UPDATE_VISIT from '../mutations/updateVisit';
import UPDATE_VISIT_SPECIMEN from '../mutations/updateVisitSpecimen';
import UPDATE_VISIT_ANTIBIOTICS from '../mutations/updateVisitAntibiotics';
import REMOVE_VISIT from '../mutations/removeVisit';
import FETCH_ALL_VISITS from '../queries/fetchAllUserVisits';
import Icons from '../constants/icons';

const PRESCRIPTION_LENGHTS: {
  [key: number]: { label: string };
} = generatePrescriptionLengths();

class VisitScreen extends Component<any, any> {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'deleteVisit',
        icon: Icons.TRASH
      }
    ]
  };

  constructor(props: any) {
    super(props);

    this.state = {
      visitDate: null,
      visitLocation: null,
      professional: null,
      note: null
    };
    this.openSelectorModal = this.openSelectorModal.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  public componentDidMount() {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: 'deleteVisit',
          icon: Icons.TRASH
        }
      ]
    });
  }

  private onNavigatorEvent(event: any) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'deleteVisit') {
        this.confirmDelete();
      }
    }
  }

  private confirmDelete() {
    Alert.alert(
      'Delete Visit',
      'Are you sure you want to delete this visit? Once deleted it cannot be recovered.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.deleteVisit() }
      ],
      { cancelable: true }
    );
  }

  public componentWillReceiveProps(newProps: any) {
    if (!newProps.data.loading) {
      const {
        visitDate,
        visitLocation,
        professional,
        note
      } = newProps.data.getVisit;

      this.setState({
        visitDate,
        visitLocation,
        professional,
        note
      });
    }
  }

  private enterVisitLocation(ev: any) {
    this.setState({
      ...this.state,
      visitLocation: ev.nativeEvent.text
    });
  }

  private updateVisitLocation() {
    if (this.props.visitLocation !== this.state.visitLocation) {
      this.props.updateCurrentVisit(this.props.visitId, {
        visitLocation: this.state.visitLocation
      });
    }
  }

  private updateDate(visitDate: string) {
    this.setState({
      ...this.state,
      visitDate
    });

    this.props.updateCurrentVisit(this.props.visitId, { visitDate });
  }

  private enterVisitComment(ev: any) {
    this.setState({
      ...this.state,
      note: ev.nativeEvent.text
    });
  }

  private updateVisitComment() {
    this.props.updateCurrentVisit(this.props.visitId, {
      note: this.state.note
    });
  }

  private deleteVisit() {
    this.props.removeVisit(this.props.visitId).then(this.navigateToDashboard());
  }

  private navigateToDashboard() {
    this.props.navigator.popToRoot({
      animated: true // does the popToRoot have transition animation or does it happen immediately (optional)
    });
  }

  private renderVisitHeader() {
    const {
      id,
      visitLocation,
      visitDate,
      professional
    } = this.props.data.getVisit;
    console.log(this.state.visitDate);

    const formattedDate = format(visitDate, 'Do MMMM YYYY');
    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View
            style={[styles.headerRowGridItem, styles.dividerRight, { flex: 2 }]}
          >
            <Text style={styles.cardSubHeaderText}>{'DATE'}</Text>
            <SuperPicker
              mode="date"
              displayFormat="DD MMM YYYY"
              inputTextStyle={styles.cardHeaderText}
              selectedValue={this.state.visitDate}
              onValueChange={(date: string) => this.updateDate(date)}
            />
          </View>
          <View style={[styles.headerRowGridItem, { flex: 3 }]}>
            <Text style={styles.cardSubHeaderText}>{'HOSPITAL'}</Text>
            <TextInputSuper
              focusColor="#FFFBE3"
              superInputStyles={[
                styles.cardHeaderText,
                {
                  height: 30,
                  left: -10,
                  top: -4,
                  paddingLeft: 10,
                  paddingVertical: 5,
                  borderRadius: 5
                }
              ]}
              value={this.state.visitLocation}
              onChange={(ev: any) => this.enterVisitLocation(ev)}
              onBlur={() => this.updateVisitLocation()}
              autoCorrect={false}
              onSubmitEditing={() => this.updateVisitLocation()}
              clearButtonMode={'while-editing'}
              returnKeyType={'done'}
              placeholder="Enter hospital name"
            />
          </View>
        </View>
        <View style={styles.headerRow}>
          <View style={styles.headerRowGridItem}>
            <Text style={styles.cardSubHeaderText}>{'SEEN BY'} </Text>
            <TouchableOpacity
              onPress={() =>
                this.openSingleSelectorModal(professional, 'PROFESSIONALS')
              }
            >
              <Text style={styles.cardHeaderText}>
                {professional ? professional.name : 'Add doctor type'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  private openSingleSelectorModal(selectedItem: any, queryType: string) {
    this.props.navigator.showModal({
      screen: 'modals.SingleItemSelectionModal',
      title: `Select a ${queryType.toLowerCase()}`,
      navigatorStyle: {
        navBarTranslucent: true,
        drawUnderNavBar: true,
        navBarNoBorder: true
      },
      passProps: {
        queryType: queryType,
        selectedItem: selectedItem,
        typeId: this.props.visitId
      }
    });
  }

  private updateVisitSpecimen(date: string, itemId: string) {
    this.props.updateVisitSpecimen({
      visitId: this.props.visitId,
      specimenId: itemId,
      date: date
    });
  }

  private updateVisitAntibiotic(date: string, itemId: string) {
    this.props.updateVisitAntibiotic({
      visitId: this.props.visitId,
      antibioticId: itemId,
      date: date
    });
  }

  private updateVisitAntibioticPrescriptionLength(
    prescriptionLength: string,
    itemId: string
  ) {
    this.props.updateVisitAntibiotic({
      visitId: this.props.visitId,
      antibioticId: itemId,
      prescriptionLength
    });
  }

  private openSelectorModal(
    selectedItems: any,
    queryType: string,
    color: string
  ) {
    this.props.navigator.showModal({
      screen: 'modals.ItemsSelectionModal',
      title: `Select ${queryType.toLowerCase()}`,
      navigatorStyle: {
        navBarTranslucent: true,
        drawUnderNavBar: true,
        navBarNoBorder: true,
        navBarBackgroundColor: color,
        navBarTextColor: colorScheme.white,
        navBarButtonColor: colorScheme.white
      },
      passProps: {
        showSearch: true,
        queryType: queryType,
        selectedItems: selectedItems,
        typeId: this.props.visitId
      }
    });
  }

  private renderTagSelectors() {
    const {
      id,
      visitLocation,
      visitDate,
      professional,
      organisms,
      infections,
      specimens,
      antibiotics
    } = this.props.data.getVisit;
    const referenceItems = [
      {
        type: infections,
        name: 'infections',
        color: '#4395BF',
        queryType: CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME,
        withDate: false,
        withPrescriptionLength: false,
        onDateChange: null,
        sections: true
      },
      {
        type: organisms,
        name: 'organisms',
        color: colorScheme.mediumPink,
        queryType: CONSTANTS.REFERENCE_TYPES.ORGANISMS.NAME,
        withDate: false,
        withPrescriptionLength: false,
        onDateChange: null,
        sections: false
      },
      {
        type: specimens,
        name: 'specimens',
        color: '#EDCF6A',
        queryType: CONSTANTS.REFERENCE_TYPES.SPECIMENS.NAME,
        withDate: true,
        withPrescriptionLength: false,
        dateText: 'Specimen Date',
        onDateChange: this.updateVisitSpecimen.bind(this),
        sections: false
      },
      {
        type: antibiotics,
        name: 'antibiotics',
        color: '#79C8A6',
        queryType: CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME,
        withDate: true,
        withPrescriptionLength: true,
        dateText: 'Start Date',
        prescriptionLengthText: 'Prescription length',
        prescriptionLengths: PRESCRIPTION_LENGHTS,
        onPrescriptionLengthChange: this.updateVisitAntibioticPrescriptionLength.bind(
          this
        ),
        onDateChange: this.updateVisitAntibiotic.bind(this),
        sections: false
      }
    ];

    return referenceItems.map((referenceItem: any) => {
      return this.renderTagSelector(referenceItem);
    });
  }

  public renderTagSelector(referenceItem: any) {
    if (this.props.data.loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <TagSelector
        withDate={referenceItem.withDate}
        withPrescriptionLength={referenceItem.withPrescriptionLength}
        prescriptionLengths={referenceItem.prescriptionLengths}
        prescriptionLengthText={referenceItem.prescriptionLengthText}
        onPrescriptionLengthChange={referenceItem.onPrescriptionLengthChange}
        onDateChange={referenceItem.onDateChange}
        dateText={referenceItem.dateText}
        openSelectorModal={() =>
          this.openSelectorModal(
            referenceItem.type.edges,
            referenceItem.queryType,
            referenceItem.color
          )
        }
        key={referenceItem.name}
        typeId={this.props.visitId}
        count={referenceItem.type.edges.length}
        selectedItems={referenceItem.type.edges}
        name={referenceItem.name}
        color={referenceItem.color}
      />
    );
  }

  public render() {
    if (this.props.data.loading) {
      return <Text>Loading...</Text>;
    }

    return (
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <StatusBar animated barStyle="default" />
        <View style={styles.container}>
          {this.renderVisitHeader()}

          <View style={{ paddingLeft: 15, paddingTop: 20 }}>
            <Text style={styles.cardSubHeaderText}>{'DETAILS'}</Text>
          </View>

          {this.renderTagSelectors()}

          <View
            style={{ paddingHorizontal: 15, paddingTop: 20, paddingBottom: 30 }}
          >
            <Text style={styles.cardSubHeaderText}>{'COMMENTS'}</Text>

            <View style={{ backgroundColor: colorScheme.lightGrey }}>
              <TextInput
                underlineColorAndroid="transparent"
                multiline
                numberOfLines={6}
                onChange={(ev: any) => this.enterVisitComment(ev)}
                onBlur={() => this.updateVisitComment()}
                clearButtonMode="while-editing"
                style={styles.commentBox}
                value={this.state.note}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const defaultQueryOptions = {
  options: (props: any) => {
    return {
      variables: {
        id: props.visitId
      }
    };
  }
};

const updateMutationOptions = {};

export default graphql(FETCH_USER_VISIT, defaultQueryOptions)(
  compose(
    graphql(UPDATE_VISIT, {
      props: ({ mutate }: any) => ({
        updateCurrentVisit: (id: string, options: any) => {
          mutate({ variables: { visit: { id: id, ...options } } });
        }
      })
    }),
    graphql(UPDATE_VISIT_SPECIMEN, {
      name: 'updateVisitSpecimen',
      props: ({ updateVisitSpecimen }: any) => ({
        updateVisitSpecimen: (options: any) => {
          updateVisitSpecimen({ variables: { visitSpecimen: { ...options } } });
        }
      })
    }),
    graphql(UPDATE_VISIT_ANTIBIOTICS, {
      name: 'updateVisitAntibiotic',
      props: ({ updateVisitAntibiotic }: any) => ({
        updateVisitAntibiotic: (options: any) => {
          updateVisitAntibiotic({
            variables: { visitAntibiotics: { ...options } }
          });
        }
      })
    }),
    graphql(REMOVE_VISIT, {
      name: 'removeVisit',
      options: props => ({
        refetchQueries: [
          {
            query: FETCH_ALL_VISITS
          }
        ]
      }),
      props: ({ removeVisit }: any) => ({
        removeVisit: (id: string) => {
          return removeVisit({ variables: { visit: { id } } });
        }
      })
    })
  )(VisitScreen)
);

const styles = StyleSheet.create({
  ...sharedTypographyStyles,
  container: {
    marginTop: 20,
    flex: 1
  },
  horizontalScrollViewBackPanel: {
    height: 130,
    marginTop: 30,
    backgroundColor: '#8A9CB2',
    position: 'relative'
  },
  horizontalScrollView: {
    height: 150,
    paddingLeft: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10
  },
  horizontalScrollViewContent: {
    alignItems: 'center'
  },
  noteCard: {
    height: 130,
    width: 150,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.1
  },
  scrollView: {
    // backgroundColor: colorScheme.lightGrey
  },
  scrollViewContent: {},
  sectionsContainer: {
    backgroundColor: '#FFFFFF'
  },
  header: {
    paddingTop: 50,
    paddingBottom: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  headerRow: {
    flexDirection: 'row',
    paddingTop: 10
  },
  headerRowGridItem: {
    paddingRight: 15,
    marginLeft: 15,
    marginBottom: 0
  },
  dividerRight: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCCCCC'
  },
  visitCard: {
    height: 100,
    width: 80,
    borderRadius: 5,
    marginRight: 15,
    shadowColor: '#000000',
    shadowRadius: 20,
    shadowOpacity: 0.2
  },
  listItemContainer: {
    marginVertical: 15,
    backgroundColor: colorScheme.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
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
    marginHorizontal: 10,
    paddingVertical: 10
  },
  commentBox: {
    height: 100,
    margin: 5
  }
});
