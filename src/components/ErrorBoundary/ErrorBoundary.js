import React from 'react'

class ErrorBoundary extends React.Component {
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
      if (this.props.handler) return this.props.handler(this.state.error)
      return <h1>Couldn't load {this.props.children.type.name}.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary