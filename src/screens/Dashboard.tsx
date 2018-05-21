import * as React from 'react';
import { Component } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  Image
} from 'react-native';
import {
  sharedTypographyStyles,
  colorScheme,
  sharedElementStyles
} from '../constants/styles';
import Icons from '../constants/icons';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { format } from 'date-fns';
import CREATE_VISIT from '../mutations/createVisit';
import FETCH_ALL_VISITS from '../queries/fetchAllUserVisits';
import returnReocurringItemsList from '../utils';
import VisitCard from '../components/VisitCard';
import SuperPicker from '../components/SuperPicker';

class Dashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      newVisitCreateLoading: false
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  private onNavigatorEvent(event: any) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'createNewVisit') {
        this.createVisit();
      }
    }
  }

  public render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.contentBlockContainer}>
            <View style={styles.horizontalScrollViewBackPanel}>
              <ScrollView
                horizontal={true}
                scrollEventThrottle={200}
                style={styles.horizontalScrollView}
                contentContainerStyle={styles.horizontalScrollViewContent}
              >
                {this.renderVisitCards()}
              </ScrollView>
            </View>
          </View>
          <View style={[styles.contentBlockContainer]}>
            {this.renderReOccuringInfectionList()}
          </View>
          <View style={[styles.contentBlockContainer]}>
            {this.renderAlertOrganismsList()}
          </View>
        </View>
      </ScrollView>
    );
  }

  private goToVisitDetail(id: string) {
    this.props.navigator.push({
      screen: 'screens.VisitScreen',
      navigatorStyle: {
        navBarTranslucent: true,
        drawUnderNavBar: true
      },
      passProps: {
        visitId: id
      }
    });
  }

  private createVisit() {
    this.setState({
      newVisitCreateLoading: true
    });
    const { newVisitLocation, newVisitDate } = this.state;
    const userId = this.props.data.viewer.user.id;
    this.props
      .mutate({
        variables: {
          visit: {
            userId: userId,
            visitLocation: 'New Visit..',
            visitDate: Date.now()
          }
        }
      })
      .then((data: any) => {
        this.setState({
          ...this.state,
          createVisitModalVisible: false,
          newVisitCreateLoading: false
        });
        this.goToVisitDetail(data.data.createVisit.changedVisit.id);
      })
      .catch((error: any) => {
        console.log('there was an error sending the query', error);
      });
  }

  private renderAlertOrganismsList() {
    if (this.props.data.loading) {
      return;
    }

    const userVisits = this.props.data.viewer.user.visits.edges;
    const reoccurringOrganisms = returnReocurringItemsList(
      userVisits,
      'organisms',
      true
    );
    const reoccurringOrganismsList = reoccurringOrganisms.map(organism => {
      return (
        <View style={styles.listItem} key={organism.id}>
          <View style={styles.listMain}>
            <Text style={styles.listTitle}>{organism.name}</Text>
            <Text style={styles.listSubLine}>
              Recorded on {organism.count} visits
            </Text>
          </View>
        </View>
      );
    });

    return reoccurringOrganisms.length > 0 ? (
      <View>
        <View style={styles.listItem}>
          <Text style={styles.cardSubHeaderText}>ALERT ORGANISMS</Text>
          <Text style={styles.noticeText}>
            If you ever had one of the following organisms and you are admitted
            to hospital please make sure to tell a healthcare professional
          </Text>
          <View
            style={{
              borderLeftWidth: 4,
              borderColor: colorScheme.mediumPink,
              marginTop: 0,
              marginBottom: 15,
              paddingLeft: 10
            }}
          >
            {reoccurringOrganismsList}
          </View>
        </View>
      </View>
    ) : null;
  }

  private renderReOccuringInfectionList() {
    if (this.props.data.loading) {
      return;
    }

    const userVisits = this.props.data.viewer.user.visits.edges;
    const reoccurringInfections = returnReocurringItemsList(
      userVisits,
      'infections'
    );
    const reoccurringInfectionsList = reoccurringInfections.map(infection => {
      return (
        <View style={styles.listItem} key={infection.id}>
          <View style={styles.listMain}>
            <Text style={styles.listTitle}>{infection.name}</Text>
            <Text style={styles.listSubLine}>
              Recorded on {infection.count} visits
            </Text>
          </View>
        </View>
      );
    });

    return reoccurringInfections.length > 0 ? (
      <View>
        <View style={styles.listItem}>
          <Text style={styles.cardSubHeaderText}>RECURRING INFECTIONS</Text>
          <View
            style={{
              borderLeftWidth: 4,
              borderColor: '#4395BF',
              marginTop: 0,
              marginBottom: 15,
              paddingLeft: 10
            }}
          >
            {reoccurringInfectionsList}
          </View>
        </View>
      </View>
    ) : null;
  }

  private renderVisitsCount() {
    if (this.props.data.loading) {
      return <Text style={styles.sectionTitleSub}>Loading your visits...</Text>;
    }
    const { aggregations } = this.props.data.viewer.user.visits;
    const visitCount = aggregations.count;
    return (
      <Text style={styles.sectionTitleSub}>
        You have {visitCount} recorded visits
      </Text>
    );
  }

  private renderVisitCards() {
    if (this.props.data.loading) {
      return (
        <View style={[styles.centering, styles.visitCard]}>
          <ActivityIndicator
            animating={true}
            style={{ height: 80 }}
            size="large"
          />
        </View>
      );
    }
    const { aggregations, edges } = this.props.data.viewer.user.visits;
    const visitCount = aggregations.count;
    const visitEdges = edges;

    if (visitCount === 0) {
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => this.createVisit()}>
          <View
            style={[
              styles.visitCard,
              { width: Dimensions.get('window').width - 40 }
            ]}
          >
            <View style={styles.visitCardContent}>
              <Text style={styles.cardSubHeaderText}>NO RECORDED VISITS</Text>
              <View
                style={{
                  borderLeftWidth: 4,
                  borderColor: colorScheme.mediumOrange,
                  marginTop: 0,
                  marginBottom: 15,
                  paddingLeft: 10
                }}
              >
                <Text
                  style={[
                    styles.cardHeaderText,
                    { color: colorScheme.mediumOrange }
                  ]}
                >
                  Create Visit
                </Text>
                <Text style={[styles.cardHeaderText, styles.summaryText]}>
                  Tap this card to create your first visit. You can also tap the
                  + icon in the navigation bar.
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return visitEdges.map((edge: any) => {
      const {
        id,
        visitDate,
        visitLocation,
        infections,
        antibiotics,
        modifiedAt
      } = edge.node;
      return (
        <TouchableOpacity
          activeOpacity={1}
          key={id}
          onPress={() => this.goToVisitDetail(id)}
        >
          <VisitCard
            id={id}
            visitDate={visitDate}
            visitLocation={visitLocation}
            infections={infections}
            antibiotics={antibiotics}
            modifiedAt={modifiedAt}
          />
        </TouchableOpacity>
      );
    });
  }
}

