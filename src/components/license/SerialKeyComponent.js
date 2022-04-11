import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { useDispatch } from 'react-redux';

export const SerialKeyComponent = ({ retriveSerialKey }) => {

    const dispatch = useDispatch();

    const [key01, setKey01] = useState('');
    const [key02, setKey02] = useState('');
    const [key03, setKey03] = useState('');
    const [key04, setKey04] = useState('');
    const [key05, setKey05] = useState('');
    const [key06, setKey06] = useState('');

    const submit = () => {
        if(key01 === '' || key02 === '' || key03 === '' || key04 === '' || key05 === '' || key06 === '') {
            dispatch(setOpenToastAction('License Key', 'License key is required', 'danger'));
            return;
        }

        if(key01.length < 4 || key02.length < 4 || key03.length < 4 || key04.length < 4 || key05.length < 4 || key06.length < 4) {
            dispatch(setOpenToastAction('License Key', 'Invalid license key', 'danger'));
            return;
        }

        const serialNumber = `${key01}-${key02}-${key03}-${key04}-${key05}-${key06}`;

        retriveSerialKey(serialNumber);
    }

    return (
        <div className="d-md-flex flex-md-column">
            <label className="serial-key-label mb-3 mt-3"> License Key </label>

            <div className="d-md-flex flex-md-row">
                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key01}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey01(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key02}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey02(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key03}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey03(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key04}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey04(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key05}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey05(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key06}
                        placeholder={"XXXX"}
                        onChange={(e) => setKey06(e.target.value)}
                    />
                </InputGroup>

                <Button className="btn-serial-key-enter" onClick={() => submit()}> Submit </Button>
            </div>
        </div>
    )
}