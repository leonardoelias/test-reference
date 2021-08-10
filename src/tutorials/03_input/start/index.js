import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Wrap from '../../../components/wrap';

function Input() {
  const [values, setValues] = React.useState({
    title: '',
    name: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleClear = (event) => {
    event.preventDefault();

    setValues({
      title: '',
      name: '',
    })

  };

  return (
    <Wrap>
      <Box width='100%' className="banana">
        <Box textAlign='center'>
          <Typography gutterBottom={true} aria-label='name-heading'>
            {values.name || 'Name'}
          </Typography>
          <Typography aria-label='title-heading'>{values.title || 'Title'}</Typography>
        </Box>
        <form>
          <Box mb={1}>
            <TextField
              id='name'
              name='name'
              label='Name'
              fullWidth={true}
              value={values.name}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'name-input' }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              id='title'
              name='title'
              label='Title'
              fullWidth={true}
              value={values.title}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'title-input' }}
            />
          </Box>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            fullWidth={true}
            onClick={handleClear}
            aria-label='clear'
          >
            CLEAR
          </Button>
        </form>
      </Box>
    </Wrap>
  );
}

export default Input;
