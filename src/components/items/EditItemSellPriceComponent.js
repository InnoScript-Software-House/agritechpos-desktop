import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { updateItem } from "../../services/item.service";
import { LoadingComponent } from "../general/Loading";


export const EditItemSellPriceComponent = ({ props, item, reload }) => {

    const { lang } = props.reducer;
    const { id } = props.match.params;

    const dispatch = useDispatch();

    const [percentage, setPercentage] = useState(0);
    const [fix_amount, setFixAmount] = useState(0);
    const [status, setStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const tostHeader = 'Update Item Selling Amount';

    const setData = () => {
        setPercentage(item.percentage);
        setFixAmount(item.fix_amount);
        setStatus(item.active ? 1 : 0)
    }

    const update = async () => {
        const requestBody = {
            percentage: percentage,
            fix_amount: fix_amount
        }

        setLoadingData(true);

        const response = await updateItem(id, requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Update Item Percentage', response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        }

        setLoadingData(false);
        setLoading(false);
        dispatch(setOpenToastAction('Update Item Percentage','Item percentage is updated', 'success'));
        reload();
        return;
    }

    const updateStatus = async () => {
        const requestBody = {
            active: status
        }

        setLoading(true);

        const response = await updateItem(id, requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Update Item Status', response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        }

        setLoading(false);
        dispatch(setOpenToastAction('Update Item Percentage', 'Item status is updated', 'success'));
        reload();
        return;
    }

    useEffect(() => {
        if(item) {
            setLoading(false);
            setLoadingData(false);
            setData();
        }
    }, [item]);

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span className="title"> Update Item Percentage </span>
                        <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => reload()} />
                    </Card.Title>
                </Card.Header>


                { loadingData && (
                    <Card.Body>
                        <LoadingComponent />
                    </Card.Body>
                )}

                { !loadingData && (
                    <Card.Body className="d-md-flex flex-md-column">
                        <div className="row-md-6 pe-3">
                            <div className="d-md-flex flex-md-column align-items-center">
                                <label className="mb-2 title"> Sell Percentage </label>
                                <label> Price - <span className="ms-3"> { numeral(Number(item.price)).format('0,0') } MMK </span> </label>
                                <label> Percentage - <span className="ms-3"> { Number(percentage)} </span> </label>
                                <label> Total - <span className="ms-3"> { numeral(Number(item.price) + ((Number(item.price) * Number(percentage)) / 100)).format('0,0') } MMK </span> </label>
                            </div>

                            <InputGroup className="d-md-flex flex-md-row mt-3 justify-content-center align-items-center">
                                <div className="col-md-6">
                                    <FormControl
                                        placeholder="Enter sell perentage"
                                        type="number"
                                        maxLength={3}
                                        minLength={1}
                                        max={100}
                                        min={0}
                                        value={percentage}
                                        onChange={e => setPercentage(e.target.value)}
                                    /> 
                                </div>
                            </InputGroup>
                        </div>
                    </Card.Body>
                )}

                { !loadingData && (
                    <Card.Footer>
                        <Button onClick={() => update()} disabled={loading}> Update </Button>
                    </Card.Footer>
                )}
            </Card>

            <Card className="mt-3">
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span className="title"> Item Status </span>
                        <Badge bg={item.active ? 'success' : 'danger'}>
                            { item.active ? 'Published' : 'Unpublished'}
                        </Badge>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup className="d-md-flex flex-md-row justify-content-start align-items-center">
                        <label className="me-3 pe-3"> Status </label>
                        <FormControl
                            className="ms-3 pe-3"
                            as="select"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value={1}> Publish </option>
                            <option value={0}> Unpublish </option>
                        </FormControl>
                    </InputGroup>
                </Card.Body>

                <Card.Footer>
                    <Button
                        className="btn-small w-full"
                        onClick={() => updateStatus()}
                        disabled={loading}
                    > 
                       Update
                    </Button>
                </Card.Footer>
            </Card>
        </>
    )
}