import React from 'react';
import { v4 as uuid } from 'uuid';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Close from '@material-ui/icons/Close';

import Wrap from '../../../components/wrap';

function Todo() {
  const [data, dispatch] = React.useReducer(todosReducer, initialTodos);
  const [filter, setFilter] = React.useState(FILTERED_ALL);

  const editTodo = (e, todoId) => {
    const newTodo = e.target.value;

    dispatch({ type: EDIT, todoId, newTodo });
  };

  const handleChange = (todoId) => {
    dispatch({ type: TOGGLE, todoId });
  };

  const handleClear = () => {
    dispatch({ type: CLEAR });
  };

  const handleRemove = (todoId) => {
    dispatch({ type: REMOVE, todoId });
  };

  const filteredTodo = () => {
    return data.filter((item) => {
      if (filter === FILTERED_INCOMPLETE) {
        return !item.completed;
      }
      if (filter === FILTERED_COMPLETE) {
        return item.completed;
      }
      return item;
    });
  };

  const canAll = filter === FILTERED_ALL;
  const canComplete = filter === FILTERED_COMPLETE;
  const canIncomplete = filter === FILTERED_INCOMPLETE;

  return (
    <Wrap maxWidth='xs' data-testid="container">
      <Box display='flex' width='100%'>
        <Box display='flex' flexDirection='column' flex={1} width={1}>
          <ButtonTodo
            color='primary'
            variant='contained'
            onClick={() => dispatch({ type: ADD })}
          >
            Add Todo
          </ButtonTodo>
          <ButtonTodo disabled={canAll} onClick={() => setFilter(FILTERED_ALL)}>
            All
          </ButtonTodo>
          <ButtonTodo
            disabled={canIncomplete}
            onClick={() => setFilter(FILTERED_INCOMPLETE)}
          >
            Incomplete
          </ButtonTodo>
          <ButtonTodo
            disabled={canComplete}
            onClick={() => setFilter(FILTERED_COMPLETE)}
          >
            Complete
          </ButtonTodo>
          <ButtonTodo
            color='secondary'
            variant='contained'
            onClick={handleClear}
          >
            Clear
          </ButtonTodo>
        </Box>
        <Box flex={2} width={1} pl={2}>
          {filteredTodo().map(({ id, task, isEditing, completed }) => (
            <Box data-testid="todo-item" display='flex' key={id}>
              {isEditing ? (
                <IconButton size='small' onClick={() => handleRemove(id)}>
                  <Close />
                </IconButton>
              ) : (
                <Checkbox
                  checked={completed}
                  size='small'
                  onChange={() => handleChange(id)}
                />
              )}
              <TextField
                fullWidth={true}
                value={task}
                disabled={completed}
                onChange={(e) => editTodo(e, id)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Wrap>
  );
}

function ButtonTodo({ children, ...props }) {
  return (
    <Button fullWidth={true} disableElevation {...props}>
      {children}
    </Button>
  );
}

const ADD = 'ADD_TODO';
const REMOVE = 'REMOVE_TODO';
const TOGGLE = 'TOGGLE_TODO';
const EDIT = 'EDIT_TODO';
const CLEAR = 'CLEAR_TODO';

const FILTERED_ALL = 'FILTERED_ALL_TODO';
const FILTERED_INCOMPLETE = 'FILTERED_INCOMPLETE_TODO';
const FILTERED_COMPLETE = 'FILTERED_COMPLETE_TODO';

const initialTodos = [
  { id: uuid(), task: 'React', completed: false, isEditing: false },
  { id: uuid(), task: 'Vue', completed: false, isEditing: false },
];

function isEmpty(str) {
  return !str || 0 === str.length;
}

const todosReducer = (todos = initialTodos, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...todos,
        { id: uuid(), task: '', completed: false, isEditing: true },
      ];
    case REMOVE:
      return todos.filter((todo) => todo.id !== action.todoId);
    case TOGGLE:
      return todos.map((todo) =>
        todo.id === action.todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case EDIT:
      const isEditing = isEmpty(action.newTodo);

      return todos.map((todo) => {
        return todo.id === action.todoId
          ? { ...todo, task: action.newTodo, isEditing }
          : todo;
      });
    case CLEAR:
      return [];
    default:
      return todos;
  }
};

export default Todo;
