import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import CitySearch from "./components/CitySearch";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [ currentCity, setCurrentCity] = useState("See all cities");

  useEffect(()=>{
    fetchData();
  }, [currentCity]);

  const fetchData = async () =>{
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ? 
      allEvents : allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    setEvents(allEvents.slice (0, currentNOE));
    setAllLocations(extractLocations(allEvents));

  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents />
      <EventList events={events}/>
      
    </div>
  );
};

export default App;
