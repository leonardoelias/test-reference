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
            onChange={handleChange}
            inputProps={{ 'aria-label': 'lampada' }}
          />
          <Typography
            component='label'
            htmlFor='lampada'
            color='textPrimary'
            aria-label='label'
          >
            Lampada está: {on ? 'ON' : 'OFF'}
          </Typography>
        </Box>
      </Box>
    </Wrap>
  );
}

export default Toggle;
