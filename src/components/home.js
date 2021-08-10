import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Wrap from './wrap';

function HomeLink({ name, link }) {
  return (
    <Box mb={1} component='li'>
      <Typography variant='body'>{name}</Typography>
      {` / `}
      <Link to={`${link}/start`} component={LinkRouter}>
        Start
      </Link>
      {` / `}
      <Link to={`${link}/complete`} component={LinkRouter}>
        Complete
      </Link>
    </Box>
  );
}

function Home() {
  return (
    <Wrap>
      <Box display='flex' flexDirection='column'>
        <Box mb={3}>
          <Typography variant='h4' component='h1'>
            Home Tutorials
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' component='ol' m={0} pl={2}>
          <HomeLink name='counter' link='counter' />
          <HomeLink name='toggle' link='toggle' />
          <HomeLink name='input' link='input' />
          <HomeLink name='todo' link='todo' />
          <HomeLink name='times' link='times' />
          <HomeLink name='newtodo' link='newtodo' />
          <HomeLink name='login' link='login' />
          <HomeLink name='calculator' link='calculator' />
          <HomeLink name='users' link='users' />
          <HomeLink name='dog' link='dog' />
          <HomeLink name='favoritenumber' link='favorite_number' />
        </Box>
      </Box>
    </Wrap>
  );
}

export default Home;
