import mockData from "./mockData";

export const extractLocations = (events) =>{
    const extractedLocations = events.map((event)=> event.location);
    const locations = [...new Set(extractedLocations)];
        return locations;
}

export const getEvents = asncy() =>{
    return mockData;
}