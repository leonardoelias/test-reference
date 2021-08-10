import React from 'react';
import { v4 as uuid } from 'uuid';

export const initialState = [
  { id: uuid(), task: 'Ler doc. React', isDone: false },
  { id: uuid(), task: 'Ir ao mercado e comprar frutas', isDone: true },
  { id: uuid(), task: 'Ouvir uma boa música', isDone: false },
  { id: uuid(), task: 'Reunião as 14hrs', isDone: true },
];

export function useTodo({ initialTodos = [] }) {
  const [todos, setTodos] = React.useState(initialTodos);
  const [filter, setFilter] = React.useState('all');

  function addTodo(content) {
    setTodos([
      ...todos,
      {
        id: uuid(),
        task: content,
        isDone: false,
      },
    ]);
  }

  function delTodo(id) {
    setTodos(todos.filter((item) => item.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        } else {
          return item;
        }
      })
    );
  }

  function clearCompletes() {
    setTodos(todos.filter((item) => item.isDone === false));
  }

  const displayItems = todos.filter(item => {
    if (filter === 'incompled') return !item.isDone;
    if (filter === 'completed') return item.isDone;
    return item;
  });

  return {
    todos: displayItems,
    addTodo,
    delTodo,
    toggleTodo,
    clearCompletes,
    setFilter,
    filter,
  };
}
