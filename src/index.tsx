import './index.css';
import '@patternfly/react-core/dist/styles/base.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

// Any child component that throws a 500+ error will be caught by GlobalErrorBoundary
import App from './App';
import { AppContextProvider } from './middleware';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

const queryClient = new QueryClient();

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContextProvider>
          <ErrorBoundary FallbackComponent={GlobalErrorBoundary}>
            <App />
          </ErrorBoundary>
        </AppContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root'),
);
