import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
 
export const InvoiceReportPage = () => {
    const location = useLocation();
    const history = useHistory();
    const invoice_id = useSelector((state) => state.invoice.invoice_id);
    const name = useSelector((state) => state.invoice.customer_name);
    const phone = useSelector((state) => state.invoice.customer_phone);
    const address = useSelector((state) => state.invoice.customer_address);
    const sellItems = useSelector((state) => state.invoice.bought_items);
    const totalAmount = useSelector((state) => state.invoice.total);
    const discount = useSelector((state) => state.invoice.discount);
    const netAmount = useSelector((state) => state.invoice.netAmount);

    const handleClick = () => {
        history.push('/sale');
    }

    const handlePrint = (target) => {
        return new Promise(() => {
            console.log('forwarding print request to the main process...');
        
            let data = target.contentWindow.document.documentElement.outerHTML;

            var blob = new Blob([data], { type: 'text/html' });
            var url = URL.createObjectURL(blob);
        
            window.electronAPI.printComponent(url, (response) => {
             console.log('Main: ', response);
            });
           });
        history.push('/sale');
    }

    const handlepreview = () => {
        console.log(location.pathname);
    }


    return (
        <>
        <div className='mb-2 mt-2'>
            <BsArrowLeftCircle size={30} className="btn-icon" onClick={() => handleClick()} />
        </div>
        <div id="divtoprint">
        <Card>
            <Card.Header>
                <Card.Title>
                    <span> Invoice {invoice_id}</span>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                    <div className="d-md-flex flex-md-row justify-content-center align-items-center">
                            <div className="col-md-6 mb-3">
                                    <h5>Customer Name - {name}</h5>
                            </div>
                            <div className="col-md-6 mb-3">
                                    <h5>Phone No - {phone}</h5>
                            </div>
                    </div>
                    <div className="d-flex flex-col justify-content-start align-items-center mb-3">
                        <h5>Address - {address}</h5>
                    </div>

                    <div className="d-flex flex-row justify-content-center align-items-center mb-3 table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Item Model</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sellItems.length > 0 && sellItems.map((item, i) => {
                                        return(
                                        <tr key={`bought items id ${i}`}>
                                            <td className="cart-item-table-hash-width"> {i + 1} </td>
                                            <td className="cart-item-table-with"> {item.name} </td> 
                                            <td className="cart-item-table-with"> {item.model} </td>
                                            <td className="cart-item-table-with"> {item.price} </td>
                                            <td className="cart-item-table-with"> {item.qty} </td>
                                            <td className="cart-item-table-with"> {item.price * item.qty} </td>
                                        </tr>
                                        )
                                    })
                                    
                                }
                            </tbody>
                        </table>
                    </div>
            </Card.Body>
            <Card.Footer>
            <div className="d-flex flex-row justify-content-end mt-3">
                <table>
                    <tbody>
                        <tr>
                            <td> <h3 className="me-3"> TOTAL </h3> </td>
                            <td> <h3 className="me-3 ms-3"> {totalAmount} </h3></td>
                            <td> <h3 className="ms-3"> MMK </h3> </td>
                        </tr>

                        <tr>
                            <td> <h3 className="me-3"> DISCOUNT </h3> </td>
                            <td> <h3 className="me-3 ms-3"> {discount} </h3> </td>
                            <td> <h3 className="ms-3"> MMK </h3> </td>
                        </tr>

                        <tr>
                            <td> <h3 className="me-3"> NET AMOUNT </h3> </td>
                            <td> <h3 className="me-3 ms-3"> {netAmount} </h3> </td>
                            <td> <h3 className="ms-3"> MMK </h3> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </Card.Footer>
        </Card>
        </div>
        <div className="d-flex flex-row justify-content-center mt-3">
            <Button
                onClick={() => handlePrint(HTMLDivElement)}>
                Print
             </Button>
        </div>
        </>
    )
}