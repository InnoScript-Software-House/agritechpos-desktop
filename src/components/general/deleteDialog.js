import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { delRequest, postRequest } from '../../services/api.service';
import { t, zawgyi } from '../../utilities/translation.utility';

export const DeleteDialog = ({ props, reload }) => {

    const { lang, delModal } = props.reducer;
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const handlerException = (response) => {
        if(response && response.status === 0) {
            dispatch(setOpenToastAction('Network Error', 'Please check your database connection', 'danger'));
        }

        if(response && (response.status !== 200 || response.status !== 201)) {
            return ;
       }
        return response;
    }

    const closeModal = () => {
        setIsOpen(false);
        dispatch(setOpenDelModal({open: false}));
    }

    const confirmDelete = async () => {
        const response = await delRequest(`${delModal.type}/${delModal.id}`);
        handlerException(response);
        closeModal();
        dispatch(setOpenToastAction(delModal.title, delModal.type+' deleted Successfully'), 'success');
        reload();
    }

    const multipleDeleted = async () => {
        const requestBody = delModal.data ? delModal.data.map((value) => {
            return value.id
        }) : [];

       const response = await postRequest(`${delModal.type}/delete`, { data: requestBody });
       handlerException(response);
       closeModal();
       dispatch(setOpenToastAction(delModal.title, delModal.type+' deleted Successfully'), 'success');
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
                    onClick={() => delModal.multiple ? multipleDeleted() : confirmDelete()}
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