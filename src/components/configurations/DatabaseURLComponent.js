import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDatabaseUrl } from "../../redux/actions/config.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { t, zawgyi } from "../../utilities/translation.utility";

export const DatabaseURLComponent = ({ props }) => {

    const { lang } = props.reducer;

    const dispatch = useDispatch();
    const history = useHistory();

    const [url, setUrl] = useState('');
    
    const saveUrl = () => {

        if(url === '') {
            dispatch(setOpenToastAction(t('tost-configuration'), t('config-database-url-empty-error'), 'danger'));
            return;
        }

        dispatch(setDatabaseUrl(url));
        dispatch(setOpenToastAction(t('tost-configuration'), t('config-database-url-success'), 'success'));
        history.push('/');
        return;

    };

    return(
        <>
            <div className="d-md-flex flex-md-column">
                <p className={`${zawgyi(lang)}`}> {t('config-database-url-description')} </p>

                <InputGroup className="config-input-500">
                    <FormControl 
                        type="text"
                        placeholder={t('config-database-url-placehoder')}
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />

                    <Button 
                        className="btn btn-samll"
                        onClick={() => saveUrl()}
                    >
                        <span className={`${zawgyi(lang)}`}> {t('config-database-url-submit')} </span>
                    </Button>
                </InputGroup>
            </div>
        </>
    )
}