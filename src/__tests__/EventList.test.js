import { render, within, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

//unit tests
describe('<EventList/> component', () => {
  test('has an element with "list" role', () => {
    render(<EventList/>);
    const eventList = screen.getByTestId("event-list");
    expect(eventList).toBeInTheDocument();
  });

  test.skip('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={[{ id: 1},{ id: 2},{ id: 3},{id: 4}]} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});

//integration tests
describe('<EventList/> integration' , () => {
  test.skip('render a list of 32 events when  app is mounted and rendered' , async () =>{
    render(<App/>);
    const AppDOM = screen.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(()=>{
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    })
})
})
