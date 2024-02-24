import { render, within, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

//unit tests
describe('<EventList/> component', () => {
  let EventListComponent;
  beforeEach(()=>{
    EventListComponent = render(<EventList/>)
  })

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={[{ id: 1},{ id: 2},{ id: 3},{id: 4}]} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});

//integration tests
describe('<EventList/> integration' , () => {
  test('render a list of 32 events when the app is mounted and rendered' , async () =>{
    const AppComponent = render (<App/>);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(()=>{
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    })
})
})
