import Event from "./Event";


export default function EventList({ events = [] }){
    return(
        <ul id="event-list" data-testid="event-list">
            {events.map(event=> <Event key={event.id} event={event}/>) }
        </ul>
    );
};

