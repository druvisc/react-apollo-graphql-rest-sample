import React from 'react'
import { shallow } from 'enzyme';
import ErrorBoundary from './ErrorBoundary'

test('renders without crashing', () => {
  shallow(<ErrorBoundary>{` `}</ErrorBoundary>)
})
