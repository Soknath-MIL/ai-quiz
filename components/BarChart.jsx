import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from './Cards/TitleCard';
import { useEffect, useState } from 'react';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({_data,titleDashboard}) => {
  const [chartData, setChartData] = useState(null);

  function groupDataByQuestionID(data) {
    const result = {};
  
    data.forEach((item) => {
      const { questionID, correct, incorrect } = item;
  
      if (!result[questionID]) {
        result[questionID] = { correct: 0, incorrect: 0 };
      }
  
      result[questionID].correct += correct ? 1 : 0;
      result[questionID].incorrect += incorrect ? 1 : 0;
    });
  
    return Object.values(result);
  }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      const groupedData = groupDataByQuestionID(_data);
      // console.log("🚀 ~ BarChart ~ _data:", _data.filter(item => item.questionID === 4))
      // console.log("🚀 ~ BarChart ~ groupedData:", groupedData)
      const labels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7','Q8','Q9','Q10'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Correct',
            data: groupedData.map((item) => item.correct),
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
          {
            label: 'Incorrect',
            data: groupedData.map((item) => item.incorrect),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };

    return(
      <TitleCard title={titleDashboard}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart