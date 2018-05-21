import { Dimensions, ViewStyle, TextStyle, StyleSheet } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const colorScheme: any = {
  white: '#FFFFFF',
  black: '#030303',
  lightGrey: '#EFEFF4',
  mediumGrey: '#8e8e93',
  mediumGreyBorder: '#CCCCCC',
  darkGrey: '#606060',
  lightGreen: '',
  mediumGreen: '#79C8A6',
  darkGreen: '',
  lightBlue: '#82C5E6',
  mediumBlue: '#8A9CB2',
  darkBlue: '',
  lightRed: '#fb716e',
  mediumRed: '#B45959',
  darkRed: '',
  lightPink: '',
  mediumPink: '#E291D7',
  darkPink: '',
  mediumOrange: '#FF8436'
};

const sharedTypographyStyles: any = {
  sectionTitleH1: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 15,
    color: colorScheme.black
  },
  sectionTitleSub: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 10,
    color: colorScheme.mediumGrey
  },
  sectionTitleH2: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 15,
    color: colorScheme.black
  },
  cardHeaderText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    color: colorScheme.lightBlue
  },
  cardSubHeaderText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 11,
    fontWeight: 'bold',
    color: colorScheme.mediumGrey,
    marginBottom: 7
  },
  cardFooterText: {
    fontStyle: 'italic',
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    color: colorScheme.mediumGrey
  },
  tagText: {
    fontSize: 14,
    color: '#555555'
  },
  tagDateText: {
    fontSize: 13,
    marginBottom: 5,
    color: '#555555'
  },
  noticeText: {
    fontSize: 10,
    marginBottom: 5,
    color: colorScheme.lightRed
  },
  sectionSubTitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    fontWeight: 'normal',
    paddingLeft: 15,
    paddingBottom: 15
  },
  sectionTitlePadding: {
    paddingBottom: 5
  },
  listHeaderTitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    color: colorScheme.black,
    marginBottom: 0
  },
  listTitle: {
    fontFamily: 'Helvetica Neue',
    fontSize: 15,
    color: colorScheme.darkGrey,
    marginBottom: 5
  },
  listSubLine: {
    fontFamily: 'Helvetica Neue',
    fontSize: 12,
    color: colorScheme.mediumGrey
  },
  count: {
    fontSize: 35,
    fontFamily: 'HelveticaNeue-Light'
  },
  countLabel: {
    fontSize: 12,
    color: colorScheme.darkGrey
  },
  white: {
    color: '#FFFFFF'
  }
};

const sharedElementStyles: any = {
  visitCard: {
    height: 300,
    paddingBottom: 10,
    width: DEVICE_WIDTH - 60,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.1
  }
};

export { sharedTypographyStyles, colorScheme, sharedElementStyles };
