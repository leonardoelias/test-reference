import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Todo from "./index";

const setup = async () => {
  const utils = render(<Todo />);

  const components = {
    container: utils.getByTestId("container"),
    buttonAdd: utils.getByRole("button", { name: /add todo/i })
  };

  return {
    components,
    ...utils,
  };
};

test("It should mount the component", async () => {
  const utils = await setup();
  const { container } = utils.components;

  expect(container).toBeInTheDocument();
});


test("It should add another todo to the list", async () => {
  const utils = await setup();
  const { container, buttonAdd } = utils.components;

  let todoItems = await utils.findAllByTestId('todo-item');

  expect(buttonAdd).toBeInTheDocument();

  const expectedLength = todoItems.length + 1;
  
  fireEvent.click(buttonAdd);

  todoItems = await utils.findAllByTestId('todo-item');

  expect(todoItems).toHaveLength(expectedLength);
});

test('It should be able to edit an empty item on the list', async () => {
  const utils = await setup();
  const { container, buttonAdd } = utils.components;

  let todoItems = await utils.findAllByTestId('todo-item');
  
});