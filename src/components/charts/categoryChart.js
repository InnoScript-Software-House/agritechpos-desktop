import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card } from "react-bootstrap";
import { Doughnut } from 'react-chartjs-2';
import { BsFillPieChartFill } from "react-icons/bs";
import { t, zawgyi } from '../../utilities/translation.utility';

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChartComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;
    
    const [chartData, setChartData] = useState(null);

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
                    },
                    {
                        label: "# of item categorie",
                        data: dataSet,
                        backgroundColor: [
                            'rgba(255, 100, 132, 1)',
                            'rgba(54, 100, 235, 1)',
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