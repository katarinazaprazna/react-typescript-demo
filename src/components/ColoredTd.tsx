import { Td, TdProps } from '@patternfly/react-table';
import { Color } from '../api/CustomerApi';

export interface TdPropsWithColor extends Omit<TdProps, 'ref'> {
  color: Color;
}

export const ColoredTd = ({ color, ...rest }: TdPropsWithColor) => (
  <Td style={{ color }} {...rest} />
);
