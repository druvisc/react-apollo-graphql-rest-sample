import React from 'react'
import { mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary'

const Throw = () => { throw new Error() }

describe('<ErrorBoundary />', () => {
  it('renders state.error', () => {
    const wrapper = mount(<ErrorBoundary><Throw /></ErrorBoundary>)
    expect(wrapper).toHaveHTML('<h1>Couldn\'t display element.</h1>')
  })

  it('renders props.errorRender', () => {
    const errorRender = ({ error }) => 'Error'
    const wrapper = mount(<ErrorBoundary errorRender={errorRender}><Throw /></ErrorBoundary>)
    expect(wrapper).toHaveHTML('Error')
  })

  it('renders props.children', () => {
    const Children = ({ childrenProp }) => <div>{childrenProp}</div>
    const wrapper = mount(<ErrorBoundary><Children childrenProp={'123'} /></ErrorBoundary>)
    expect(wrapper).toHaveHTML('<div>123</div>')
  })
})