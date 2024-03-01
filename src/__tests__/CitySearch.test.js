import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";
import "@testing-library/jest-dom/extend-expect";
import { toHaveClass } from "@testing-library/jest-dom/matchers";

import App from "../App";
import all from "all";

describe("<CitySearch/> component", () => {
  const view = () => render(<CitySearch allLocations={[]} />);
  beforeEach(() => {
    view();
  });

  test("renders text input", () => {
    const { getByTestId } = render(<CitySearch />);
    const cityTextBox = screen.getByTestId("city-input");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });
  test("suggestions list is hidden by default", () => {
    const view = render(<CitySearch />);
    const suggestionList = view.screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });
  test("renders list of suggestions when city textbox gains focus", async () => {
    const view = render(<CitySearch />);
    const user = userEvent.setup();
    const cityTextBox = view.screen.queryByRole("textbox");
    await act(async() => {
      await userEvent.click(cityTextBox);
    });
    const suggestionList = view.screen.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });
  test("updates list of suggestions correctyle when user types city in textbox", async () => {
    const user = userEvent.setup();
    const view = render(<CitySearch />);
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    view.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = view.screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");
    

    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    const suggestionListItems = view.screen.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });
});

describe("<CitySearch/> integration", () => {
  test("render suggestion list when app is rendered", async () => {
    const user = userEvent.setup();
    const view = render(<App />);
    const AppDOM = view.container.firstChild;
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).screen.queryByRole("textbox");

    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems =
      within(CitySearchDOM).screen.queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
  test('renders suggestion text in the texbox upon clicking suggestion', async()=>{
    const user = userEvent.setup();
    const view = render(<CitySearch/>)
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    view.rerender(<CitySearch allLocations={allLocations} setCurrentCity={()=>{}}/>)
    const cityTextBox = view.queryAllByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion = view.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  })
});
