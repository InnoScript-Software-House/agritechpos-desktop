/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

// ** Framework Libraries
import { t } from "i18next";
import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// ** Redux 
// ** App Libraries
import { zawgyi } from "../../utilities/translation.utility";
import { generator } from "../../utilities/generatePassword.utility";

// ** Import Data Source
import '../../assets/css/landing/dbconnection.css';

export const DatabaseConfig = ({ lng, dbInfoHandler }) => {

    const dispatch = useDispatch();
    
    const [host, setHost] = useState('localhost');
    const [dbname, setName] = useState('');
    const [dbuser, setUser] = useState('');
    const [dbpass, setPass] = useState('');
    const [dbInfo, setdbInfo] = useState(null);
    const [err, setErr] = useState(null);
    const [showpass, setShowPass] = useState(false);
    const [isReady, setReady] = useState(false);
    const [testLoading, setTestLoading] = useState(false);

    const generatePassword = () => {
        const pwd = generator(16);
        setPass(pwd);
    }


    const submit = () => {
        if(host === '' || dbname === '' || dbuser === '' || dbpass === '') {
            setErr(t('db-config.submit-error'));
            return;
        }

        setdbInfo({
            db_host: host,
            db_name: dbname,
            db_user: dbuser,
            db_pass: dbpass
        });

        setErr(null);

        setReady(true);
        return;
    }

    const testConnection = () => {

        setTestLoading(true);
    }

    return (
        <>
            { !isReady && (
                <div className="flex-row m-3">
                    <p className={`${zawgyi(lng)}`}> {t('demo-text')}</p>
                    
                    <label className={`serial-key-label mb-2 mt-3 ${zawgyi(lng)}`}> {t('db-config.title')} </label>
                    <div className="d-flex flex-column">
                        <InputGroup className="db-config-form-group mb-3">
                            <FormControl
                                className={`${zawgyi(lng)}`}
                                type="text"
                                required={true}
                                value={host}
                                placeholder={t('db-config.placeholder.host')}
                                onChange={(e) => setHost(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className="db-config-form-group mb-3">
                            <FormControl
                                className={`${zawgyi(lng)}`}
                                type="text"
                                required={true}
                                value={dbname}
                                placeholder={t('db-config.placeholder.dbname')}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={16}
                                minLength={6}
                            />
                        </InputGroup>

                        <InputGroup className="db-config-form-group mb-3">
                            <FormControl
                                className={`${zawgyi(lng)}`}
                                type="text"
                                required={true}
                                value={dbuser}
                                placeholder={t('db-config.placeholder.dbuser')}
                                onChange={(e) => setUser(e.target.value)}
                                maxLength={16}
                                minLength={6}
                            />
                        </InputGroup>

                        <InputGroup className="db-config-form-group mb-3">
                            <Button onClick={() => setShowPass(!showpass)}>
                                {showpass ? <Eye /> : <EyeSlash /> }
                            </Button>

                            <FormControl
                                className={`${zawgyi(lng)}`}
                                type={showpass ? 'text' : 'password'}
                                required={true}
                                value={dbpass}
                                placeholder={t('db-config.placeholder.dbpass')}
                                onChange={(e) => setPass(e.target.value)}
                                maxLength={16}
                                minLength={8}
                            />

                            <Button 
                                className={`${zawgyi(lng)}`} 
                                onClick={() => generatePassword()}
                            > 
                                {t('db-config.btn-generate-password')} 
                            </Button>
                        </InputGroup>


                        <Button 
                            className={`${zawgyi(lng)}`} 
                            onClick={() => submit()}
                        > 
                        {t('db-config.btn-submit')}
                        </Button>
                    </div>

                    { err && (<label className={`err mt-3 mb-3 ${zawgyi(lng)}`}> {err} </label>)}
                </div>
            )}

            { isReady && (
                <div className="flex-row m-3">
                    <p className={`${zawgyi(lng)}`}> {t('demo-text')}</p>
                    
                    <label className={`serial-key-label mb-2 mt-3 ${zawgyi(lng)}`}> {t('db-config.testing.title')} </label>
                    <div className="d-flex flex-column">
                        <Button 
                            className={`${zawgyi(lng)}`} 
                            onClick={() => testConnection()}
                            disabled={testLoading}
                        > 
                        {t('db-config.testing.btn-test')}
                        </Button>
                    </div>

                    { err && (<label className={`err mt-3 mb-3 ${zawgyi(lng)}`}> {err} </label>)}
                </div>
            )}
        </>

    )
}