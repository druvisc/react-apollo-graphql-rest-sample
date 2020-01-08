import React from 'react'
import { mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary'

const Throw = () => { throw new Error() }

describe('<ErrorBoundary />', () => {
  it('renders state.error', () => {
    const wrapper = mount(<ErrorBoundary><Throw /></ErrorBoundary>)
    expect(wrapper).toHaveHTML('<h1>Couldn\'t display element.</h1>')
  })

  it('renders props.handler', () => {
    const handler = err => 'Hello'
    const wrapper = mount(<ErrorBoundary handler={handler}><Throw /></ErrorBoundary>)
    expect(wrapper).toHaveHTML('Hello')
  })

  it('renders props.children', () => {
    const Children = () => <div>Children</div>
    const wrapper = mount(<ErrorBoundary><Children /></ErrorBoundary>)
    expect(wrapper).toHaveHTML('<div>Children</div>')
  })
})