import React from 'react'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

const GET_EXCHANGE_RATES = gql`
  query exchangeRatesQuery {
    exchangeRates @rest(type: "ExchangeRates", endpoint: "exchangerates" path: "latest/") {
      date
      base
      rates
    }
  }
`

function ExchangeRates() {
  const [
    getExchangeRates, { called, loading, error, data, refetch }
  ] = useLazyQuery(GET_EXCHANGE_RATES, {
    notifyOnNetworkStatusChange: true
  })

  const Button = () =>
    <button onClick={() => called ? refetch() : getExchangeRates()}>
      Load exchange rates
    </button>

  const Rates = () => {
    if (!called) return null
    if (loading) return <p>Loading...</p>
    if (error) return <p>Couldn't load exchange rates</p>

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
      <Button />
      <Rates />
    </>
  )
}

export default ExchangeRates

