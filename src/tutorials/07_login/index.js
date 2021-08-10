import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import serializeForm from 'form-serialize';
import validate from 'validate.js';

import Wrap from '../../components/wrap';

import { clientLogin } from './api';
import { useStyles } from './styles';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'é necessario' },
    email: { message: 'incorreto' },
  },
  password: {
    presence: { allowEmpty: false, message: 'é necessario' },
    length: {
      maximum: 128,
    },
  },
};

function If({ children, test }) { return test ? children : false };
function Either({ children, test, falseComponent }) { return test ? children : falseComponent };

function ToggleViewPassword({ onClick, showPassword }) {
  return (
    <InputAdornment position='end'>
      <IconButton
        data-testid='show-password-button'
        aria-label='Show password as plain text. Warning: this will display your password on the screen.'
        onClick={onClick}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
}

export default function Login() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formState, setFormState] = React.useState({
    isValid: false,
    errors: {},
    isSubmitting: false,
  });

  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const formRef = React.useRef();

  function handleClickShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setFormState((formState) => ({
      ...formState,
      isSubmitting: true,
    }));

    const values = serializeForm(event.target, { hash: true });
    const errors = validate(values, schema);

    if (errors) {
      setFormState((formState) => ({
        ...formState,
        isValid: true,
        isSubmitting: false,
        errors,
      }));

      return;
    }

    clientLogin(values).then((res) => {
      setToken(res.token)
      setFormState((formState) => ({
        ...formState,
        isSubmitting: false,
      }));
    }).catch(({ error }) => {
      setError(error);
      setFormState((formState) => ({
        ...formState,
        isSubmitting: false,
      }));
    });
  }

  const hasError = (field) => (formState.errors[field] ? true : false);

  return (
    <Wrap>
      <Box display='flex' flexDirection='column'>
        <Typography variant='h5' gutterBottom={true}>
          Login
        </Typography>
          {
            token ?
              <Box w={1}>
                Token: { token }
              </Box>
            :
          <form className={classes.form} ref={formRef} onSubmit={handleSubmit}>
            <FormControl className={classes.textField}>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <Input
                error={hasError('email')}
                // type='email'
                name='email'
                id='email'
                inputProps={{ 'aria-label': 'email-input' }}
                // defaultValue="eve.holt@reqres.in"
              />
              <FormHelperText error={hasError('email')}>
                {hasError('email') ? formState.errors.email[0] : null}
              </FormHelperText>
            </FormControl>

            <FormControl className={classes.textField}>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                error={hasError('password')}
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                inputProps={{ 'aria-label': 'password-input' }}
                // defaultValue="cityslicka"
                endAdornment={
                  <ToggleViewPassword
                    onClick={handleClickShowPassword}
                    showPassword={showPassword}
                  />
                }
              />
              <FormHelperText error={hasError('password')}>
                {hasError('password') ? formState.errors.password[0] : null}
              </FormHelperText>
            </FormControl>

            <If test={error}>
              <Box>
                <span>{error}</span>
              </Box>
            </If>

            <Box w={1}>
              <Button
                fullWidth={true}
                variant='contained'
                color='primary'
                disableElevation
                type='submit'
                aria-label='submit-button'
                disabled={formState.isSubmitting}
              >
                Login
              </Button>
            </Box>
          </form>
          }
      </Box>
    </Wrap>
  );
}
