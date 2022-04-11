import React from "react";
import { Button } from "react-bootstrap";
import { Language } from "./Language";
import { AppToast } from "./toasts";

const menus = [
    { label: "Dashboard", url: "/dashboard"},
    { label: "Sale", url: "/sale"},
    { label: "Inventory", url: "/inventory"},
    { label: "Invoice", url: "/invoice"},
    { label: "Credit", url: "/credit" },
    { label: "Customer", url: "/customer"},
    { label: "Profile", url: "/profile"},
    { label: "Account", url: "/account"},
    { label: "Setting", url: "/setting"},
    { label: "Logout", url: "/logout"}
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