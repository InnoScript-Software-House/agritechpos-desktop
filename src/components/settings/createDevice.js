import React, {useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { createDevice } from "../../services/device.service";
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action'

import '../../assets/css/components/device-create.css';

export const CreateeDeviceComponent = ({ props, disable, reload }) => {

    const { lang } = props.reducer;
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [ip, setIP] = useState('');
    const [mac, setMac] = useState('');
    const [note, setNote] = useState('');

    const create = async () => {

        if(name === '' || ip === '' || mac === '') {
            dispatch(setOpenToastAction('Device Creatae', t('device-create-empty-error'), 'danger'));
            // setError(t('device-create-empty-error'));
            return;
        }

        const requestBody = {
            name: name,
            ip: ip,
            mac: mac,
            note: note
        }

        const response = await createDevice(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Device Create', response.message, 'danger'));
            return;
        }

        setError(null);
        reload(true);
    }

    return(
        <div className="col-md-3">
            <Card>
                <Card.Title className="p-3 device-create-title"> 
                    <span className={`${zawgyi(lang)}`}> {t('device-create-title')} </span>
                </Card.Title>

                <Card.Body className="d-md-flex flex-column justify-content-md-start">
                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={name}
                            placeholder={t('device-input-name')}
                            onChange={(e) => setName(e.target.value)}
                            disabled={disable}
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={ip}
                            placeholder={t('device-input-ip-address')}
                            onChange={(e) => setIP(e.target.value)}
                            disabled={disable}
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={mac}
                            placeholder={t('device-input-mac-address')}
                            onChange={(e) => setMac(e.target.value)}
                            disabled={disable}
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            value={note}
                            placeholder={t('device-input-mac-note')}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={disable}
                        />
                    </InputGroup>

                    <Button 
                        className={`btn-device-create ${zawgyi(lang)}`} 
                        onClick={() => create()}
                        disabled={disable}
                    > 
                        {t('btn-device-create')} 
                    </Button>

                    {/* {error && (<span className="device-error"> {error} </span>)} */}
                </Card.Body>
            </Card>
        </div>
    )
}