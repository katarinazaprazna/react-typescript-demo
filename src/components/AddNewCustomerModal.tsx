import {
  Button,
  Checkbox,
  Form,
  Grid,
  Modal,
  ModalVariant,
  Select,
  SelectDirection,
  SelectOption,
  SelectVariant,
  Text,
  TextInput,
} from '@patternfly/react-core';
import { FormEvent, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useMutation, useQueryClient } from 'react-query';
import {
  Customer,
  isColor,
  choosableColors,
  postNewCustomer,
  DEFAULT_COLOR,
} from 'src/api/CustomerApi';

const useStyles = createUseStyles({
  inlineText: {
    display: 'block',
  },
});

interface AddNewCustomerModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default ({ isModalOpen, setIsModalOpen }: AddNewCustomerModalProps) => {
  const [newUser, setNewUser] = useState<Partial<Customer>>({ isCool: false });
  const [selectToggle, setSelectToggle] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation((customer: Customer) => postNewCustomer(customer), {
    onSuccess: () => {
      void queryClient.invalidateQueries(['customers', 'list']); // This causes the query to refetch and show the new customer
      setIsModalOpen(false);
    },
  });

  const onSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    mutation.mutate({
      // This prevents null or undefined values from potentially causing errors in the database
      name: newUser.name || 'Unknown',
      age: newUser.age && !isNaN(Number(newUser.age)) ? Number(newUser.age) : 0,
      color: newUser.color || DEFAULT_COLOR,
      isCool: Boolean(newUser.isCool),
    });
  };

  const classes = useStyles();

  return (
    <Modal
      variant={ModalVariant.small}
      title='Add Customer'
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <Form onSubmit={onSubmit}>
        <Grid className={classes.inlineText}>
          <Text>Name</Text>
          <TextInput
            onChange={(value) => setNewUser({ ...newUser, name: value })}
            value={newUser.name || ''}
            id='name'
            type='text'
          />
        </Grid>
        <Grid className={classes.inlineText}>
          <Text>Age</Text>
          <TextInput
            onChange={(value) => setNewUser({ ...newUser, age: Number(value) })}
            value={newUser.age || ''}
            id='age'
            type='number'
          />
        </Grid>
        <Grid className={classes.inlineText}>
          <Text>Color</Text>
          <Select
            onToggle={() => setSelectToggle(!selectToggle)}
            isOpen={selectToggle}
            onSelect={(_e, value) => {
              if (isColor(value)) setNewUser({ ...newUser, color: value });
              setSelectToggle(false);
            }}
            id='color'
            variant={SelectVariant.single}
            placeholderText='Select a color'
            selections={newUser?.color}
            direction={SelectDirection.up}
          >
            {choosableColors.map((color: string, index) => (
              <SelectOption style={{ color }} key={index} value={color} />
            ))}
          </Select>
        </Grid>
        <Checkbox
          label='Is this person cool?'
          id='isCool'
          onChange={(value) => setNewUser({ ...newUser, isCool: value })}
          isChecked={newUser.isCool}
        />
        <Button type='submit' isDisabled={mutation.isLoading}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
};
