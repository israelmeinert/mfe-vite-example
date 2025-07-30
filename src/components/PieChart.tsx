import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

interface PieChartProps {
  gastos: number;
  receitas: number;
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ gastos, receitas, title = 'Gastos vs Receitas' }) => {
  const data = {
    labels: ['Gastos', 'Receitas'],
    datasets: [
      {
        data: [gastos, receitas],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = gastos + receitas;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: R$ ${value.toLocaleString('pt-BR')} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <strong>Total Gastos:</strong> R$ {gastos.toLocaleString('pt-BR')}
          </div>
          <div>
            <strong>Total Receitas:</strong> R$ {receitas.toLocaleString('pt-BR')}
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <strong>Saldo:</strong> R$ {(receitas - gastos).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
};

export default PieChart; 