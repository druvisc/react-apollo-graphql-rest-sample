import React from 'react'
import { mount, render } from 'enzyme'
// import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import ExchangeRates, { GET_EXCHANGE_RATES } from './ExchangeRates'

const mocks = [
  {
    request: {
      query: GET_EXCHANGE_RATES,
    },
    result: {
      data: {
        rates: {
          HKD: 8.6836,
        },
        base: 'EUR',
        date: '2020-01-07'
      }
    }
  },
  {
    request: {
      query: GET_EXCHANGE_RATES,
    },
    error: new Error('Oops')
  }
]

describe('<ExchangeRates />', () => {
  it('renders without crashing', () => {
    mount(<ExchangeRates />)
  })

  it('renders only button', () => {
    const wrapper = render(<ExchangeRates />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders loading state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button').simulate('click')
    // expect(wrapper).toMatchSnapshot()
  })
})
