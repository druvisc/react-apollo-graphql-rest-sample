import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    // console.log(error, errorInfo)
  }

  render() {
    if (this.state.error) {
      if (this.props.errorRender) return this.props.errorRender({ ...this.props, error: this.state.error })
      return <h1>Couldn't display element.</h1>
    }

    return this.props.children
  }
}

// Sorry, Dan. 
// https://twitter.com/dan_abramov/status/890716011133100032
export const withErrorBoundary = Component =>
  class extends ErrorBoundary {
    render() {
      if (this.state.error) {
        if (this.props.errorRender) return this.props.errorRender({ ...this.props, error: this.state.error, })
        return <h1>Couldn't display element.</h1>
      }

      return <Component {...this.props} />
    }
  }
