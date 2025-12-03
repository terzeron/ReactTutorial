import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const ChartComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Completed Tasks',
            backgroundColor: 'rgba(99, 132, 255, 0.5)',
            borderColor: 'rgba(99, 132, 255, 1)',
            borderWidth: 1,
            data: [12, 9, 14, 7, 10, 5, 3]
          },
          {
            label: 'Pending Tasks',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [3, 4, 2, 5, 1, 2, 4]
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Task Count'
            }
          }
        }
      }
    });
    return () => chart.destroy();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ChartComponent;
