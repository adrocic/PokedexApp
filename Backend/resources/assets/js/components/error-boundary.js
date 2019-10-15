import React from 'react';

const style = {
  container: {
    height: '100vh',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  content: {
    textAlign: 'center',
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={style.container}>
          <div style={style.content}>
            <h1>Hmm, something went wrong.</h1>
            <div>Please refresh the page and try again.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
