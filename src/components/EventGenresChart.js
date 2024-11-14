// src/components/EventGenresChart.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
  // Extract genres dynamically
  const getData = () => {
    const genresSet = new Set();

    // Collect genres from event summaries
    events.forEach(event => {
      if (event.summary) {
        const words = event.summary.split(' ');
        words.forEach(word => genresSet.add(word));
      }
    });

    // Create data array from the genres
    const genreData = Array.from(genresSet).map((genre) => ({
      name: genre,
      value: events.filter((event) => event.summary.includes(genre)).length,
    }));

    return genreData;
  };

  const data = getData();

  return (
    <div>
      <h2>Event Genres Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        {data.length > 0 ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        ) : (
          <p>No genres available for the selected events.</p> // Placeholder for no data
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default EventGenresChart;
