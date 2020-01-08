import React from 'react'
import { mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary'

describe('<ErrorBoundary />', () => {
  it('renders props.children', () => {
    const Children = () => <div>Children</div>
    const wrapper = mount(<ErrorBoundary><Children /></ErrorBoundary>)
    expect(wrapper).toContainReact(<Children />)
  })

  it('renders default error', () => {
    const Throw = () => { throw new Error() }
    const wrapper = mount(<ErrorBoundary><Throw /></ErrorBoundary>)
    expect(wrapper).toContainReact(<h1>Couldn't display element.</h1>)
  })

  it('renders handler', () => {
    const Throw = () => { throw new Error() }
    const handler = e => 'Hello'
    const wrapper = mount(<ErrorBoundary handler={handler}><Throw /></ErrorBoundary>)
    expect(wrapper).toHaveHTML(handler())
  })
})