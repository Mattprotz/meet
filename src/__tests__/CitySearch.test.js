import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";
import "@testing-library/jest-dom/extend-expect";
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

  test("renders updated list of suggestions as user types in cityTextbox", async () => {
    const user = userEvent.setup();
    render(<CitySearch  allLocations={[]}/>);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
   

    const cityTextBox = screen.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    await waitFor(()=>{
      const suggestions = allLocations.filter(location => location.toUpperCase().includes("BERLIN")
      );
      const suggestionListItems = screen.getAllByRole("listitem")
      expect(suggestionListItems).toHaveLength(suggestions.length) 
    })
  })

describe("<CitySearch/> integration", () => {
  test("render suggestion list when app is rendered", async () => {
    const user = userEvent.setup();
    render(<App />);

    const CitySearchDOM = screen.getByTestId("city-search");
    const cityTextBox = screen.getByTestId("city-search-input");
    await user.click(cityTextBox);

    const allLocations = extractLocations(mockData);
    const suggestionListItems =
      within(CitySearchDOM).getAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });

  test("renders suggestion text in the texbox upon clicking suggestion", async () => {
    const user = userEvent.setup();
    render(<CitySearch />);
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const cityTextBox = screen.getByRole("textbox");
    user.click(cityTextBox);
    
  });
})
})