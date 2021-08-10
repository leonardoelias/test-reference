import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RestoreIcon from '@material-ui/icons/Restore';

import { formatTime } from './utils';
import Wrap from '../../../components/wrap';

function Times({
  initTime = 0,
  timerType = 'DECREMENTAL',
  interval = 1000,
  step = 1,
  endTime = 0,
}) {
  const [time, setTime] = React.useState(initTime);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isTimeOver, setIsTimeOver] = React.useState(false);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsTimeOver(false);
    setTime(initTime);
  }, [initTime]);

  const start = useCallback(() => {
    if (isTimeOver) {
      reset();
    }

    setIsRunning(true);
  }, [reset, isTimeOver]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const startOrPause = () => {
    !isRunning ? start() : pause();
  };

  const addMinute = () => {
    setTime((previousTime) => previousTime + 60);
  };

  const addSeconds = () => {
    setTime((previousTime) => previousTime + 1);
  };

  React.useEffect(() => {
    if (isRunning && time === endTime) {
      setIsRunning(false);
      setIsTimeOver(true);
    }
  }, [endTime, time, isRunning]);

  React.useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((previousTime) => previousTime - step);
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, step, timerType, interval]);

  const canIncrementDecremenTime = isRunning;
  const canStart = time <= 0;

  return (
    <Wrap>
      <Box display='flex' flexDirection='column' width={1}>
        <Time seconds={time} />
        <Box display='flex' width={1} justifyContent='space-between'>
          <ButtonTime
            aria-label='min-button'
            onClick={addMinute}
            disabled={canIncrementDecremenTime}
          >
            Min
          </ButtonTime>
          <ButtonTime
            aria-label='sec-button'
            onClick={addSeconds}
            disabled={canIncrementDecremenTime}
          >
            Sec
          </ButtonTime>
          <ButtonTime
            aria-label='startPause-button'
            onClick={startOrPause}
            disabled={canStart}
          >
            {!isRunning ? 'Start' : 'Pause'}
          </ButtonTime>
          <ButtonTime aria-label='reset-button' onClick={reset}>
            <RestoreIcon />
          </ButtonTime>
        </Box>
      </Box>
    </Wrap>
  );
}

function Time({ seconds }) {
  return (
    <Box
      display='flex'
      textAlign='center'
      width={1}
      pt={1}
      pb={2}
      justifyContent='center'
    >
      <Typography
        variant='h3'
        component='h2'
        aria-label='time'
        color='textPrimary'
      >
        {formatTime(seconds)}
      </Typography>
    </Box>
  );
}

function ButtonTime({ children, ...props }) {
  return (
    <Button variant='contained' color='primary' disableElevation {...props}>
      {children}
    </Button>
  );
}

export default Times;
