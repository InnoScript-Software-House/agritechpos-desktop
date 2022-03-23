import React, { useState } from 'react'
import { Card } from 'react-bootstrap'


const WeeklyTable = ( {title} ) => {

    const [ chartData , setChartData ] = useState({
        labels: [],
        datasets: []
    });

  return (
    <>
    <Card>
        <Card.Header>
            <Card.Title>{title}</Card.Title>            
        </Card.Header>

        <Card.Body>
            <Bar />
        </Card.Body>
    </Card>

    </>
  )
}

export default WeeklyTable