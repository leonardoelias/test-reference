import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import Times from './index';

const setup = () => {
  const utils = render(<Times />);

  const components = {
    minute: utils.getByLabelText('min-button'),
    second: utils.getByLabelText('sec-button'),
    reset: utils.getByLabelText('reset-button'),
    startButton: utils.getByLabelText('startPause-button'),
    time: utils.getByLabelText('time'),
  };

  return {
    components,
    ...utils,
  };
};

test('It should mount the component', () => {
  const utils = setup();

  expect(utils.container).toBeInTheDocument();
});

test('It should start with a time of zero', () => {
  const utils = setup();
  const { time } = utils.components;

  expect(time).toHaveTextContent('00:00');
});

test('It should increase time bu minute button', () => {
  const utils = setup();
  const { time, minute } = utils.components;

  fireEvent.click(minute);
  expect(time).toHaveTextContent('01:00');
});

test('It should decrement time by minute button', () => {
  const utils = setup();
  const { time, second } = utils.components;

  fireEvent.click(second);
  expect(time).toHaveTextContent('00:01');
});

test('It should have start button disabled when time is zero', () => {
  const utils = setup();
  const { time, startButton } = utils.components;

  expect(time).toHaveTextContent('00:00');
  expect(startButton).toBeDisabled();
});

test('It should have start button enabled when is not zero', () => {
  const utils = setup();
  const { second, startButton } = utils.components;
  fireEvent.click(second);
  expect(startButton).not.toBeDisabled();
});

test('It should start counting down', async (done) => {
  const utils = setup();
  const { minute, second, startButton, time } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);
  fireEvent.click(startButton);

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1050));
  });

  expect(time).toHaveTextContent('01:00');

  done();
});

test('It should have minute and second buttons disabled while counting down.', async (done) => {
  const utils = setup();
  const { minute, second, startButton } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);
  fireEvent.click(startButton);

  expect(minute).toBeDisabled();
  expect(second).toBeDisabled();

  done();
});

test('It should start have minute and second buttons disabled while counting down', async (done) => {
  const utils = setup();
  const { minute, second, startButton } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);
  fireEvent.click(startButton);

  expect(minute).toBeDisabled();
  expect(second).toBeDisabled();

  done();
});

test('It should resume counting down', async (done) => {
  const utils = setup();
  const { minute, second, startButton, time } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);
  fireEvent.click(startButton);

  await pause(1050);
  expect(time).toHaveTextContent('01:00');
  fireEvent.click(startButton);
  await pause(1050);
  fireEvent.click(startButton);
  await pause(1050);
  expect(time).toHaveTextContent('00:59');
  fireEvent.click(startButton);

  done();
});

test('It should allow time adjustments before resuming', async (done) => {
  const utils = setup();
  const { minute, second, startButton, time } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);
  fireEvent.click(startButton);

  await pause(1050);
  expect(time).toHaveTextContent('01:00');
  fireEvent.click(startButton);
  fireEvent.click(minute);
  fireEvent.click(second);

  await pause(1050);
  fireEvent.click(startButton);

  await pause(1050);
  expect(time).toHaveTextContent('02:00');
  fireEvent.click(startButton);

  done();
});

test('It should reset while stopped.', async (done) => {
  const utils = setup();
  const { reset, minute, second, time } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);

  expect(time).toHaveTextContent('01:01');
  fireEvent.click(reset);
  expect(time).toHaveTextContent('00:00');

  done();
});

test('It should reset while counting down.', async (done) => {
  const utils = setup();
  const { reset, minute, second, startButton, time } = utils.components;

  fireEvent.click(minute);
  fireEvent.click(second);
  fireEvent.click(startButton);

  await pause(1050);

  expect(time).toHaveTextContent('01:00');
  fireEvent.click(reset);

  await pause(1050);

  expect(time).toHaveTextContent('00:00');

  done();
});

async function pause(duration = 1000) {
  return act(async () => {
    await new Promise((resolve) => setTimeout(resolve, duration));
  });
}
