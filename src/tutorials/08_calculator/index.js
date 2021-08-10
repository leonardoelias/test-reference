import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Wrap from '../../components/wrap';

const useStyles = makeStyles((theme) => ({
  calculator: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(5, minmax(60px, auto))',
    gridGap: '8px',
  },
  btn: {
    minHeight: '60px',
    fontSize: '2rem',
    borderColor: theme.palette.grey[200],
  },
  display: {
    gridColumn: 'span 4',
    border: '1px solid transparent',
    borderBottomColor: theme.palette.grey[200],
    height: 100,
    fontSize: '3rem',
    padding: theme.spacing(2),
    textAlign: 'right',
  },
}));

export default function Login() {
  const classes = useStyles();
  const [display, setDisplay] = React.useState(0);
  const [operator, setOperator] = React.useState('+');

  function calcExecuted(inputValue) {
    const newValue = CalculatorOperations[operator](display, inputValue);
    setDisplay((prevDisplay) => newValue);
  }

  return (
    <Wrap>
      <div className={classes.calculator}>
        <Box className={classes.display}>{display}</Box>
        <Button
          variant='outlined'
          disableElevation
          color='secondary'
          className={classes.btn}
          style={{ gridColumn: 'span 2' }}
          onClick={() => calcExecuted(0)}
        >
          AC
        </Button>
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          onClick={() => setOperator('/')}
          className={classes.btn}
        >
          /
        </Button>
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          onClick={() => setOperator('*')}
          className={classes.btn}
        >
          *
        </Button>

        <Button
          variant='outlined'
          onClick={() => calcExecuted(7)}
          className={classes.btn}
        >
          7
        </Button>
        <Button
          variant='outlined'
          onClick={() => calcExecuted(8)}
          className={classes.btn}
        >
          8
        </Button>
        <Button
          variant='outlined'
          onClick={() => calcExecuted(9)}
          className={classes.btn}
        >
          9
        </Button>
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          onClick={() => setOperator('-')}
          className={classes.btn}
        >
          -
        </Button>

        <Button
          variant='outlined'
          className={classes.btn}
          onClick={() => calcExecuted(4)}
        >
          4
        </Button>
        <Button
          variant='outlined'
          className={classes.btn}
          onClick={() => calcExecuted(5)}
        >
          5
        </Button>
        <Button
          variant='outlined'
          className={classes.btn}
          onClick={() => calcExecuted(6)}
        >
          6
        </Button>
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          onClick={() => setOperator('+')}
          className={classes.btn}
        >
          +
        </Button>

        <Button
          variant='outlined'
          className={classes.btn}
          onClick={() => calcExecuted(1)}
        >
          1
        </Button>
        <Button
          variant='outlined'
          className={classes.btn}
          onClick={() => calcExecuted(2)}
        >
          2
        </Button>
        <Button
          variant='outlined'
          className={classes.btn}
          onClick={() => calcExecuted(3)}
        >
          3
        </Button>

        <Button
          variant='outlined'
          disableElevation
          color='primary'
          className={classes.btn}
          onClick={() => setOperator('=')}
          style={{ gridRow: 'span 2' }}
        >
          =
        </Button>

        <Button
          variant='outlined'
          className={classes.btn}
          style={{ gridColumn: 'span 2' }}
        >
          0
        </Button>
        <Button
          variant='outlined'
          disableElevation
          color='primary'
          className={classes.btn}
        >
          .
        </Button>
      </div>
    </Wrap>
  );
}

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
};

const TOP_KEYS = [
  {
    key: 'AC',
    className: 'key key--wide',
    id: 'clear',
  },
  {
    key: '/',
    className: 'key',
    id: 'divide',
  },
];
const RIGHT_KEYS = [
  {
    key: 'X',
    className: 'key',
    id: 'multiply',
  },
  {
    key: '-',
    className: 'key',
    id: 'subtract',
  },
  {
    key: '+',
    className: 'key',
    id: 'add',
  },
  {
    key: '=',
    className: 'key key--vert',
    id: 'equals',
  },
];
const MID_KEYS = [
  {
    key: 7,
    className: 'key',
    id: 'seven',
  },
  {
    key: 8,
    className: 'key',
    id: 'eight',
  },
  {
    key: 9,
    className: 'key',
    id: 'nine',
  },
  {
    key: 4,
    className: 'key',
    id: 'four',
  },
  {
    key: 5,
    className: 'key',
    id: 'five',
  },
  {
    key: 6,
    className: 'key',
    id: 'six',
  },
  {
    key: 1,
    className: 'key',
    id: 'one',
  },
  {
    key: 2,
    className: 'key',
    id: 'two',
  },
  {
    key: 3,
    className: 'key',
    id: 'three',
  },
];
const BOTTOM_KEYS = [
  {
    key: '0',
    className: 'key',
    id: 'zero',
  },
  {
    key: '.',
    className: 'key key--wide',
    id: 'decimal',
  },
];
