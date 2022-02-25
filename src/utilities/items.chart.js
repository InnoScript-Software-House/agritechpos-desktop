import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { BsFillPieChartFill } from "react-icons/bs";
import { t, zawgyi } from './translation.utility';
import { colorGen, generateColor } from './colorgenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ItemsChart = (({ props, dataSource, }) => {
    const { lang } = props.reducer;
    const [ chartData, setChartData ] = useState(null);
    const [ type, setType ] = useState(null);
    console.log(dataSource)


    useEffect(() => {
        if(dataSource){
            let labelArray = [];
            let dataSet = [];

            dataSource.map((item, index) => {
                labelArray.push(item);
            });
            console.log(labelArray)

            labelArray.map((chartLabel, index) => {
                const dataCount = dataSource.filter((item => item === chartLabel)).length;
                dataSet.push(dataCount);
            });

            const data = {
                labels: dataSource.map(e => e),
                // labels: chartType.length > 0 ? chartType.map(e => e.name) : [],
                datasets: [
                    {
                        label: '# of ',
                        data: dataSet,
                        backgroundColor: generateColor(dataSource),
                        borderWidth: 1,
                    }
                ]
            };
            setChartData(data);
         };
},[dataSource]);

return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <BsFillPieChartFill size={20} />
                    <span className={`${zawgyi(lang)}`}> {} </span>
                </Card.Title>
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
                })
