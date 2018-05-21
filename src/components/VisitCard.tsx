import * as React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import {
  sharedTypographyStyles,
  colorScheme,
  sharedElementStyles
} from '../constants/styles';
import { graphql } from 'react-apollo';
import { format, distanceInWordsToNow } from 'date-fns';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface VisitCardProps {
  id: string;
  visitDate: string;
  visitLocation: string;
  infections: any;
  antibiotics: any;
  modifiedAt: string;
}

export default class VisitCard extends Component<VisitCardProps, {}> {
  render() {
    const {
      id,
      visitDate,
      visitLocation,
      infections,
      antibiotics,
      modifiedAt
    } = this.props;
    return (
      <View style={styles.visitCard} key={id}>
        <View style={styles.visitCardHeader}>
          <Text style={styles.cardSubHeaderText}>
            {format(visitDate, 'Do MMMM YYYY').toUpperCase()}{' '}
          </Text>
          <Text style={styles.cardHeaderText}>
            {visitLocation || 'Location not provided'}{' '}
          </Text>
        </View>
        <View style={styles.visitCardContent}>
          <Text style={styles.cardSubHeaderText}>INFECTIONS</Text>
          <View
            style={{
              borderLeftWidth: 4,
              borderColor: '#4395BF',
              marginTop: 0,
              marginBottom: 15,
              paddingLeft: 10
            }}
          >
            {this.renderSummary(infections.edges, 'infections')}
          </View>
          <Text style={styles.cardSubHeaderText}>ANTIBIOTICS</Text>
          <View
            style={{
              borderLeftWidth: 4,
              borderColor: '#79C8A6',
              marginTop: 0,
              marginBottom: 15,
              paddingLeft: 10
            }}
          >
            {this.renderSummary(antibiotics.edges, 'antibiotics')}
          </View>
        </View>
      </View>
    );
  }

  private renderMore(edges: any) {
    return edges.length > 2 ? (
      <Text style={[styles.cardHeaderText, styles.summaryText]}>
        {'+ ' + (edges.length - 2) + ' more'}
      </Text>
    ) : null;
  }

  private renderSummary(edges: any, type: string) {
    const hasReferenceItems = edges.length > 0;
    return hasReferenceItems ? (
      <View>
        {edges.map((edge: any, index: number) => {
          if (index === 0 || index === 1) {
            return (
              <Text
                key={edge.node.id}
                style={[styles.cardHeaderText, styles.summaryText]}
              >
                {edge.node.name}
              </Text>
            );
          }
        })}
        {this.renderMore(edges)}
      </View>
    ) : (
      <Text style={[styles.cardHeaderText, styles.summaryText]}>
        No {type} recorded
      </Text>
    );
  }
}

const styles: any = StyleSheet.create({
  ...sharedTypographyStyles,
  visitCard: sharedElementStyles.visitCard,
  visitCardContent: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 15
  },
  listMetaCardContent: {
    flex: 1
  },
  visitCardHeader: {
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colorScheme.lightGrey,
    paddingHorizontal: 20
  },
  visitCardFooter: {
    height: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryText: {
    color: colorScheme.darkGrey,
    paddingVertical: 3
  }
});
