import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, FormControl, InputGroup } from "react-bootstrap";
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

    const update = async () => {
        const requestBody = {
            percentage: percentage,
            fix_amount: fix_amount
        }

        setLoadingData(true);

        const response = await updateItem(id, requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction(t('toast-item'), response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        }

        setLoadingData(false);
        setLoading(false);
        dispatch(setOpenToastAction(t('toast-item'), t('toast-item-sell-price-updte-success'), 'success'));
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
            dispatch(setOpenToastAction(t('toast-item'), response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        }

        setLoading(false);
        dispatch(setOpenToastAction(t('toast-item'), t('toast-item-sell-price-updte-success'), 'success'));
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
                        <span className={`title ${zawgyi(lang)}`}> {t('item-edit-percentage-title')} </span>
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
                                <label className={`mb-2 title ${zawgyi(lang)}`}> {t('table-col-sell-percentage')} </label>
                                <label> {t('table-col-sell-price')} - <span className="ms-3"> { numeral(Number(item.price)).format('0,0') } MMK </span> </label>
                                <label> {t('table-col-sell-percentage')} - <span className="ms-3"> { Number(percentage)} </span> </label>
                                <label> {t('table-col-sell-price-total')} - <span className="ms-3"> { numeral(Number(item.price) + ((Number(item.price) * Number(percentage)) / 100)).format('0,0') } MMK </span> </label>
                            </div>

                            <InputGroup className="d-md-flex flex-md-row mt-3 justify-content-center align-items-center">
                                <div className="col-md-6">
                                <FormControl
                                    className={`${zawgyi(lang)}`}
                                    placeholder={t('input-item-percentage')}
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

                        {/* <div className="col-md-6 pe-3">
                            <div className="d-md-flex flex-md-column">
                                <label className={`mb-2 title ${zawgyi(lang)}`}> {t('input-item-fix-amount')} </label>
                                <label> {t('table-col-sell-price')} - <span className="ms-3"> {numeral(Number(item.price)).format('0,0')} MMK </span> </label>
                                <label> {t('table-col-sell-fix-amount')} - <span className="ms-3"> {fix_amount} MMK </span> </label>
                                <label> {t('table-col-sell-price-total')} - <span className="ms-3"> {numeral(Number(item.price) + Number(fix_amount)).format('0,0')} MMK </span> </label>
                            </div>

                            <InputGroup className="d-md-flex flex-md-column mt-3">
                                <FormControl
                                    className={`w-full ${zawgyi(lang)}`}
                                    placeholder={t('input-item-fix-amount')}
                                    type="number"
                                    value={fix_amount}
                                    onChange={e => setFixAmount(e.target.value)}
                                /> 
                            </InputGroup>
                        </div> */}
                    </Card.Body>
                )}

                { !loadingData && (
                    <Card.Footer>
                        <Button
                            className={`btn-small w-full ${zawgyi(lang)}`}
                            onClick={() => update()}
                            disabled={loading}
                        > 
                            {t('btn-update')} 
                        </Button>
                    </Card.Footer>
                )}
            </Card>

            <Card className="mt-3">
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span className={`title ${zawgyi(lang)}`}> {t('table-active')} </span>
                        <Badge bg={item.active ? 'success' : 'danger'}>
                            { item.active ? 'Published' : 'Unpublished'}
                        </Badge>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup className="d-md-flex flex-md-row justify-content-start align-items-center">
                        <label className={`me-3 pe-3 ${zawgyi(lang)}`}> {t('table-active')} </label>
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
                        {t('btn-update')}
                    </Button>
                </Card.Footer>
            </Card>
        </>
    )
}