import React from 'react';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController
);

const MultiTypeChart = ({labelsData}) => {
      
      const labels = labelsData.map(item => item.name);
      const data = {
            labels,
            datasets: [
                  {
                        type: 'line',
                        label: 'Dataset 1',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        fill: false,
                        data: [10, 20, 30, 40, 50, 60],
                  },
                  {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: 'rgb(75, 192, 192)',
                        data: [10, 20, 30, 40, 50, 60],
                        borderColor: 'white',
                        borderWidth: 2,
                  },
                  {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: 'rgb(53, 162, 235)',
                        data: [10, 20, 30, 40, 50, 60],
                  },
            ],
      };
      return (
            <Chart type='bar' data={data} />
      );
};

export default MultiTypeChart;