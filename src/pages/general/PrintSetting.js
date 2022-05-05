import React, { useEffect, useState } from 'react';
import { Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPrintAction } from '../../redux/actions/print.action';
import { printOptions } from '../../utilities/print.utility';
import { t, zawgyi } from "../../utilities/translation.utility";

const PrintSetting = () => {

    const state = useSelector(state => state);
    const { lang , printData } = state;
    console.log(printData)
    const dispatch = useDispatch()

    const [printSetting, setPrintSetting] = useState(printOptions);

    const saveInvoiceSetting = async (key, value) => {
        printSetting[`${key}`] = value;
        setPrintSetting(printSetting);
        dispatch(setPrintAction(printSetting));
    }

    useEffect(() => {
        console.log(printSetting)
        const getPrintSetting = dispatch(setPrintAction(printSetting))
    }, [])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('title-print-setting')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <FormLabel className='w-full'> {t('invoice-print-number')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        type='number'
                                        placeholder={t('invoice-print-number')}
                                        value={printSetting.copies}
                                        onChange={(e) => {
                                            saveInvoiceSetting('copies', e.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="w-full"> {t('color-print')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        as={'select'}
                                        value={printSetting.color}
                                        onChange={(e) => {
                                            saveInvoiceSetting('color', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.color)
                                        }}
                                    >
                                        <option value={false}>
                                            {t('black')} & {t('white')}
                                        </option>
                                        <option value={true}>
                                            {t('color')}
                                        </option>
                                    </FormControl>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="w-full"> {t('print-background')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        as={'select'}
                                        value={printSetting.printBackground}
                                        onChange={(e) => {
                                            saveInvoiceSetting('printBackground', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.printBackground)
                                        }}
                                    >
                                        <option value={false}> {t('no')} </option>
                                        <option value={true}> {t('yes')} </option>
                                    </FormControl>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="me-3 w-full"> {t('lanscape')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        as={'select'}
                                        value={printSetting.landscape}
                                        onChange={(e) => {
                                            saveInvoiceSetting('landscape', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.landscape)
                                        }}
                                    >
                                        <option value={false}> {t('no')} </option>
                                        <option value={true}> {t('yes')} </option>
                                    </FormControl>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="w-full"> {t('print-silent')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        as={'select'}
                                        value={printSetting.silent}
                                        onChange={(e) => {
                                            saveInvoiceSetting('silent', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.silent)
                                        }}
                                    >
                                        <option value={false}> {t('no')} </option>
                                        <option value={true}> {t('yes')} </option>
                                    </FormControl>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="me-3 w-full"> {t('invoice-header')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        placeholder={t('invoice-header')}
                                        value={printSetting.header}
                                        onChange={(e) => {
                                            saveInvoiceSetting('header', e.target.value || printSetting.header)
                                        }}
                                    />
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="me-3 w-full"> {t('invoice-footer')} </FormLabel>
                                <InputGroup>
                                    <FormControl
                                        type='text'
                                        placeholder={t('invoice-footer')}
                                        value={printSetting.footer}
                                        onChange={(e) => {
                                            saveInvoiceSetting('footer', e.target.value || printSetting.footer)
                                        }}
                                    />
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default PrintSetting