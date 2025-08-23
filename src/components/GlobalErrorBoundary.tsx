import { Alert, Flex, FlexItem } from '@patternfly/react-core';
import { FallbackProps } from 'react-error-boundary';

const GlobalErrorBoundary = ({ error }: FallbackProps) => (
  <Flex justifyContent={{ default: 'justifyContentCenter' }}>
    <FlexItem grow={{ default: 'grow' }}>
      <Alert
        variant='danger'
        title={error?.message ? error.message : 'An unknown error occurred.'}
        ouiaId='DangerAlert'
      >
        <p>Try refreshing the page or contact support.</p>
      </Alert>
    </FlexItem>
  </Flex>
);

export default GlobalErrorBoundary;
