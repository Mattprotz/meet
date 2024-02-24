import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import { useEffect, useState } from "react";
import { getEvents } from "./api";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  const fetchData = async () =>{
    const allEvents = await getEvents();
    setEvents(allEvents.slice (0, currentNOE));
  }

  useEffect(()=>{
    fetchData();
  }, []);

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList events={events}/>
      
    </div>
  );
};

export default App;
