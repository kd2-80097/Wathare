// // TimelineChart.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TimelineChart = () => {
//   const [sampleData, setSampleData] = useState([]);

//   useEffect(() => {
//     const fetchSampleData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/data');
//         setSampleData(response.data);
//       } catch (error) {
//         console.error('Error fetching sample data:', error);
//       }
//     };
//     fetchSampleData();
//   }, []);

//   return (
//     <div style={{ display: 'flex', alignItems: 'flex-end', height: '100px' }}>
//       {sampleData.map((sample, index) => (
//         <div
//           key={index}
//           style={{
//             width: `${(sample.machine_status === 1 ? 10 : 5)}%`,
//             height: `${sample.vibration / 100 * 80}px`,
//             backgroundColor: sample.machine_status === 0 ? 'yellow' : sample.machine_status === 1 ? 'green' : 'red',
//             marginRight: '1px',
//           }}
//         >
//           <div style={{ fontSize: '10px', marginTop: '5px' }}>
//             {new Date(sample.ts).toLocaleTimeString()}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TimelineChart;






// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import 'chartjs-adapter-date-fns';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Application() {

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

// const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/data');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const jsonData = await response.json();
//       setData(jsonData.map(item => ({...item,
//         machine_status: item.machine_status !== null ? item.machine_status : 'missing',
//         vibration: item.vibration !== null ? item.vibration : 'missing'
//     })));
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//     }
//   };

//   const chartData = {
//     labels: data.map(item => item.ts),
//     datasets: [
//         {
//             label: 'Vibration Levels',
//             data: data.map(item => item.vibration === 'missing' ? NaN : item.vibration),
//             backgroundColor: data.map(item => {
//                 if (item.machine_status === 0) return 'yellow';
//                 else if (item.machine_status === 1) return 'green';
//                 else return 'red'; // Handle missing data
//             }),
//             borderColor: 'black',
//             borderWidth: 1,
//         }
//     ],
// };

// const options = {
//     scales: {
//         x: {
//             type: 'time',
//             time: {
//                 unit: 'minute'
//             }
//         },
//         y: {
//             beginAtZero: true
//         }
//     },
//     plugins: {
//         legend: {
//             display: false
//         }
//     }
// };

//     return ( 
//         <div>
//       <h1>This is Application's front page</h1>
//       <div>
//         <h2>Data from Node.js:</h2>
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//      );
// }

// export default Application;




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
