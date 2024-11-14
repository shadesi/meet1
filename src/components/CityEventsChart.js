// src/components/CityEventsChart.js

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const CityEventsChart = ({ events }) => {
  // Extract cities and count the number of events per city
  const getData = () => {
    const cities = events.reduce((acc, event) => {
      const city = event.location ? event.location.split(', ').pop() : "Unknown"; // Safeguard for missing locations
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(cities).map(([name, value]) => ({ name, value }));
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF0'];

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={getData()}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {getData().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
