/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";

import '../../assets/css/serial-key-form.css';

export const SerialKeyForm = ({ lng, retriveSerialKey }) => {

    const [key01, setKey01] = useState('');
    const [key02, setKey02] = useState('');
    const [key03, setKey03] = useState('');
    const [key04, setKey04] = useState('');
    const [key05, setKey05] = useState('');
    const [key06, setKey06] = useState('');

    const [err, setErr] = useState(null);

    const submit = () => {
        if(key01 === '' || key02 === '' || key03 === '' || key04 === '' || key05 === '' || key06 === '') {
            setErr(t('serial-key-error'));
            return;
        }

        if(key01.length < 4 || key02.length < 4 || key03.length < 4 || key04.length < 4 || key05.length < 4 || key06.length < 4) {
            setErr(t('serial-key-error'));
            return;
        }

        setErr(null);

        const serialNumber = `${key01}-${key02}-${key03}-${key04}-${key05}-${key06}`;

        /**
         * Need to validate serial key process
         * .... proesss
        */

         retriveSerialKey(serialNumber);
        
    }

    return (
        <div className="flex-row m-2">
            <p className={`${zawgyi(lng)}`}> {t('serial-description')}</p>
            
            <label className={`serial-key-label mb-3 mt-3 ${zawgyi(lng)}`}> {t('serial-key-enter')} </label>
            <div className="d-flex flex-row">
                <InputGroup className="serial-key-input">
                    <FormControl
                        type="text"
                        maxLength={4}
                        minLength={4}
                        required={true}
                        value={key01}
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
                        onChange={(e) => setKey06(e.target.value)}
                    />
                </InputGroup>

                <Button 
                    className={`btn-serial-key-enter ${zawgyi(lng)}`} 
                    onClick={() => submit()}
                > 
                    {t('serial-key-submit')} 
                </Button>
            </div>

            { err && (<label className={`serial-key-err-message mt-3 mb-3 ${zawgyi(lng)}`}> {err} </label>)}
            
        </div>
    )
}