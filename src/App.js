import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Layout from './components/layout';
import Home from './components/home';

import Counter from './tutorials/01_counter/complete';
import CounterStart from './tutorials/01_counter/start';

import Toggle from './tutorials/02_toggle/complete';
import ToggleStart from './tutorials/02_toggle/start';

import Input from './tutorials/03_input/complete';
import InputStart from './tutorials/03_input/start';

import Todo from './tutorials/04_todo/complete';

import Times from './tutorials/05_times/complete';

import NewTodo from './tutorials/06_todo2';
import Login from './tutorials/07_login';
import Calculator from './tutorials/08_calculator';
import GetUsers from './tutorials/09_getusers';
import FavoriteNumber from './tutorials/11_favorite_number';

function Lesson() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  const [currentThema, setThema] = React.useState(false);

  const palletType = currentThema ? 'dark' : 'light';

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  function handleThemaChange() {
    setThema((prevThema) => !prevThema);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Layout currentThema={currentThema} handleThemaChange={handleThemaChange}>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/counter' element={<Lesson />}>
            <Route path='complete' element={<Counter />} />
            <Route path='start' element={<CounterStart />} />
          </Route>

          <Route path='/toggle' element={<Lesson />}>
            <Route path='complete' element={<Toggle />} />
            <Route path='start' element={<ToggleStart />} />
          </Route>

          <Route path='/input' element={<Lesson />}>
            <Route path='complete' element={<Input />} />
            <Route path='start' element={<InputStart />} />
          </Route>

          <Route path='/todo' element={<Lesson />}>
            <Route path='complete' element={<Todo />} />
          </Route>

          <Route path='/times' element={<Lesson />}>
            <Route path='complete' element={<Times />} />
          </Route>

          <Route path='/newtodo' element={<Lesson />}>
            <Route path='complete' element={<NewTodo />} />
          </Route>

          <Route path='/login' element={<Lesson />}>
            <Route path='complete' element={<Login />} />
          </Route>

          <Route path='/calculator' element={<Lesson />}>
            <Route path='complete' element={<Calculator />} />
          </Route>

          <Route path='/users' element={<Lesson />}>
            <Route path='complete' element={<GetUsers />} />
          </Route>

          <Route path='/favorite_number' element={<Lesson />}>
            <Route path='complete' element={<FavoriteNumber />} />
          </Route>
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
