import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { BsFillPieChartFill } from "react-icons/bs";
import { t, zawgyi } from '../../utilities/translation.utility';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ItemActiveChartComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;
    
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if(dataSource) {
            let dataSet = [
                dataSource.filter(item => item.active === true).length,
                dataSource.filter(item => item.active === false).length
            ];
            
            const data = {
                labels: ['Active', 'Disable'],
                datasets: [
                    {
                        label: "# of item active",
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

    return(
        <Card>
            <Card.Header>
                <Card.Title>
                    <BsFillPieChartFill size={20} />
                    <span className={`${zawgyi(lang)}`}> {t('chart-item-active-title')} </span>
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