import React from 'react';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';

import { Link as LinkRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const links = [
  { to: '/counter', text: 'Counter' },
  { to: '/toggle', text: 'Toggle' },
  { to: '/input', text: 'Input' },
  { to: '/todo', text: 'Todo' },
  { to: '/times', text: 'Times' },
  { to: '/newtodo', text: 'newtodo' },
  { to: '/login', text: 'login' },
  { to: '/calculator', text: 'calculator' },
  { to: '/users', text: 'users' },
  { to: '/dog', text: 'dog' },
  { to: '/favorite_number', text: 'favoritenumber' },
];

function Layout({ children, currentThema, handleThemaChange }) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => () => {
    setState((prev) => !prev);
  };

  return (
    <>
      <Box
        width='100vw'
        height='100vh'
        bgcolor={!currentThema ? 'grey.50' : 'grey.900'}
        padding={3}
      >
        <Box display='flex' justifyContent='space-between'>
          <IconButton onClick={toggleDrawer()} color="secondary">
            <MenuIcon />
          </IconButton>
          <Switch
            id='lampada'
            checked={currentThema}
            onChange={handleThemaChange}
            inputProps={{ 'aria-label': 'lampada' }}
          />
        </Box>
        {children}
      </Box>

      <Drawer anchor='left' open={state} onClose={toggleDrawer()}>
        <List>
          <ListItem>
            <Link to='/' component={LinkRouter}>
              Home
            </Link>
          </ListItem>
          <Divider />
          {links.map(({ to, text }) => (
            <React.Fragment key={`links_${to}_${text}`}>
              <ListItem>
                {text}
                {` / `}
                <Link to={`${to}/start`} component={LinkRouter}>
                  Start
                </Link>
                {` / `}
                <Link to={`${to}/complete`} component={LinkRouter}>
                  Complete
                </Link>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Layout;
