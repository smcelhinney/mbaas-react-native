import 'react-native';
import React from 'react';
import TagSelector from '../build/components/TagSelector.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const minProps = {
  selectedItems: [
    {
      node: {
        id: '01',
        isAlert: false,
        name: 'TEST_TAG'
      }
    }
  ]
}

describe('Component: TagSelector', () => {

  it('TagSelector renders correctly', () => {
    const wrapper = shallow(
      <TagSelector name="NAME" {...minProps}/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  })

});