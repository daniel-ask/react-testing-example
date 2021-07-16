import { render, screen, cleanup, act } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import Search from "../Search";
import renderer from "react-test-renderer";

jest.mock("axios");

describe("Search", () => {
  afterEach(cleanup);
  beforeEach(() => {render(<Search />)})

  test("should have the correct title", () => {
    expect(screen.getByText(/Search for Games/i)).toBeInTheDocument();
  });

  test("fetches games from an API and displays them", async () => {
    const games = [
      { gameID: 1, external: "batman", cheapest: 10.0 },
      { gameID: 2, external: "batman 2", cheapest: 5.0 },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: games }));

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });

    const items = await screen.findAllByRole("listitem");
    const message = screen.queryByText(/No Match Found/i);

    expect(items).toHaveLength(2);
    expect(message).toBeNull();
  });

  test("fetches games from the api but with no result", async () => {
    const games = [];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: games }));

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });
    const message = await screen.findByText(/No Match Found/i);
    expect(message).toBeInTheDocument();
  });

  test("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    await act(async () => {
      await userEvent.click(screen.getByRole("button"));
    });

    const message = await screen.findByText(/Error/);

    expect(message).toBeInTheDocument();
  });

  it("should match last snapshot", () => {
    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


