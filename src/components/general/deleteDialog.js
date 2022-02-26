import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';
import { delRequest } from '../../services/api.service';
import { t, zawgyi } from '../../utilities/translation.utility';

export const DeleteDialog = ({ props, reload }) => {

    const { lang, delModal } = props.reducer;
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const handlerException = (response) => {
        if(response && response.status === 0) {
            return null;
        }
        return response;
    }

    const closeModal = () => {
        dispatch(setOpenDelModal({open: false}));
    }

    const confirmDelete = async (id, type) => {
        const response = await delRequest(`${type}/${id}`);
        handlerException(response);
        setIsOpen(false);
        reload();
    }

    useEffect(() => {
        if(delModal) {
            setIsOpen(delModal.open);
        }
    }, [delModal]);

    return(
        <Modal
            show={isOpen}
        >
            <Modal.Header>
                <Modal.Title>
                    <span className={`${zawgyi(lang)}`}> {delModal.title} </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className={`${zawgyi(lang)}`}> {delModal.message} </p>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    className={`btn-small ${zawgyi(lang)}`}
                    onClick={() => confirmDelete(delModal.id, delModal.type)}
                > 
                    <span className={`${zawgyi(lang)}`}> Confirm </span> 
                </Button>
                <Button 
                    className={`btn-small btn-secondary ${zawgyi(lang)}`}
                    onClick={() => closeModal()}
                > Close 
                </Button>
            </Modal.Footer>
        </Modal>
    )
}