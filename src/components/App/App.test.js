import React from 'react'
import { shallow } from 'enzyme';
import App from './App'
import ExchangeRates from '../ExchangeRates/ExchangeRates'

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })

  it('renders <ExchangeRates />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toContainReact(<ExchangeRates />)
  })
})