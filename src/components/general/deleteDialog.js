import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { delRequest, postRequest } from '../../services/api.service';

export const DeleteDialog = ({ props, reload }) => {

    const { delModal } = props.reducer;
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        dispatch(setOpenDelModal({open: false}));
    }

    const confirmDelete = async () => {
        const response = await delRequest(`${delModal.type}/${delModal.id}`);
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Delete Record', response.message, 'danger'));
            closeModal();
            return;
        }

        closeModal();
        dispatch(setOpenToastAction(delModal.title, 'Records are deleted', 'success'));
        reload();
        return;
    }

    const multipleDeleted = async () => {
        const requestBody = delModal.data ? delModal.data.map((value) => {
            return value.id
        }) : [];

        const response = await postRequest(`${delModal.type}/delete`, { data: requestBody });
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Delete Record', response.message, 'danger'));
            closeModal();
            return;
        }

        closeModal();
        dispatch(setOpenToastAction(delModal.title, 'Records are deleted', 'success'));
        reload();
        return;
    }

    useEffect(() => {
        if(delModal) {
            setIsOpen(delModal.open);
        }
    }, [delModal]);

    return(
        <Modal show={isOpen}>
            <Modal.Header>
                <Modal.Title> {delModal.title} </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p> {delModal.message} </p>
            </Modal.Body>

            <Modal.Footer>
                <Button className="btn-small" onClick={() => delModal.multiple ? multipleDeleted() : confirmDelete()}> Confirm </Button>
                <Button className="btn-small btn-secondary" onClick={() => closeModal()}> Close </Button>
            </Modal.Footer>
        </Modal>
    )
}