import React from 'react'
import { shallow } from 'enzyme';
import ExchangeRates from './ExchangeRates'

test('renders without crashing', () => {
  shallow(<ExchangeRates />)
})