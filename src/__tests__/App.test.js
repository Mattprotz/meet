import { render } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

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

describe('<App/> integration', ()=>{
  test('renders a list of events matching the city selected by the user' , async()=>{
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM= AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
    
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  })
})