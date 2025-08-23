import { callAPI } from './apiUtilities';

export const choosableColors = ['red', 'pink', 'rebeccapurple', 'grey'] as const;

export type Color = (typeof choosableColors)[number];

export const DEFAULT_COLOR: Color = 'pink';

// Define a type guard for Color
export const isColor = (value): value is Color => choosableColors.includes(value);

export interface Customer {
  name: string;
  color: Color;
  age: number;
  isCool: boolean;
}

export type Customers = Array<Customer>;

// Local storage "DAO layer" Getter/Setters
export const customersSetter = (customers: Customers | undefined) => {
  localStorage.setItem('customers', JSON.stringify(customers));
  return customers;
};

export const customersGetter = (): Customers => {
  const customers = localStorage.getItem('customers');
  if (customers) return [...JSON.parse(customers)];
  return [];
};

const addNewCustomer = (customer: Customer) => {
  const customers = customersGetter();
  customers.push(customer);
  return customersSetter(customers);
};

const removeCustomer = (customerName: string, customerAge: number) => {
  const customers = customersGetter().filter(
    (customer) => customer.name !== customerName || customer.age !== customerAge,
  );
  return customersSetter(customers);
};

// Super real API calls
export const getCustomers = () => callAPI(customersGetter, 0.7);

export const postCustomers = (customers: Array<Customer> | undefined) => () =>
  callAPI(() => customersSetter(customers));

export const postNewCustomer = (customer: Customer) => callAPI(() => addNewCustomer(customer));

export const deleteCustomer = (customerName: string, customerAge: number) =>
  callAPI(() => removeCustomer(customerName, customerAge));
