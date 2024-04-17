
import React, { useState, useEffect } from 'react';
import './App.css';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);


function TimelineChart() {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById('myChart').getContext('2d');
      // Destroy previous chart instance if it exists
      if (chart) {
        chart.destroy();
      }
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((item) => item.ts), // Extract timestamps for labels (X-axis)
          datasets: [{
            label: 'Machine Status',
            data: data.map((item) => item.machine_status), // Extract machine status for data points (Y-axis)
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Adjust color as needed
            borderColor: 'rgba(54, 162, 235, 1)', // Adjust color as needed
            borderWidth: 1,
          }],
        },
        options: {
          // Customize chart options (scales, legend, etc.) as needed
          scales: {
            xAxes: [{
              type: 'category', // Use category scale for timestamps
              ticks: {
                // ... configure X-axis ticks (e.g., label formatting)
              },
            }],
            yAxes: [{
              ticks: {
                // ... configure Y-axis ticks (e.g., label formatting)
              },
            }],
          },
          legend: {
            display: true, // Show legend
            position: 'bottom', // Place legend at the bottom
          },
          tooltips: {
            enabled: true, // Enable tooltips
            // ... configure tooltip content and styling
          },
        },
      });
      setChart(newChart);
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Machine Status</h1>
      <div className="chart-container">
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default TimelineChart;
