import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, FormControl, InputGroup, Table } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { BsArrowUpLeftSquare, BsCheckCircle, BsDashCircle } from "react-icons/bs";

import '../../assets/css/components/device-list.css';
import { updateDevice } from "../../services/device.service";

export const DeviceListComponent = ({ props, dataSource, reload }) => {

    const { lang } = props.reducer;
    const { device } = props.reducer; 

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [ip, setIp] = useState('');
    const [mac, setMac] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const openEditForm = (value) => {
        setEdit(true);
        setIp(value.ip);
        setMac(value.mac);
        setName(value.name);
        setNote(value.note);
        setSelectedDevice(value);
    }

    const update = async () => {
        let updateRequest = {};

        if(name === '' || ip === '' || mac === '') {
            setError(t('device-update-empty-error'));
            return;  
        }

        if(selectedDevice.ip !== ip) {
            updateRequest.ip = ip
        }

        if(selectedDevice.mac !== mac) {
            updateRequest.mac = mac
        }

        updateRequest.name = name;
        updateRequest.note = note;

        const response = await updateDevice(selectedDevice.id, updateRequest);

        if(response && response.success === false) {
            setError(response.message);
            return;
        }

        reload(true);
        setEdit(false);
    }

    const changeStatus = async(id, status) => {
        const response = await updateDevice(id, {active: status});

        if(response && response.success === false) {
            setError(response.message);
            return;
        }

        reload(true);
        setEdit(false);
    }

    return(
        <div className="col-md-9">

            <Card>
                <Card.Title className="p-3 device-list-title"> 
                    <span className={`${zawgyi(lang)}`}> {t('device-list-title')} </span>
                </Card.Title>

                {edit && (
                <Card.Body className="d-md-flex flex-column">
                    <InputGroup>
                        <FormControl
                            className={`${zawgyi(lang)}`} 
                            placeholder={t('input-device-name')}
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <FormControl 
                            className={`${zawgyi(lang)}`}
                            placeholder={t('input-device-ip')}
                            type="text"
                            value={ip}
                            onChange={e => setIp(e.target.value)}
                        />

                        <FormControl 
                            className={`${zawgyi(lang)}`}
                            placeholder={t('input-device-mac')}
                            type="text"
                            value={mac}
                            onChange={e => setMac(e.target.value)}
                        />

                        <FormControl 
                            className={`${zawgyi(lang)}`}
                            placeholder={t('input-device-note')}
                            type="text"
                            value={note || ''}
                            onChange={e => setNote(e.target.value)}
                        />

                        <Button
                            className={`btn-device-update ms-2 ${zawgyi(lang)}`}
                            onClick={() => update()}
                        > 
                            {t('btn-update')} 
                        </Button>
                    </InputGroup>

                    {error && (<span className="device-update-error"> { error } </span>)}
                </Card.Body>
                )}

                <Card.Body className="d-md-flex flex-row justify-content-md-evenly flex-md-wrap">
                    <Table striped bordered hover>
                        <thead>
                            <tr className={`${zawgyi(lang)}`}>
                                <th>#</th>
                                <th> {t('device-table-title-name')} </th>
                                <th> {t('device-table-title-ip')} </th>
                                <th> {t('device-table-title-mac')} </th>
                                <th> {t('device-table-title-note')} </th>
                                <th> {t('device-table-title-status')} </th>
                                <th> {t('device-table-title-option')} </th>
                            </tr>
                        </thead>

                        <tbody>
                            {dataSource.length > 0 && dataSource.map((value, index) => {
                                return(
                                    <tr key={`device_id_${index + 1}`}>
                                        <td> {index + 1} </td>
                                        <td> {value.name} </td>
                                        <td> {value.ip} </td>
                                        <td> {value.mac} </td>
                                        <td> {value.note} </td>
                                        <td>
                                            <Badge bg={value.active === true ? 'success' : 'danger'}>
                                                {value.active === true ? 'Active' : 'Disable'}
                                            </Badge>
                                        </td>
                                        <td>
                                            {device.address === value.ip || device.mac === value.mac ? (
                                                <span> ----- </span> 
                                            ) : (
                                                <>
                                                    <BsArrowUpLeftSquare 
                                                        className="btn-icon-edit"
                                                        size={20} 
                                                        onClick={() => openEditForm(value)} 
                                                    />
                                                    {
                                                        value.active ? (
                                                            <BsDashCircle 
                                                                className="ms-3 btn-icon-edit danger"
                                                                size={20} 
                                                                onClick={() => changeStatus(value.id, false)}
                                                            />
                                                        ) : (
                                                            <BsCheckCircle
                                                                className="ms-3 btn-icon-edit success"
                                                                size={20}
                                                                onClick={() => changeStatus(value.id, true)}
                                                            />
                                                        )
                                                    }
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}