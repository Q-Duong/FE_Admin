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
import { wareHouseAPI } from '../../axios/exeAPI';
import {useSelector} from 'react-redux'

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
            text: 'Thống kê kho'
        }
    },
    scales: {
        xAxes: [{
            ticks: {
                fontSize: 5
            }
        }]
    }

};

function InventoryDashBoard() {
    const token = useSelector(state => state.token)
    const [chartData, setChartData] = useState(null)
    const chartRef = useRef(null)

    useEffect(() => {
        async function getStatisticData() {
            try {
                const res = await wareHouseAPI.getInventory(token)
                const datas = res.data

                setChartData({
                    labels: datas.map(item => item.product.length > 28 ? `${item.product.substring(0, 28)}...` : item.product),
                    datasets: [
                        {
                            label: 'tổng hàng trong kho',
                            data: datas.map(item => item.totalQuantity),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'số lượng hàng đã bán',
                            data: datas.map(item => item.soldQuantity),
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'số lượng hàng sắp bán',
                            data: datas.map(item => item.comingToSell),
                            backgroundColor: 'rgba(57, 160, 220, 0.5)',
                        },
                        {
                            label: 'số lượng hàng sắp hết hạn',
                            data: datas.map(item => item.comingExpiringQuantity),
                            backgroundColor: 'rgba(43, 112, 135, 0.5)',
                        },
                    ],
                })
            } catch (error) {
                console.log(error)
            }
        }
        getStatisticData()
    }, []);


    return chartData ?
        <Bar ref={chartRef} style={{ marginTop: "50px" }} options={options} data={chartData} /> :
        <></>;
}

export default InventoryDashBoard