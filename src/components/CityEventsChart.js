import React, { useState, useEffect, useCallback } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]); //holds data to feed chart



  const getData = useCallback(() => {
    const data = allLocations.map((location) => {
      //maps location array
      const count = events.filter(
        (event) => event.location === location
      ).length; //filters events by each location in resulting array
      const city = location.split(",")[0]; //uses length value as event count for location
      return { city, count };
    });
    return data;
  }, [allLocations, events]);

  useEffect(() => {
    setData(getData());
  }, [getData]);
  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          botton: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City" />
        <YAxis type="number" dataKey="count" name="Number of Events" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
