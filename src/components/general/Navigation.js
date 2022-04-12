import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Language } from "./Language";
import { AppToast } from "./toasts";
import { t } from  'i18next';

const menus = [
    { label: `${t('dashboard-page')}`, url: "/dashboard"},
    { label: `${t('sale-page')}`, url: "/sale"},
    { label: `${t('inventory-page')}`, url: "/inventory"},
    { label: `${t('invoice-page')}`, url: "/invoice"},
    { label: `${t('credit-page')}`, url: "/credit" },
    { label: `${t('customer-page')}`, url: "/customer"},
    { label: `${t('profile-page')}`, url: "/profile"},
    { label: `${t('account-page')}`, url: "/account"},
    { label: `${t('setting-page')}`, url: "/setting"},
    { label: `${t('logout-page')}`, url: "/logout"}
];

export const Navigation = ({props}) => {
    const { history } = props;
    const { pathname } = props.location;

    return(
        <> 
            <AppToast props={props} />

            <div className="d-md-flex flex-md-row justify-content-between align-item-center navigation-wrapper">
                <div className="d-md-flex flex-md-row justify-content-start align-items-center mt-3 mb-3">
                    {menus.map((menu, index) => {
                        return(
                            <Button className={`btn-nav ms-2 ${menu.url === pathname ? 'btn-nav-active' : ''}`} key={`btn_id_${index}`} onClick={() => history.push(menu.url)}>
                               {menu.label}
                            </Button>
                        )
                    })}
                </div>

                <Language />
            </div>
        </>
    )
}