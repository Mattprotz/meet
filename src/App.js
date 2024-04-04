import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import {InfoAlert, ErrorAlert, WarningAlert} from "./components/Alert";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";
import CityEventsChart from "./components/CityEventsChart";
import "./App.css";
import all from "all";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if(navigator.onLine){
      setWarningAlert('');
    }else{
      setWarningAlert('Offline mode, events are loaded from cache')
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();

    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <div className="alerts-container">
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <div className="alerts-container">
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents />
      <CityEventsChart allLocations={allLocations} events={events}/>
      <EventList events={events} />
    </div>
  );
};

export default App;
