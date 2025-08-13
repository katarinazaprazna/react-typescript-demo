import { ComponentPropsWithoutRef } from 'react';
import { Button } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { snazzyButtonStyle } from './helpers';

interface SnazzyButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  isSnazzy?: boolean;
}

const useStyles = createUseStyles({
  isSnazzy: {
    ...snazzyButtonStyle,
  },
});

export default ({ isSnazzy = true, children, ...rest }: SnazzyButtonProps) => {
  const classes = useStyles();

  return (
    <Button className={isSnazzy ? classes.isSnazzy : ''} {...rest}>
      {children}
    </Button>
  );
};
