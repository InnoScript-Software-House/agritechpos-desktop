import React from "react";
import { Button, ToastContainer} from "react-bootstrap";
import { Language } from "./Language";
import { t, zawgyi } from "../../utilities/translation.utility";
import * as menulist from '../../assets/data/menulist.json';
import { AppToast } from "./toasts";

import '../../assets/css/components/navigation.css';

export const Navigation = ({props}) => {

    const menus = menulist.default;
    const { lang } = props.reducer;
    const { history } = props;

    return(
        <> 
            <ToastContainer position="top-end" bsPrefix="app-toast-container">
                <AppToast props={props} />
            </ToastContainer>

            <div className="d-flex flex-row justify-content-between navigation-wrapper">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    {menus.map((menu, index) => {
                        return(
                            <Button
                                className={`btn-nav ms-2 ${zawgyi(lang)}`}
                                key={`btn_id_${index}`}
                                onClick={() => history.push(menu.url)}
                            >
                                {t(menu.label)} 
                            </Button>
                        )
                    })}
                </div>

                <div className="lang-overwrite">
                    <Language props={props}/>
                </div>
            </div>
        </>
    )
}