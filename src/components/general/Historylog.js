import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { BsArrowCounterclockwise, BsClock } from 'react-icons/bs';
import { getHistoryLog } from '../../services/historylog.servcie';
import { BsFillArrowUpCircleFill } from "react-icons/bs";

import '../../assets/css/components/historylog.css';

export const HistoryLog = ({ props, title }) => {
    const { lang } = props;
    const { account } = props.reducer;

    const [historyRecord, setHistoryRecord] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const [more, setMore] = useState(true);

    const refresh = () => {
        setPage(1);
        setMore(true);
        fetchApi();
    }

    const loadMore = async () => {
        setPage(page + 1);
        const response = await getHistoryLog('number', page);
        if(response && response.success === false) {
            setError(response.message);
            return;
        }

        if(response.history.length === 0) {
            setMore(false);
        }

        const updateHistory = response.history.concat(historyRecord);

        setHistoryRecord(updateHistory);
        setError(null);
        return;
    }

    const fetchApi = useCallback(async() => {
        const response = await getHistoryLog('number', page);
        if(response && response.success === false) {
            setError(response.message);
            return;
        }

        setHistoryRecord(response.history);
        setError(null);
        return;
    },[]);

    useEffect(() => {
        fetchApi();
    },[fetchApi])

    return(
        <Card className='ms-1'>
            <Card.Title className={`m-2 d-md-flex flex-row justify-content-between number-spec-info-title ${zawgyi(lang)}`}> 
                <span className={`${zawgyi(lang)}`}> {t(title)} </span> 
                <div className='icon-btn' onClick={() => refresh()}>
                    <BsArrowCounterclockwise size={20} />
                </div>
            </Card.Title>

            <Card.Body>
                <div className='history-list-wrapper'>
                    {historyRecord.length > 0 && historyRecord.map((record, index) => {
                        return(
                            <div 
                                className='d-md-flex flex-column mt-1 me-1 history-card'
                                key={`history_card_id_${index}`}
                            >
                                <div className='d-md-flex flex-md-row justify-content-md-between align-items-center'>
                                    <div className='d-md-flex flex-row'>
                                        {record.action === 'UPDATE' && (<BsFillArrowUpCircleFill size={20}/>)}    
                                        <p className='ps-3'> {record.description} </p>
                                    </div>

                                    <Badge bg="info mb-1 align-self-start"> 
                                        <BsClock /> 
                                        <span> {moment(record.created_at).format('Y-MM-DD H:mm:ss')} </span>
                                    </Badge>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {more && (<Button className='btn-see-more' onClick={() => loadMore()}> See More </Button>)}
               
            </Card.Body>

        </Card>
    )
}