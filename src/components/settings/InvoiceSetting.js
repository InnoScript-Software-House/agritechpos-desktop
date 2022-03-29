import React, { useEffect, useState } from "react";
import { Card, FormControl, FormLabel, InputGroup } from "react-bootstrap";

export const InvoiceComponent = () => {

    const [prefix, setPrefix] = useState('');
    const [printNumber, setPrintNumber] = useState('');
    const [colorPrint, setColorPrint] = useState('');
    const [backgroundPrint, setBackgroundPrint] = useState('');
    const [invoice_header, setInvoiceHeader] = useState('');
    const [invoice_footer, setInvoiceFooter] = useState('');
    const [silent_print, setSilentPrint] = useState('');
    const [lanscape, setLanscape] = useState('');

    useEffect(() => {
        const getPrefix = localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT';
        const getInvoicePrintNumber = localStorage.getItem('PRINT_NUMBER') ? localStorage.getItem('PRINT_NUMBER') : 2;
        const getColorPrint = localStorage.getItem('COLOR_PRINT') ? localStorage.getItem('COLOR_PRINT') : false;
        const getBackgroundPrint = localStorage.getItem('PRINT_BACKGROUND') ? localStorage.getItem('PRINT_BACKGROUND') : false;
        const getInvoiceHeader = localStorage.getItem('INVOICE_HEADER') ? localStorage.getItem('INVOICE_HEADER') : 'AgriTech POS';
        const getInvoiceFooter = localStorage.getItem('INVOICE_FOOTER') ? localStorage.getItem('INVOICE_FOOTER') : 'AgriTech POS';
        const getSilentPrint = localStorage.getItem('SILENT_PRINT') ? localStorage.getItem('SILENT_PRINT') :  false;
        const getLandscape = localStorage.getItem('PRINT_LANDSCAPE') ? localStorage.getItem('PRINT_LANDSCAPE') : false;

        setPrefix(getPrefix);
        setPrintNumber(getInvoicePrintNumber);
        setColorPrint(getColorPrint);
        setBackgroundPrint(getBackgroundPrint);
        setInvoiceHeader(getInvoiceHeader);
        setInvoiceFooter(getInvoiceFooter);
        setSilentPrint(getSilentPrint);
        setLanscape(getLandscape);

    }, []);

    return(
       <Card>
            <Card.Header>
                <Card.Title> Invoice Setting </Card.Title>
            </Card.Header>

            <Card.Body>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> Invoice Prefix Name </FormLabel>
                            <FormControl 
                                type="text"
                                placeholder="Invoice Prefix Name"
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
                            <FormLabel className="me-3 w-full"> Invoice Print Number </FormLabel>
                            <FormControl 
                                type="number"
                                placeholder="Invoice print number"
                                value={printNumber}
                                onChange={(e) => {
                                    setPrintNumber(e.target.value);
                                    localStorage.setItem('PRINT_NUMBER', e.target.value)
                                }}
                            />
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> Color Print </FormLabel>
                            <FormControl 
                                as={'select'}
                                value={colorPrint}
                                onChange={(e) => {
                                    setColorPrint(e.target.value);
                                    localStorage.setItem('COLOR_PRINT', e.target.value)
                                }}
                            >
                                <option value={false}> Black & White </option> 
                                <option value={true}> Color </option> 
                            </FormControl>
                        </InputGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <InputGroup>
                            <FormLabel className="me-3 w-full"> Print Background </FormLabel>
                            <FormControl 
                                as={'select'}
                                value={backgroundPrint}
                                onChange={(e) => {
                                    setBackgroundPrint(e.target.value);
                                    localStorage.setItem('PRINT_BACKGROUND', e.target.value)
                                }}
                            >
                                <option value={false}> No </option> 
                                <option value={true}> Yes </option> 
                            </FormControl>
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <FormLabel className="me-3 w-full"> Print Silent </FormLabel>
                        <InputGroup>
                            <FormControl 
                                as={'select'}
                                value={silent_print}
                                onChange={(e) => {
                                    setSilentPrint(e.target.value);
                                    localStorage.setItem('SILENT_PRINT', e.target.value)
                                }}
                            >
                                <option value={true}> Yes </option>
                                <option value={false}> No </option>
                            </FormControl>
                        </InputGroup>
                    </div>

                    <div className="col-md-4 mb-3">
                        <FormLabel className="me-3 w-full"> Landscape </FormLabel>
                        <FormControl
                            as={'select'}
                            value={lanscape}
                            onChange={(e) => {
                                localStorage.setItem('PRINT_LANDSCAPE', e.target.value);
                                setLanscape(e.target.value)
                            }}
                        >
                            <option value={true}> Yes </option>
                            <option value={false}> No </option>
                        </FormControl>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                        <FormLabel className="me-3 w-full"> Invoice Header </FormLabel>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                value={invoice_header}
                                onChange={(e) => {
                                    setInvoiceHeader(e.target.value);
                                    localStorage.setItem('INVOICE_HEADER', e.target.value)
                                }}
                            />
                        </InputGroup>
                    </div>

                    <div className="col-md-6 mb-3">
                        <FormLabel className="me-3 w-full"> Invoice Footer </FormLabel>
                        <InputGroup>
                            <FormControl 
                                type="text"
                                value={invoice_footer}
                                onChange={(e) => {
                                    setInvoiceFooter(e.target.value);
                                    localStorage.setItem('INVOICE_FOOTER', e.target.value)
                                }}
                            />
                        </InputGroup>
                    </div>
                </div>
           </Card.Body>
       </Card>
    )
}