import React, { useState, useEffect, useRef } from 'react';
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
import { exportOrderAPI, wareHouseAPI } from '../../axios/exeAPI';
import { Dropdown } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Doanh thu',
    },
  },
};

function DashBoard() {
  const [chartData, setChartData] = useState(null)
  const [years, setYears] = useState([])
  const [activeYear, setActiveYear] = useState('2022')
  const [months, setMonths] = useState([])
  const [activeMonth, setActiveMonth] = useState('6')
  const [statisticData, setStatisticData] = useState([])
  const chartRef = useRef(null)

  useEffect(() => {
    async function getStatisticData() {
      try {
        const res = await exportOrderAPI.getRevenue()
        const statistic = res.data
        const arrYear = Object.keys(statistic)
        const year = arrYear[0]
        const arrMonth = Object.keys(statistic[year])
        const month = arrMonth[0]
        const arrDay = Object.keys(statistic[year][month])

        setYears(arrYear)
        setActiveYear(year)
        setMonths(arrMonth)
        setActiveMonth(month)
        setStatisticData(statistic)
        setChartData({
          labels: arrDay,
          datasets: [
            {
              label: 'doanh thu',
              data: arrDay.map(day => statistic[year][month][day].income),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'lợi nhuận',
              data: arrDay.map(day => statistic[year][month][day].increment),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        })
      } catch (error) {
        console.log(error)
      }
    }
    getStatisticData()
  }, []);

  useEffect(() => {
    if (!chartRef.current)
      return
  
    const arrMonth = Object.keys(statisticData[activeYear])
    const month = arrMonth[0]
    const arrDay = Object.keys(statisticData[activeYear][month])
    setMonths(arrMonth)
    setActiveMonth(month)
    chartRef.current.data = {
      labels:arrDay ,
      datasets: [
        {
          label: 'doanh thu',
          data: arrDay.map(day => statisticData[activeYear][month][day].income),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'lợi nhuận',
          data: arrDay.map(day => statisticData[activeYear][month][day].increment),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ]
    }
    chartRef.current.update()
  }, [activeYear])

  useEffect(() => {
    if (!chartRef.current)
      return

    const arrDay = Object.keys(statisticData[activeYear][activeMonth])
    chartRef.current.data = {
      labels:arrDay ,
      datasets: [
        {
          label: 'doanh thu',
          data: arrDay.map(day => statisticData[activeYear][activeMonth][day].income),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'lợi nhuận',
          data: arrDay.map(day => statisticData[activeYear][activeMonth][day].increment),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ]
    }
    chartRef.current.update()
  }, [activeMonth])


  return chartData ?
    <>
      <Dropdown style={{ marginTop: "100px" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          năm hiện tại {activeYear}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            years.map(year => (
              <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(); setActiveYear(year) }}>{year}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown style={{ marginTop: "100px" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          tháng hiện tại {activeMonth}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            months.map(month => (
              <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(); setActiveMonth(month) }}>{month}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      <Bar ref={chartRef} style={{ marginTop: "50px" }} options={options} data={chartData} />
    </> :
    <></>;
}

export default DashBoard