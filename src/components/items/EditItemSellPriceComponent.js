import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, FormControl, InputGroup, ToastHeader } from "react-bootstrap";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { updateItem } from "../../services/item.service";
import { t, zawgyi } from "../../utilities/translation.utility";
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

    const httpHandler = (response) => {
        if(response && response.success === false) {
            dispatch(setOpenToastAction(tostHeader, response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        }
    }

    const update = async () => {
        const requestBody = {
            percentage: percentage,
            fix_amount: fix_amount
        }

        setLoadingData(true);

        const response = await updateItem(id, requestBody);
        httpHandler(response);
        setLoadingData(false);
        setLoading(false);
        dispatch(setOpenToastAction(tostHeader, 'Item sell price is updated!', 'success'));
        reload();
        return;
    }

    const updateStatus = async () => {
        const requestBody = {
            active: status
        }

        setLoading(true);

        const response = await updateItem(id, requestBody);
        httpHandler(response);
        setLoading(false);
        dispatch(setOpenToastAction(tostHeader, 'Item publish status is updated!', 'success'));
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
                        <span className={`${zawgyi(lang)}`}> {t('item-edit-percentage')} </span>
                        <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => reload()} />
                    </Card.Title>
                </Card.Header>


                { loadingData && (
                    <Card.Body>
                        <LoadingComponent />
                    </Card.Body>
                )}

                { !loadingData && (
                    <Card.Body className="d-md-flex flex-md-row">
                        <div className="col-md-6 pe-3">
                            <div className="d-md-flex flex-md-column">
                                <label className={`mb-2 title ${zawgyi(lang)}`}> {t('item-percentage')} </label>
                                <label> Origin Price - { numeral(Number(item.price)).format('0,0') } MMK </label>
                                <label> Percentage - { Number(percentage)} % </label>
                                <label> Sell Price - { numeral(Number(item.price) + ((Number(item.price) * Number(percentage)) / 100)).format('0,0') } MMK </label>
                            </div>

                            <InputGroup className="d-md-flex flex-md-column mt-3">
                                <FormControl
                                    className={`w-full ${zawgyi(lang)}`}
                                    placeholder={t('item-percentage')}
                                    type="number"
                                    maxLength={3}
                                    minLength={1}
                                    max={100}
                                    min={0}
                                    value={percentage}
                                    onChange={e => setPercentage(e.target.value)}
                                /> 
                            </InputGroup>
                        </div>

                        <div className="col-md-6">
                            <div className="d-md-flex flex-md-column">
                                <label className={`mb-2 title ${zawgyi(lang)}`}> {t('item-fix-amount')} </label>
                                <label> Origin Price - {numeral(Number(item.price)).format('0,0')} MMK </label>
                                <label> Fix Amount - {fix_amount} MMK </label>
                                <label> Sell Price - {numeral(Number(item.price) + Number(fix_amount)).format('0,0')} MMK </label>
                            </div>

                            <InputGroup className="d-md-flex flex-md-column mt-3">
                                <FormControl
                                    className={`w-full ${zawgyi(lang)}`}
                                    placeholder={t('item-fix-amount')}
                                    type="number"
                                    value={fix_amount}
                                    onChange={e => setFixAmount(e.target.value)}
                                /> 
                            </InputGroup>
                        </div>
                    </Card.Body>
                )}

                { !loadingData && (
                    <Card.Footer>
                        <Button
                            className={`btn-small w-full ${zawgyi(lang)}`}
                            onClick={() => update()}
                            disabled={loading}
                        > 
                            {t('item-update-btn')} 
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Card className="mt-3">
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span className={`${zawgyi(lang)}`}> {t('item-status')} </span>
                        <Badge bg={item.active ? 'success' : 'danger'}>
                            { item.active ? 'Published' : 'Unpublished'}
                        </Badge>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup className="d-md-flex flex-md-row justify-content-start align-items-center">
                        <label className={`me-3 pe-3 ${zawgyi(lang)}`}> {t('item-change-status')} </label>
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
                        className={`btn-small w-full ${zawgyi(lang)}`}
                        onClick={() => updateStatus()}
                        disabled={loading}
                    > 
                        {t('item-update-btn')}
                    </Button>
                </Card.Footer>
            </Card>
        </>
    )
}