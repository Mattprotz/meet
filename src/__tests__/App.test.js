import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("render list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });
  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
});

describe("<App/> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    render(<App />);
    // const AppDOM = view.container.firstChild;

    // const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = screen.getByTestId('city-search-input')

    await waitFor(async () => {
      await user.type(CitySearchInput, "Berlin");
      const berlinSuggestionItem = screen.getByText('Berlin, Germany');
      await user.click(berlinSuggestionItem);
    });

    // const EventListDOM = screen.getByTestId("event-list");
    const allRenderedEventItems = screen.getAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === "Berlin, Germany"
    );
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });
});
