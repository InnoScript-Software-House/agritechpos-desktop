import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { pdf } from '../../utilities/export.utility';
import moment from "moment";
import { t, zawgyi } from '../../utilities/translation.utility';

export const ItemTableHeaderComponent = ({ dataSource }) => {

    const state = useState(state => state);
    const { lang } = state;

    const [data, setData] = useState([]);
    const columns = ['Material Code', 'Name', 'Brand', 'Model', 'Location', 'Purchase Price', 'Percentage', 'Sell Price'];
    
    useEffect(() => {
        if(dataSource) {
            const getValue = dataSource.map((value) => {
                return [
                    value.code, value.eng_name, value.category.name, value.model, 
                    value.location, value.price, value.percentage, value.sell_price
                ];
            });
            setData(getValue);
        }
    }, [dataSource]);
    return (
        <div className='mb-3'>
            {data.length > 0 && (
                <div className='d-md-flex flex-md-row'>
                    <Button
                        className={`${zawgyi(lang)}`}
                        onClick={() => pdf(columns, data, `inventory_${moment().format('D_M_Y')}`)}
                    > 
                        {t('btn-export-pdf')}
                    </Button>

                    <Button
                        className={`ms-1 ${zawgyi(lang)}`}
                        onClick={() => pdf(columns, data, `inventory_${moment().format('D_M_Y')}`)}
                    > 
                        {t('btn-export-excel')}
                    </Button>
                </div>
            )}
        </div>
    )
}