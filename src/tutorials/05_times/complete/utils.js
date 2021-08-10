// test com jest.each

export function formatTime(seconds) {
  let m = Math.floor(seconds / 60);
  m = m.toString().padStart(2, '0');

  let s = seconds % 60;
  s = s.toString().padStart(2, '0');

  return `${m}:${s}`;
}
