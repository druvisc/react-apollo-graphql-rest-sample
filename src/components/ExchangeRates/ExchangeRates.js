import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { formatDate } from '../../utils'
import { GET_EXCHANGE_RATES_DATE } from './queries'

const Now = new Date()
const FormattedNow = formatDate(Now)

export function ExchangeRates({ initialDate = Now }) {
  const [date, setDate] = useState(initialDate)
  const formattedDate = formatDate(date)
  const [getExchangeRates, { called, loading, error, data, refetch }] = useLazyQuery(
    GET_EXCHANGE_RATES_DATE,
    {
      variables: { date: formattedDate },
      fetchPolicy: 'network-only',
      // Re-render on network state change.
      notifyOnNetworkStatusChange: true,
    }
  )

  const incrementDate = i => {
    const d = new Date(formattedDate)
    d.setDate(d.getDate() + i)
    setDate(d)
  }

  const Buttons = () =>
    <div>
      <button name='previous' onClick={() => incrementDate(-1)}>Previous</button>
      <button name='load' onClick={() => called ? refetch() : getExchangeRates()}>Load exchange rates</button>
      <button name='next' disabled={formattedDate === FormattedNow} onClick={() => incrementDate(1)}>Next</button>
    </div>

  const Rates = () => {
    if (!called) return null
    if (loading) return <p>Loading...</p>
    if (error) return <p>Couldn't load exchange rates.</p>
    if (data.exchangeRates.date !== formattedDate) return <p>Exchange rates aren't available for {formattedDate}.</p>

    return (
      <table>
        <tbody>
          {Object.keys(data.exchangeRates.rates).map(k =>
            <tr key={k}>
              <td>{k}</td>
              <td>{data.exchangeRates.rates[k]}</td>
            </tr>)}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className='date'>{formattedDate}</div>
      <Buttons />
      <Rates />
    </>
  )
}

export default ExchangeRates

