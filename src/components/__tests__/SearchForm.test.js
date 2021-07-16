import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import SearchForm from "../SearchForm";
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn();
beforeEach(() => render(<SearchForm retrieveGames={onSubmit} />));
afterEach(cleanup);

it("Should have an text box", () => {
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

it("Should have a submit button", () => {
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(/Search For Games/i);
});

it("Should call the onSubmit callback", async () => {
  await userEvent.click(screen.getByRole("button"));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});
