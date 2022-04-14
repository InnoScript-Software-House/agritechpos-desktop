import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Language } from "./Language";
import { AppToast } from "./toasts";
import { BsFillInboxesFill, BsFillFileEarmarkTextFill, BsCartCheckFill, BsLaptopFill, BsCreditCard, BsPeopleFill, BsFillPersonLinesFill, BsFillGearFill, BsFillFilePersonFill, BsBoxArrowInRight } from 'react-icons/bs';
import { t, zawgyi } from "../../utilities/translation.utility";

const menus = [
    { label: `${t('dashboard-page')}`, url: "/dashboard", icon: <BsLaptopFill className="me-2" size={20} />},
    { label: `${t('sale-page')}`, url: "/sale", icon: <BsCartCheckFill className="me-2" size={20} />},
    { label: `${t('inventory-page')}`, url: "/inventory", icon: <BsFillInboxesFill className="me-2" size={20} />},
    { label: `${t('invoice-page')}`, url: "/invoice", icon: <BsFillFileEarmarkTextFill className="me-2" size={20} /> },
    { label: `${t('credit-page')}`, url: "/credit", icon: <BsCreditCard className="me-2" size={20} />},
    { label: `${t('customer-page')}`, url: "/customer", icon: <BsPeopleFill className="me-2" size={20} /> },
    { label: `${t('profile-page')}`, url: "/profile", icon: <BsFillPersonLinesFill className="me-2" size={20} /> },
    { label: `${t('account-page')}`, url: "/account", icon: <BsFillFilePersonFill className="me-2" size={20} /> },
    { label: `${t('setting-page')}`, url: "/setting", icon: <BsFillGearFill className="me-2" size={20} /> },
    { label: `${t('logout-page')}`, url: "/logout", icon: <BsBoxArrowInRight className="me-2" size={20} /> }
];

export const Navigation = ({props}) => {
    const { history, lang } = props;
    const { pathname } = props.location;

    return(
        <> 
            <AppToast props={props} />

            <div className="d-md-flex flex-md-row justify-content-between align-item-center navigation-wrapper">
                <div className="d-md-flex flex-md-row justify-content-start align-items-center mb-3">
                    {menus.map((menu, index) => {
                        return(
                            <Button className={`btn-nav ms-2 ${menu.url === pathname ? 'btn-nav-active' : ''}`} key={`btn_id_${index}`} onClick={() => history.push(menu.url)}>
                                {menu.icon}
                               <span className={`${zawgyi(lang)}`}> {menu.label} </span>
                            </Button>
                        )
                    })}
                </div>

                <Language />
            </div>
        </>
    )
}