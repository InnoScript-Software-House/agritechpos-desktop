import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { BsArrowRightShort, BsDisplay } from "react-icons/bs";
import { getDevice } from "../../services/license.service";

import '../../assets/css/components/device-update.css';

export const UpdateDeviceComponent = ({ props }) => {
    const { lang } = props.reducer;
    const [limit, setLimit] = useState(null);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [ip, setIP] = useState('');
    const [mac, setMac] = useState('');

    const createDevice = () => {

        if(name === '' || ip === '' || mac === '') {
            setError(t('device-create-empty-error'));
            return;
        }
    }

    const fetchApi = useCallback(async() => {
        const response = await getDevice();

        if(response && response.success === false) {
            return setError(response.message);
        }

        // setLimit(Number(response.plan.device));
        setLimit(10);
    },[]);

    useEffect(() => {
        fetchApi()
    },[fetchApi]);

    return(
        <div className="col-md-3">
            <Card>
                <Card.Title className="p-3 device-update-title"> 
                    <span className={`${zawgyi(lang)}`}> {t('device-update-title')} </span>
                </Card.Title>

                <Card.Body className="d-md-flex flex-column justify-content-md-start">
                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={name}
                            placeholder={t('device-input-name')}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={ip}
                            placeholder={t('device-input-ip-address')}
                            onChange={(e) => setIP(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={mac}
                            placeholder={t('device-input-mac-address')}
                            onChange={(e) => setMac(e.target.value)}
                        />
                    </InputGroup>

                    <Button className={`btn-device-create ${zawgyi(lang)}`} onClick={() => createDevice()}> {t('btn-device-create')} </Button>

                    {error && (<span className="device-error"> {error} </span>)}
                </Card.Body>
            </Card>
        </div>
    )
}