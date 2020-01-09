import { gql } from '@apollo/client'

export const GET_EXCHANGE_RATES_LATEST = gql`
  query ExchangeRatesLatestQuery {
    exchangeRates @rest(type: "ExchangeRates", endpoint: "exchangerates" path: "latest/") {
      date
      base
      rates
    }
  }
`

export const GET_EXCHANGE_RATES_DATE = gql`
  query ExchangeRatesQuery($date: String!) {
    exchangeRates(date: $date) @rest(type: "ExchangeRates", endpoint: "exchangerates" path: "{args.date}") {
      _id: date
      date
      base
      rates
    }
  }
`
