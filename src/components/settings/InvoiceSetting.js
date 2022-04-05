import React, { useEffect, useState } from "react";
import { Card, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { printOptions } from "../../utilities/print.utility";
import { t } from 'i18next';

export const InvoiceComponent = () => {

    const [prefix, setPrefix] = useState('');
    const [printNumber, setPrintNumber] = useState('');
    const [colorPrint, setColorPrint] = useState('');
    const [backgroundPrint, setBackgroundPrint] = useState('');
    const [invoice_header, setInvoiceHeader] = useState('');
    const [invoice_footer, setInvoiceFooter] = useState('');
    const [silent_print, setSilentPrint] = useState('');
    const [lanscape, setLanscape] = useState('');
    const [printSetting, setPrintSetting] = useState(printOptions);

    const saveInvoiceSetting = (key, value) => {
        printSetting[`${key}`] = value;
        setPrintSetting(printSetting);
        localStorage.setItem('PRINT_SETTING', JSON.stringify(printSetting));
        return;
    }

    useEffect(() => {
        const getPrefix = localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT';
        const getPrintSetting = localStorage.getItem('PRINT_SETTING') ? JSON.parse(localStorage.getItem('PRINT_SETTING')) : printSetting;

        setPrefix(getPrefix);
        setPrintSetting(getPrintSetting);
        setPrintNumber(getPrintSetting.copies);
        setColorPrint(getPrintSetting.color);
        setBackgroundPrint(getPrintSetting.printBackground);
        setInvoiceHeader(getPrintSetting.header);
        setInvoiceFooter(getPrintSetting.footer);
        setSilentPrint(getPrintSetting.silent);
        setLanscape(getPrintSetting.landscape);

    }, []);

    return(
       <Card>
            <Card.Header>
                <Card.Title> {t('invoice-setting')} </Card.Title>
            </Card.Header>

            <Card.Body>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> {t('invoice-prefix-name')} </FormLabel>
                            <FormControl 
                                type="text"
                                placeholder={t('invoice-prefix-name')}
                                value={prefix}
                                onChange={(e) => {
                                    setPrefix(e.target.value)
                                    localStorage.setItem('PREFIX', e.target.value)
                                }}
                            />
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> {t('invoice-print-number')} </FormLabel>
                            <FormControl 
                                type="number"
                                placeholder={t('invoice-print-number')}
                                value={printNumber}
                                onChange={(e) => {
                                    setPrintNumber(e.target.value);
                                    saveInvoiceSetting('copies', e.target.value);
                                }}
                            />
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> {t('color-print')} </FormLabel>
                            <FormControl 
                                as={'select'}
                                value={colorPrint}
                                onChange={(e) => {
                                    setColorPrint(e.target.value);
                                    saveInvoiceSetting('color', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.color);
                                }}
                            >
                                <option value={false}> {t('black')} & {t('white')} </option> 
                                <option value={true}> {t('color')} </option> 
                            </FormControl>
                        </InputGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> {t('print-background')} </FormLabel>
                            <FormControl 
                                as={'select'}
                                value={backgroundPrint}
                                onChange={(e) => {
                                    setBackgroundPrint(e.target.value);
                                    saveInvoiceSetting('printBackground', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.printBackground);
                                }}
                            >
                                <option value={false}> {t('no')} </option> 
                                <option value={true}> {t('yes')} </option> 
                            </FormControl>
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <FormLabel className="me-3 w-full"> {t('print-silent')} </FormLabel>
                        <InputGroup>
                            <FormControl 
                                as={'select'}
                                value={silent_print}
                                onChange={(e) => {
                                    setSilentPrint(e.target.value);
                                    saveInvoiceSetting('silent', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.silent);
                                }}
                            >
                                <option value={true}> {t('yes')} </option>
                                <option value={false}> {t('no')} </option>
                            </FormControl>
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <FormLabel className="me-3 w-full"> {t('lanscape')} </FormLabel>
                        <FormControl
                            as={'select'}
                            value={lanscape}
                            onChange={(e) => {
                                saveInvoiceSetting('landscape', e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.landscape);
                                setLanscape(e.target.value)
                            }}
                        >
                            <option value={true}> {t('yes')} </option>
                            <option value={false}> {t('no')} </option>
                        </FormControl>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                        <FormLabel className="me-3 w-full"> {t('invoice-header')} </FormLabel>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                value={invoice_header}
                                placeholder= {t('invoice-header')}
                                onChange={(e) => {
                                    setInvoiceHeader(e.target.value);
                                    saveInvoiceSetting('header', e.target.value || printSetting.header);
                                }}
                            />
                        </InputGroup>
                    </div>

                    <div className="col-md-6 mb-3">
                        <FormLabel className="me-3 w-full">  {t('invoice-footer')} </FormLabel>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                value={invoice_footer}
                                placeholder={t('invoice-footer')}
                                onChange={(e) => {
                                    setInvoiceFooter(e.target.value);
                                    saveInvoiceSetting('footer', e.target.value || printSetting.footer);
                                }}
                            />
                        </InputGroup>
                    </div>
                </div>
           </Card.Body>
       </Card>
    )
}