import React from 'react';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DeleteIcon from '@material-ui/icons/Delete';

import Wrap from '../../components/wrap';
import { initialState, useTodo } from './useTodo';

function isEmpty(str) {
  return !str || 0 === str.trim().length;
}

function Todo({ initialTodos = initialState }) {
  const {
    todos,
    delTodo,
    addTodo,
    toggleTodo,
    clearCompletes,
    setFilter,
  } = useTodo({
    initialTodos,
  });

  const [value, setValue] = React.useState('all');
  const [field, setField] = React.useState('');

  const handleChange = (event, newValue) => {
    setFilter(newValue);
    setValue(newValue);
  };

  const handleAdd = () => {
    if (!isEmpty(field)) {
      addTodo(field);
      setField('');
    }
  };

  return (
    <Wrap maxWidth='sm'>
      <Box display='flex' flexDirection='column' width={1}>
        <Typography variant='h5'>
          <span role='img' aria-labelledby='react' mr={1}>
            ⚛️
          </span>
          {` `}
          React ToDo
        </Typography>
        <Box display='flex' w='1' mt={2}>
          <TextField
            fullWidth={true}
            variant='outlined'
            size='small'
            label='Enter to add'
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='tabs in todo'
          variant='fullWidth'
        >
          <Tab
            label='Todos'
            value='all'
            aria-label='todos'
            data-testid='todo'
          />
          <Tab
            label='Completo'
            value='completed'
            aria-label='completo'
            data-testid='completed'
          />
          <Tab
            label='Incompleto'
            value='incompled'
            aria-label='incompleto'
            data-testid='incompled'
          />
        </Tabs>
        <Box w='1' mb={1} data-testid='container-todo'>
          <List role='list'>
            {todos.map((value) => (
              <ListItem
                dense
                button
                key={value.id}
                onClick={() => toggleTodo(value.id)}
                data-testid='listitem'
                role='listitem'
              >
                <ListItemIcon style={{ minWidth: '0' }}>
                  <Checkbox
                    edge='start'
                    tabIndex={-1}
                    disableRipple
                    checked={value.isDone}
                    data-testid='listitem-checkbox'
                    inputProps={{
                      'aria-labelledby': `checkbox-list-label-${value.id}`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={value.task}
                  primaryTypographyProps={{
                    style: {
                      textDecoration: value.isDone ? 'line-through' : 'none',
                    },
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    data-testid='delete'
                    onClick={() => delTodo(value.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box w='1'>
          <Button
            fullWidth={true}
            variant='contained'
            color='primary'
            disableElevation
            onClick={() => clearCompletes()}
          >
            LIMPAR COMPLETOS
          </Button>
        </Box>
      </Box>
    </Wrap>
  );
}

export default Todo;
