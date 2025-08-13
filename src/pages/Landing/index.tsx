import { Button, Grid, GridItem, Text } from '@patternfly/react-core';
import { Caption, TableComposable, Tbody, Th, Thead, Tr } from '@patternfly/react-table';
import { useQuery } from 'react-query';
import { getCustomers } from 'src/api/CustomerApi';
import { ColoredTd } from 'src/components/ColoredTd';
import Loader from 'src/components/Loader';
import { useAppContext } from 'src/middleware';
import SnazzyButton from 'src/components/SnazzyButton';
import { useState } from 'react';
import AddNewCustomerModal from 'src/components/AddNewCustomerModal';

export default () => {
  const { setDarkmode, darkmode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Queries
  const { isLoading, data, isError } = useQuery(['customers', 'list'], getCustomers);

  const columnHeaders = ['Name', 'Age', 'Is Cool'];

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
        ) : isError ? (
          <Text component='p' style={{ color: 'red' }}>
            Failed to load customers.
          </Text>
        ) : (
          <TableComposable aria-label='Simple table' variant='compact'>
            <Caption>Here is a list of your customers:</Caption>
            <Thead>
              <Tr>
                {columnHeaders.map((columnHeader) => (
                  <Th key={columnHeader}>{columnHeader}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(({ name, age, color, isCool }, key: number) => (
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
                </Tr>
              ))}
            </Tbody>
          </TableComposable>
        )}
      </Grid>
    </Grid>
  );
};
