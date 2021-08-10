import { formatTime } from './utils';

test.each([
  [0, '00:00'],
  [1, '00:01'],
  [2, '00:02'],
  [60, '01:00'],
  [120, '02:00'],
  [781, '13:01'],
  [900, '15:00'],
  [1500, '25:00'],
])('.formatTime(%i, %i)', (time, expected) => {
  expect(formatTime(time)).toBe(expected);
});
