import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <EventList />
      <CitySearch />
    </div>
  );
};

export default App;
