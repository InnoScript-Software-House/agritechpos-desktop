import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../../services/item.service';
import { messageBoxType } from '../../utilities/native.utility';
import { zawgyi, t } from '../../utilities/translation.utility';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';

export const ItemRowExpandComponent = ({ data, refresh }) => {
    const state = useSelector(state => state);
    const { lang } = state;

    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [percentage, setPercentage] = useState('');
    const [qty, setQty] = useState('');

    const update = async (value, fieldName) => {
        if (value === '') {
            window.nativeApi.messageBox.open({ title: t('title-update-item'), message: t('invalid-empty'), type: messageBoxType.info });
            return;
        }

        if (!Number(value)) {
            window.nativeApi.messageBox.open({ title: t('title-update-item'), message: t('invalid-number'), type: messageBoxType.info });
            return;
        }

        setPercentage(item.percentage);
        setQty(item.qty);

        const requestBody = item;

        requestBody[fieldName] = Number(value);

        const updateResponse = updateItem(item.id, requestBody);

        if (updateResponse && updateResponse.status === false) {
            window.nativeApi.messageBox.open({ title: t('title-update-item'), message: updateResponse.message, type: messageBoxType.info });
            return;
        }

        window.nativeApi.notification.show({ title: t('title-update-item'), body: t('success-item-update') });
        refresh(true);
        return;
    }

    useEffect(() => {
        if (data) {
            setItem(data);
            setPercentage(data.percentage);
            setQty(data.qty);
        }
    }, [data]);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('percentage')} </Form.Label>
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type='text'
                            placeholder={t('percentage')}
                            value={percentage || ''}
                            onChange={e => setPercentage(e.target.value)}
                            onKeyPress={e => {
                                if (e.code === 'Enter') {
                                    update(Number(percentage), 'percentage')
                                }
                            }}
                        />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Form.Label className={`${zawgyi(lang)}`}> {t('quantity')} </Form.Label>
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type='text'
                            placeholder={t('quantity')}
                            value={qty || ''}
                            onChange={e => setQty(e.target.value)}
                            onKeyPress={e => {
                                if (e.code === 'Enter') {
                                    update(Number(qty), 'qty')
                                }
                            }}
                        />
                    </InputGroup>
                </div>

                <div className='col-md-2 mt-3 mb-3'>
                    <Button className={`${zawgyi(lang)} delete-btn`} onClick={() => dispatch(setOpenDelModal({
                        open: true,
                        title: 'Delete Record',
                        message: 'Are you sure to delete record',
                        type: 'items',
                        id: item.id
                    }))
                    }> {t('btn-delete')}</Button>
                </div>
            </div>
        </div>
    )
}