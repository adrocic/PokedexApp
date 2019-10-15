import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from 'components/error-boundary';
import enUS from 'antd/lib/locale-provider/en_US';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocaleProvider } from 'antd';

export function render (Component) {
  ReactDOM.render(
    <ErrorBoundary>
      <LocaleProvider locale={enUS}>
        <Router>
          <Component />
        </Router>
      </LocaleProvider>
    </ErrorBoundary>,
    document.getElementById('root')
  );
}
