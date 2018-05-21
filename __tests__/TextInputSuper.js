import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import TextInputSuper from '../build/components/TextInputSuper.js';
import toJson from 'enzyme-to-json';

describe('Component: TextInputSuper', () => {

  it('renders correctly', () => {
    const wrapper = shallow(
      <TextInputSuper />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  })

})