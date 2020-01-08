import React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'
import ExchangeRates, { GET_EXCHANGE_RATES } from './ExchangeRates'

const mocks = {
  data: {
    request: {
      query: GET_EXCHANGE_RATES,
    },
    result: {
      data: {
        exchangeRates: {
          date: '2020-01-07',
          base: 'EUR',
          rates: {
            HKD: 8.6836,
          },
        }
      }
    }
  },
  error: {
    request: {
      query: GET_EXCHANGE_RATES,
    },
    error: new Error()
  }
}

const waitForData = () => new Promise(res => setTimeout(res, 1))

describe('<ExchangeRates />', () => {
  it('renders !called state', () => {
    const wrapper = mount(<ExchangeRates />)
    expect(wrapper).toHaveHTML('<button>Load exchange rates</button>')
  })

  it('renders loading state', () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.data]} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button').simulate('click')

    expect(wrapper.find('Button')).toHaveHTML('<button>Load exchange rates</button>')
    expect(wrapper.find('Rates')).toHaveHTML('<p>Loading...</p>')
  })

  it('renders error state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.error]} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button').simulate('click')
    await waitForData()
    wrapper.update()

    expect(wrapper.find('Button')).toHaveHTML('<button>Load exchange rates</button>')
    expect(wrapper.find('Rates')).toHaveHTML('<p>Couldn\'t load exchange rates</p>')
  })

  it('renders data state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.data]} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button').simulate('click')
    await waitForData()
    wrapper.update()

    expect(wrapper.find('Button')).toHaveHTML('<button>Load exchange rates</button>')
    expect(wrapper.find('Rates')).toHaveHTML('<table><tbody><tr><td>HKD</td><td>8.6836</td></tr></tbody></table>')
  })
})