export default graphql(FETCH_ALL_VISITS)(
  compose(
    graphql(CREATE_VISIT, {
      options: props => ({
        refetchQueries: [
          {
            query: FETCH_ALL_VISITS
          }
        ]
      })
    })
  )(Dashboard)
);

const styles: any = StyleSheet.create({
  ...sharedTypographyStyles,
  container: {
    marginTop: Platform.OS === 'ios' ? 75 : 20,
    flex: 1
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentBlockContainer: {
    // marginTop: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  horizontalScrollViewBackPanel: {
    height: Platform.OS === 'ios' ? 300 : 350,
    marginTop: 10,
    backgroundColor: '#8A9CB2',
    position: 'relative'
  },
  horizontalScrollView: {
    height: 310,
    paddingLeft: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10
  },
  horizontalScrollViewContent: {
    alignItems: 'center'
  },
  visitCard: sharedElementStyles.visitCard,
  listMetaCardContent: {
    flex: 1
  },
  cardCountRow: {
    flexDirection: 'row',
    // justifyContent: "space-around",
    alignItems: 'center'
  },
  button: {
    borderColor: colorScheme.mediumGrey,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  buttonText: {
    fontSize: 18,
    color: colorScheme.mediumGrey
  },
  buttonTextConfirm: {
    color: colorScheme.white
  },
  buttonConfirm: {
    backgroundColor: colorScheme.mediumOrange,
    borderWidth: 0
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginLeft: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colorScheme.mediumGreyBorder
  },
  listMeta: {
    width: 60,
    marginRight: 5,
    alignItems: 'center'
  },
  listMain: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  themeGreen: {
    color: colorScheme.mediumGreen
  },
  visitCardContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  summaryText: {
    color: colorScheme.mediumGrey,
    paddingVertical: 3
  }
});
