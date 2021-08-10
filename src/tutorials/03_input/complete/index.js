import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Wrap from '../../../components/wrap';

function Input() {
  const initialValues = {
    title: '',
    name: '',
  };

  const [values, setValues] = React.useState(initialValues);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClear = (event) => {
    event.preventDefault();

    setValues(initialValues);
  };

  return (
    <Wrap>
      <Box width='100%'>
        <Box textAlign='center'>
          <Typography
            gutterBottom={true}
            aria-label='name-heading'
            color='textPrimary'
          >
            {values.name || 'Name'}
          </Typography>
          <Typography aria-label='title-heading' color='textPrimary'>
            {values.title || 'Title'}
          </Typography>
        </Box>
        <form>
          <Box mb={1}>
            <TextField
              id='name'
              name='name'
              label='Name'
              fullWidth={true}
              onChange={handleChange}
              value={values.name}
              inputProps={{ 'aria-label': 'name-input' }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              id='title'
              name='title'
              label='Title'
              fullWidth={true}
              onChange={handleChange}
              value={values.title}
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
