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
            let value = [{r: 0, g: 0, b: 0, a: 1}];
            for(let i = 0; i<dataSet.length; i++){
                let x = 255 / dataSet.length;
                let intvalue = Math.round(x);
                let r = intvalue * i;
                let g =  Math.floor(Math.random()*(255-0+1)+0);
                let b =  Math.floor(Math.random()*(255-0+1)+0);
                value.push({
                    r: r,
                    g: g,
                    b: b,
                    a: 1
                })
            }
            let rgba = [];
            rgba.push(value.map((e, i) => `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`));

            const data = {
                labels: uniqueLabel.length > 0 ? uniqueLabel : [],
                datasets: [
                    {
                        label: "# of item categories",
                        data: dataSet,
                        backgroundColor: rgba[0],
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