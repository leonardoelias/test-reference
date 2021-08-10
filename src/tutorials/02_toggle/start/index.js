import React from 'react';

import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import Wrap from '../../../components/wrap';

function Toggle() {
  const [on, setOn] = React.useState(false);

  const handleChange = () => {
    return setOn((on) => !on);
  };

  return (
    <Wrap maxWidth='xs'>
      <Box width={1}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Switch
            id='lampada'
            checked={on}
            inputProps={{ 'aria-label': 'lampada' }}
            onChange={handleChange}
          />
          <Typography component='label' htmlFor='lampada' aria-label='label'>
            {on ? 'ON' : 'OFF'}
          </Typography>
        </Box>
      </Box>
    </Wrap>
  );
}

export default Toggle;
