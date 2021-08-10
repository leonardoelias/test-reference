import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import Wrap from '../../components/wrap';

function FavoriteNumber({ min = 1, max = 9 }) {
  const [number, setNumber] = React.useState(0);
  const [numberEntered, setNumberEntered] = React.useState(false);
  function handleChange(event) {
    setNumber(Number(event.target.value));
    setNumberEntered(true);
  }

  const isValid = !numberEntered || (number >= min && number <= max);

  return (
    <Wrap>
      <Box display="flex" flexDirection="column" w={1}>
        <label htmlFor='favorite-number'>Favorite Number</label>
        <TextField
          id='favorite-number'
          type='number'
          value={number}
          onChange={handleChange}
          inputProps={{ "data-testid": "content-input" }}
        />
        {isValid ? null : <div role='alert'>The number is invalid</div>}
      </Box>
    </Wrap>
  );
}

export default FavoriteNumber;
