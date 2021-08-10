import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import Wrap from '../../../components/wrap';

function Counter() {
  const [count, setCount] = React.useState(0);

  const countIsAtMin = count > 0;

  const increment = () => countIsAtMin && setCount((count) => count - 1);
  const decrement = () => setCount((count) => count + 1);

  return (
    <Wrap maxWidth='xs'>
      <IconButton
        variant='contained'
        color='primary'
        aria-label='increase'
        onClick={increment}
        disabled={!countIsAtMin}
      >
        <RemoveIcon />
      </IconButton>
      <Typography
        variant='h4'
        component='p'
        color='textPrimary'
        aria-label='count'
      >
        {count}
      </Typography>
      <IconButton
        variant='contained'
        color='primary'
        aria-label='decrease'
        onClick={decrement}
      >
        <AddIcon />
      </IconButton>
    </Wrap>
  );
}

export default Counter;
