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
                        label: 'First Week',
                        data: dataSource,
                        backgroundColor: 'rgba(250, 10, 10, 0.8)'
                    },
                    {
                        label: 'Second Week',
                        data: dataSource,
                        backgroundColor: 'rgba(250, 10, 10, 0.8)'
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