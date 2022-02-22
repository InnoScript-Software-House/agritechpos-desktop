import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { zawgyi } from '../../utilities/translation.utility';

export const ItemExportToExcel = ({ props, open, close }) => {
    const { lang } = props.reducer;

    const [isOpen, setOpen] = useState(false);
    
    const closeHandler = () => {
        setOpen(false);
        close(false);
    }

    useEffect(() => {
        if(open) {
            setOpen(open);
        }
    }, [open]);


    return(
        <Modal
            show={isOpen}
            centered={true}
            backdrop={true}
        >
            <Modal.Header>
                <Modal.Title>
                    <span className={`title ${zawgyi(lang)}`}> Select Export Data Columns  </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

            </Modal.Body>

            <Modal.Footer>
                <Button className={`btn-small ${zawgyi(lang)}`}> Export </Button>
                <Button className={`btn-small btn-secondary ${zawgyi(lang)}`} onClick={closeHandler}> Close </Button>
            </Modal.Footer>
        </Modal>
    )
}