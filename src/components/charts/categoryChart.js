import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChartComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;
    
    const [chartData, setChartData] = useState(null);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        if(dataSource) {
            let labelArray = [];
            let dataSet = [];

            dataSource.map((item, index) => {
                labelArray.push(item.category);
            });

            let uniqueLabel = [...new Set(labelArray)]; 

            uniqueLabel.map((catLabel, index) => {
                const dataCount = dataSource.filter((item => item.category === catLabel)).length;
                dataSet.push(dataCount);
            });

            const data = {
                labels: uniqueLabel.length > 0 ? uniqueLabel : [],
                datasets: [
                    {
                        label: "# of item categories",
                        data: dataSet,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            };

            setChartData(data);
        }
    }, [dataSource]);

    // useEffect(() => {
    //     if(labels && labels.length > 0 && data && data.length > 0) {


    //     }
    // }, [labels, data])

    return(
        <Card>
            <Card.Header>
                <Card.Title> Item Categories </Card.Title>
            </Card.Header>

            <Card.Body>
                {chartData && (
                    <Doughnut 
                        data={chartData}
                    />
                )}
            </Card.Body>
        </Card>
    )
}