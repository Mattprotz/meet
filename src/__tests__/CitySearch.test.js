import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";
import '@testing-library/jest-dom/extend-expect'; 
import { toHaveClass } from "@testing-library/jest-dom/matchers";


describe("<CitySearch/> component", () => {
  test("renders text input", () => {
    const CitySearchComponent = render(<CitySearch />);
    const cityTextBox = CitySearchComponent.toHaveClass('city');
    expect(cityTextBox).toBeInTheDocument();
    expect(CitySearch).toHaveClass('city');
  });
  test('suggestions list is hidden by default',()=>{
    const CitySearchComponent = render(<CitySearch/>)
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });
  test('renders list of suggestions when city textbox gains focus', async () => {
    const CitySearchComponent = render(<CitySearch/>)
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox'); 
    await userEvent.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions')
  })
  test ('updates list of suggestions correctyle when user types city in textbox' , async()=>{
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations  = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations}/>);

    const cityTextBox = CitySearchComponent.queryByRole('textbox')
    await user.type(cityTextBox, "Berlin");

    const suggestions = allLocations? allLocations.filter((location)=>{
        return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length+1);
    for (let i=0; i <suggestions.length; i+=1){
        expect(suggestionListItems[i].textContent).toBe(suggestions[i])
    }
  })
});
