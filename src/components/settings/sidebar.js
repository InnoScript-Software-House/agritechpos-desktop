import React from 'react';
import { BsArrowRightShort } from "react-icons/bs";

const menus = [
    {
        "label": "Shop",
        "component": "ShopComponent"
    },
    {
        "label": "Number Specification",
        "component": "NumberSpecificationComponent"
    },
    {
        "label" : "Invoice",
        "component" : "InvoiceComponent"
    },
    {
        "label" : "Backup",
        "component" : "BackUpComponent"
    }
    // {
    //     "label": "Device",
    //     "component": "DeviceComponent"
    // }
];

export const SideBarComponent = ({ getComponent }) => {

    return(
        <div className='d-md-flex flex-column sidebar-wrapper'>
            <div className='m-2'>
                <h3 className="sidebar-title mt-2"> Setting </h3>

                <ul className='sidebar-list'>
                    {menus.map((value, index) => {
                        return(
                            <li 
                                key={`setting_lists_id_${index}`}
                                onClick={() => getComponent(value.component)}
                            > 
                                <BsArrowRightShort size={30} /> 
                                <span> {value.label} </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}