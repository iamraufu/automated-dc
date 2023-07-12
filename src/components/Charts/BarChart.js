import React from 'react';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartTitle, chartData, label1, bgColor }) => {

      const options = {
            responsive: true,
            plugins: {
                  legend: {
                        position: 'bottom',
                  },
                  title: {
                        display: true,
                        text: chartTitle,
                  },
            },
      };

      const labels = chartData.map(data => data.name)
      const data = {
            labels,
            datasets: [
                  {
                        label: label1,
                        data: chartData.map(data => data.sku),
                        backgroundColor: bgColor
                  }
            ],
      };

      return (
            <Bar options={options} data={data} />
      );
};

export default BarChart;