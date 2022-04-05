import React, { useEffect, useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import numeral from "numeral";
import { zawgyi, t } from "../../utilities/translation.utility";
import { BsFillCartCheckFill, BsFillTrashFill } from "react-icons/bs";

export const RecentInvoice = ({ dataSource, retrive}) => {
    
    const state = useSelector((state) => state);
    const { lang } = state;
    
    const [invoiceList, setInvoiceList] = useState([]);

    const deleteAll = () => {
        localStorage.removeItem('INVOICE_LIST');
        setInvoiceList([]);
    }

    const deleteInvoice = (invoice) => {
        const updateInvocieList = invoiceList.filter(value => value.recent_id !== invoice.recent_id);
        setInvoiceList(updateInvocieList);
        localStorage.setItem('INVOICE_LIST', updateInvocieList);
    }

    const openInvoice = (invoice) => {
        deleteInvoice(invoice);
        retrive(invoice);
    }
    
    useEffect(() => {
        if(dataSource) {
            setInvoiceList(dataSource);
        } else {
            const data = localStorage.getItem('INVOICE_LIST') ? JSON.parse(localStorage.getItem('INVOICE_LIST')) : [];
            setInvoiceList(data);
        }
    }, [dataSource]);

    return(
        <Card>
            <Card.Header>
                <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center">
                    <span className={`${zawgyi(lang)} title`}> {t('open-recent-invoice')} </span>
                    {invoiceList.length > 0 && (
                        <Button className="btn-small" onClick={() => deleteAll()}> {t('delete-all')} </Button>
                    )}
                </Card.Title>
            </Card.Header>

            <Card.Body>
                { invoiceList.map((invoice, index) => {
                    return(
                        <div key={`recent_invoice_id_${index}`} className="d-md-flex flex-md-row justify-content-between align-items-center recent-invoice-wrapper">
                            <label className="mb-3"> 
                                <Badge className="ms-1" bg="primary"> {`${t('total-items')} - ${invoice.bought_items.length}`} </Badge> 
                                <Badge className="ms-1" bg="secondary">{`${t('total-amount')} - ${numeral(invoice.totalAmount).format('0,0')} MMK`}  </Badge>
                            </label>

                            <div className="mb-3">
                                <BsFillTrashFill className="btn-icon" size={20} onClick={() => deleteInvoice(invoice)} />
                                <BsFillCartCheckFill className="btn-icon ms-1" size={20} onClick={() => openInvoice(invoice)} />
                            </div>
                        </div>
                    )
                })}
            </Card.Body>
        </Card>
    )
}