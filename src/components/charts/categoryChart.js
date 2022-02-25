import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { BsFillPieChartFill } from "react-icons/bs";
import { t, zawgyi } from '../../utilities/translation.utility';
import { colorGen, generateColor } from '../../utilities/colorgenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChartComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;
    
    const [chartData, setChartData] = useState(null);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [color, setcolor] = useState([]);


    useEffect(() => {
        if(dataSource) {
            let labelArray = [];
            let dataSet = [];

            dataSource.map((item, index) => {
                labelArray.push(item.category_title);
            });

            let uniqueLabel = [...new Set(labelArray)]; 

            uniqueLabel.map((catLabel, index) => {
                const dataCount = dataSource.filter((item => item.category_title === catLabel)).length;
                dataSet.push(dataCount);
            });
            // let value = [{r: 0, g: 0, b: 0, a: 1}];
            // for(let i = 1; i<=dataSet.length; i++){
            //     let x = 255 / dataSet.length;
            //     let intvalue = Math.floor(x);
            //     let red = i;
            //     let green = intvalue*i;
            //     let blue = 255-green;
            //     value.push({
            //         r: red,
            //         g: green,
            //         b: blue,
            //         a: 1
            //     })
            // }
            // let rgba = [];
            // rgba.push(value.map((e, i) => `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`));
            // let datalength = dataSet.length;
            // let color = [];
            // let getcolor = colorGen(datalength);
            // color.push(chartColor(datalength));
            
            const data = {
                labels: uniqueLabel.length > 0 ? uniqueLabel : [],
                datasets: [
                    {
                        label: "# of item categories",
                        data: dataSet,
                        backgroundColor: generateColor(uniqueLabel),
                        borderWidth: 1,
                    }
                ]
            };

            setChartData(data);
        }
    }, [dataSource]);

    return(
        <Card>
            <Card.Header>
                <Card.Title>
                    <BsFillPieChartFill size={20} />
                    <span className={`${zawgyi(lang)}`}> {t('chart-item-categories')} </span>
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
}