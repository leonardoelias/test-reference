import { sum } from './index';

test('deve somar 1 + 1 e a resposta ser 2', () => {
  const res = sum(1, 1);

  expect(res).toBe(2);
});


test('deve somar 6 + 4 e a resposta ser 2', () => {
  const res = sum(6, 4);

  expect(res).toBe(10);
});
