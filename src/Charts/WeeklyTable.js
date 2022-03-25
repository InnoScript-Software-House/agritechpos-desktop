import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const WeeklyTable = ({ title ,dataSource  }) => {
    const [chartData, setChartData] = useState({

        labels: [],
        datasets: []
    })



    const options = {
        responsive: true,
        plugins: {
            length: {
                position: "top",
            },
            title: {
                display: true,
                text: 'Bar Chart'
            }
        }
    }

    useEffect(() => {
        if (dataSource) {
            let model = []
            setChartData({
                labels: model,
                datasets: [
                    {
                        label: 'Monday',
                        data: dataSource.map(value => value),
                        backgroundColor: 'rgba(250, 10, 10, 0.8)'
                    },
                    {
                        label: 'Tuesday',
                        data: dataSource.map(value => value),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)'
                    },
                    {
                        label: 'Wednesday',
                        data: dataSource.map(value => value),
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    },
                    {
                        label: 'Thursday',
                        data: dataSource.map(value => value),
                        backgroundColor:  'rgba(75, 192, 192, 0.2)',
                    },
                    {
                        label:'Friday',
                        data: dataSource.map(value => value),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    },
                    {
                        label:'Saturday',
                        data: dataSource.map(value => value),
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    },
                    {
                        label:'Sunday',
                        data: dataSource.map(value => value),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    }
                ]
            })
        }
    }, [dataSource])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>{title}</Card.Title>
                </Card.Header>

                <Card.Body>
                    <Bar options={options} data={chartData} />
                </Card.Body>
            </Card>

        </>
    )
}

export default WeeklyTable