import { Button, Grid, GridItem, Text } from '@patternfly/react-core';
import {
  Caption,
  TableComposable,
  Tbody,
  Th,
  Thead,
  Tr,
  IAction,
  Td,
  ActionsColumn,
} from '@patternfly/react-table';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Customers, deleteCustomer, getCustomers } from 'src/api/CustomerApi';
import { ColoredTd } from 'src/components/ColoredTd';
import Loader from 'src/components/Loader';
import { useAppContext } from 'src/middleware';
import SnazzyButton from 'src/components/SnazzyButton';
import { useState } from 'react';
import AddNewCustomerModal from 'src/components/AddNewCustomerModal';
import { createUseStyles } from 'react-jss';
import { ServerError } from 'src/api/apiUtilities';

const useStyles = createUseStyles({
  tableWithDarkMode: {
    background: '#333',
    color: 'white',
  },
});

export default () => {
  const { setDarkmode, darkmode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Queries
  const customersListKey = ['customers', 'list'];
  const { isLoading, data, isError, error } = useQuery<Customers, ServerError>(
    customersListKey,
    getCustomers,
    // React Query re-throws the error to be caught by the nearest parent error boundary
    { useErrorBoundary: (error) => error.status >= 500 },
  );

  const deleteCustomerMutation = useMutation(
    ({ name, age }: { name: string; age: number }) => deleteCustomer(name, age),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(customersListKey);
      },
    },
  );

  const columnHeaders = ['Name', 'Age', 'Is Cool'];

  const actions = (customerName: string, customerAge: number): IAction[] => [
    {
      title: 'Delete',
      isDisabled: deleteCustomerMutation.isLoading,
      onClick: () => deleteCustomerMutation.mutate({ name: customerName, age: customerAge }),
    },
  ];

  const classes = useStyles();

  return (
    <Grid>
      <GridItem sm={6}>
        <Button onClick={() => setDarkmode(!darkmode)} variant='secondary'>
          {darkmode ? 'LightMode' : 'DarkMode'}
        </Button>
      </GridItem>
      <GridItem sm={6}>
        <SnazzyButton onClick={() => setIsModalOpen(true)} variant='secondary'>
          Add New Customer
        </SnazzyButton>
      </GridItem>
      <AddNewCustomerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Grid>
        {isLoading ? (
          <Loader />
        ) : // Handle local error (e.g., 4xx) directly in the component
        isError && error.status < 500 ? (
          <Text component='p' style={{ color: 'red' }}>
            Failed to load customers.
          </Text>
        ) : (
          <TableComposable
            aria-label='Simple table'
            variant='compact'
            className={darkmode ? classes.tableWithDarkMode : undefined}
          >
            <Caption>Here is a list of your customers:</Caption>
            <Thead>
              <Tr>
                {columnHeaders.map((columnHeader) => (
                  <Th key={columnHeader}>{columnHeader}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data ? (
                data.map(({ name, age, color, isCool }, key: number) => (
                  <Tr key={`${name}-${key}`}>
                    <ColoredTd color={color} dataLabel='name'>
                      {name}
                    </ColoredTd>
                    <ColoredTd color={color} dataLabel='age'>
                      {age}
                    </ColoredTd>
                    <ColoredTd color={color} dataLabel='isCool'>
                      {isCool ? 'Yup' : 'Totally Not!'}
                    </ColoredTd>
                    <Td isActionCell>
                      <ActionsColumn items={actions(name, age)} />
                    </Td>
                  </Tr>
                ))
              ) : (
                <Text component='p'>No customers.</Text>
              )}
            </Tbody>
          </TableComposable>
        )}
      </Grid>
    </Grid>
  );
};
