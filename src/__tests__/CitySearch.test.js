import { render, screen, within, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";
import "@testing-library/jest-dom/extend-expect";
import { toHaveClass } from "@testing-library/jest-dom/matchers";
import mockData from "../mockData";
import App from "../App";

//Filter Events By City
describe("<CitySearch/> component", () => {
  test("renders text input", () => {
    render(<CitySearch />);
    const cityTextBox = screen.getByTestId("city-search-input");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    render(<CitySearch />);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders list of suggestions when city textbox gains focus", async () => {
    const allLocations = extractLocations(mockData);
    const mockFn = jest.fn();
    render(<CitySearch allLocations={allLocations} setCurrentCity={mockFn} />);
    const user = userEvent.setup();
    const cityTextBox = screen.queryByRole("textbox");

    await user.click(cityTextBox);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test.skip("updates list of suggestions correctyle when user types city in textbox", async () => {
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
    render(<App />);
    // const AppDOM = view.container.firstChild;
    const CitySearchDOM = screen.getByTestId("city-search");
    const cityTextBox = screen.getByTestId("city-search-input");

    await user.click(cityTextBox);

    const allLocations = extractLocations(mockData);

    const suggestionListItems =
      within(CitySearchDOM).getAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });

  test.skip("renders suggestion text in the texbox upon clicking suggestion", async () => {
    const user = userEvent.setup();
    const view = render(<CitySearch />);
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    view.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    const cityTextBox = screen.getByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    await waitFor(() => {
      const BerlinGermanySuggestion = screen.getAllByRole("listitem")[0];

      user.click(BerlinGermanySuggestion);
      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
  });
});
