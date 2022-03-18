import React from "react";
import { Button, ToastContainer} from "react-bootstrap";
import { AppToast } from "./toasts";

const menus = [
    // { label: "Dashboard", url: "/dashboard"},
    { label: "Sale", url: "/sale"},
    { label: "Inventory", url: "/inventory"},
    { label: "Invoice", url: "/invoice"},
    { label: "Credit", url: "/credit" },
    { label: "Profile", url: "/profile"},
    { label: "Account", url: "/account"},
    { label: "Setting", url: "/setting"},
    { label: "Logout", url: "/logout"}
];

export const Navigation = ({props}) => {
    const { history } = props;

    return(
        <> 
            <ToastContainer position="top-end" bsPrefix="app-toast-container">
                <AppToast props={props} />
            </ToastContainer>

            <div className="d-md-flex flex-md-row justify-content-between navigation-wrapper">
                <div className="d-md-flex flex-md-row justify-content-start align-items-center mt-3 mb-3">
                    {menus.map((menu, index) => {
                        return(
                            <Button className="btn-nav ms-2" key={`btn_id_${index}`} onClick={() => history.push(menu.url)}>
                               {menu.label}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}