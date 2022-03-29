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
    const [printSetting, setPrintSetting] = useState({
        silent: true,
        printBackground: true,
        color: true,
        margin: { marginType: 'printableArea' },
        landscape: true,
        pagesPerSheet: 1,
        collate: false,
        copies: 2,
        header: 'AgriTech POS',
        footer: 'AgriTech POS'  
    });

    useEffect(() => {
        const getPrefix = localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT';
        const getInvoicePrintSetting = localStorage.getItem('PRINT_SETTING') ? localStorage.getItem('PRINT_SETTING') : printSetting;

        setPrefix(getPrefix);
        setPrintNumber(getInvoicePrintSetting.copies);
        setColorPrint(getInvoicePrintSetting.color);
        setBackgroundPrint(getInvoicePrintSetting.printBackground);
        setInvoiceHeader(getInvoicePrintSetting.header);
        setInvoiceFooter(getInvoicePrintSetting.footer);
        setSilentPrint(getInvoicePrintSetting.silent);
        setPrintSetting(getInvoicePrintSetting);

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
                                    printSetting.copies = Number(e.target.value)
                                    localStorage.setItem('PRINT_SETTING', JSON.stringify(printSetting))
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
                                    printSetting.color = e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.color;
                                    localStorage.setItem('PRINT_SETTING', JSON.stringify(printSetting))
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
                                    printSetting.printBackground = e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.printBackground;
                                    localStorage.setItem('PRINT_SETTING', JSON.stringify(printSetting))
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
                                    printSetting.silent = e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.silent;
                                    localStorage.setItem('PRINT_SETTING', JSON.stringify(printSetting))
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
                                setLanscape(e.target.value)
                                printSetting.landscape = e.target.value === 'false' ? false : e.target.value === 'true' ? true : printSetting.landscape;
                                localStorage.setItem('PRINT_SETTING', JSON.stringify(printSetting))
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