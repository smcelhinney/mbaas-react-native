import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import VisitCard from '../build/components/VisitCard.js';
import toJson from 'enzyme-to-json';

describe('Component: VisitCard', () => {

  const testEdges = [
    {
      node: {
        id: "001",
        name: "test reference item 1"
      }
    },
    {
      node: {
        id: "002",
        name: "test reference item 2"
      }
    }
  ]

  const props = {
    infections: {
      edges: testEdges,
    },
    antibiotics: {
      edges: testEdges,
    }
  }

  it('renders correctly', () => {
    const wrapper = shallow(
      <VisitCard {...props}/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  })

})