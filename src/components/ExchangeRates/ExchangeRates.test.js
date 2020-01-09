import React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'
import ExchangeRates from './ExchangeRates'
import { GET_EXCHANGE_RATES_DATE } from './queries'
import { formatDate } from '../../utils'

const Now = new Date()
const FormattedNow = formatDate(Now)
const Weekday = new Date(2020, 0, 9)
const FormattedWeekday = formatDate(Weekday)
const Weekend = new Date(2020, 0, 5)
const FormattedWeekend = formatDate(Weekend)

const mocks = {
  error: {
    request: {
      query: GET_EXCHANGE_RATES_DATE
    },
    error: new Error()
  },
  weekend: {
    request: {
      query: GET_EXCHANGE_RATES_DATE,
      variables: { date: FormattedWeekend }
    },
    result: {
      data: {
        exchangeRates: {
          date: 'Not Weekend',
          base: 'EUR',
          rates: {
            HKD: 8.6836
          }
        }
      }
    }
  },
  weekday: {
    request: {
      query: GET_EXCHANGE_RATES_DATE,
      variables: { date: FormattedWeekday }
    },
    result: {
      data: {
        exchangeRates: {
          date: FormattedWeekday,
          base: 'EUR',
          rates: {
            HKD: 8.6836
          }
        }
      }
    }
  },
}

const wait = () => new Promise(res => setTimeout(res, 1))

describe('<ExchangeRates />', () => {
  it('renders !called state', () => {
    const wrapper = mount(<ExchangeRates />)
    expect(wrapper).toHaveHTML(
      `<div class="date">${FormattedNow}</div><div><button name="previous">Previous</button><button name="load">Load exchange rates</button><button name="next" disabled="">Next</button></div>`
    )
  })

  it('renders loading state', () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.weekday]} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button[name="load"]').simulate('click')
    expect(wrapper.find('Rates')).toHaveHTML('<p>Loading...</p>')
  })

  it('renders error state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.error]} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button[name="load"]').simulate('click')
    await wait()
    wrapper.update()

    expect(wrapper.find('Rates')).toHaveHTML('<p>Couldn\'t load exchange rates.</p>')
  })


  it('renders different date state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.weekend]} addTypename={false}>
        <ExchangeRates initialDate={Weekend} />
      </MockedProvider>
    )

    wrapper.find('button[name="load"]').simulate('click')
    await wait()
    wrapper.update()

    expect(wrapper.find('Rates')).toHaveHTML(`<p>Exchange rates aren't available for ${FormattedWeekend}.</p>`)
  })

  it('renders data state', async () => {
    const wrapper = mount(
      <MockedProvider mocks={[mocks.weekday]} addTypename={false}>
        <ExchangeRates />
      </MockedProvider>
    )

    wrapper.find('button[name="load"]').simulate('click')
    await wait()
    wrapper.update()

    expect(wrapper.find('Rates')).toHaveHTML('<table><tbody><tr><td>HKD</td><td>8.6836</td></tr></tbody></table>')
  })
})
