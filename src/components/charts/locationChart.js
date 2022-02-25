import React,{ useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { BsFillPieChartFill } from 'react-icons/bs';
import { t, zawgyi } from '../../utilities/translation.utility';
import { generateColor } from '../../utilities/colorgenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

export const LocationChartComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;

    const [ chartData, setChartData ] = useState(null);

    useEffect(() => {
        if(dataSource){
            let labelArray = [];
            let dataSet = [];

            dataSource.map((item, index) => {
                labelArray.push(item.location);
            });

            let chartLabel = [];
            chartLabel.push(labelArray);


            chartLabel.map((lco, index) => {
                const dataCount = dataSource.filter(item => item.location === lco);
                dataSet.push(dataCount);
            });
        }

        const data = {
            labels: chartLabel.length > 0 ? chartLabel: [],
            datasets: [{
                label: "# of item location",
                data: dataSet,
                backgroundColor: generateColor(chartLabel),
                borderWidth: 1
            }
          ]
        };
        setChartData(data);
    }, [dataSource]);

  return (
    <Card>
        <Card.Header>
            <Card.Title>
                <BsFillPieChartFill size={20} />
                <span className={`${zawgyi(lang)}`}>{t('chart-item-location')}</span>
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