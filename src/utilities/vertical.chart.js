import React, { useEffect, useState } from 'react';
import { Chart as CharJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from "react-bootstrap";

CharJS.register (
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const VerticalChart = (({props, dataSource, type, title}) => {
    const { lang }= props.reducer;
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
      });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bar Chart',
            },
        },
    };
    

    useEffect(() => {
        if(dataSource){
            let model = [...new Set(type)];
            setChartData({
                labels: model,
                datasets: 
                [
                    {
                        label: 'Quantity',
                        data: dataSource.map( e => e.qty),
                        backgroundColor: 'rgba(250, 10, 10, 0.8)'
                    },
                    {
                        label: 'Price',
                        data: dataSource.map(e => e.price),
                        backgroundColor: 'rgba(10, 10, 250, 0.8)'
                    }
            ]
            });
            
        }

    },[dataSource]);

    return(
        <Card>
            <Card.Header>
                <Card.Title>{title}</Card.Title>
            </Card.Header>
            <Card.Body>
            <Bar options={options} data={chartData} />
            </Card.Body>
        </Card>
        
        )
})