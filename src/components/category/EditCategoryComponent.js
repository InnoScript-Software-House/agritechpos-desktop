import React, { useState } from "react";
import { t, zawgyi } from "../../utilities/translation.utility";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { updateCategory } from "../../services/category.service";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";

export const EditCategoryComponent = ({ props, category, reload}) => {
    
    const { lang } = props.reducer;
    const { id } = props.match.params;
    
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const setData = () => {
        setName(category.name),
        setDescription(category.description)
    }

    const update = async () => {
        if(name === '') {
            dispatch(setOpenToastAction(t('toast-category'), t('valitation-category-name-empty'), 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            description: description
        }

        if(requestBody.name === category.name) {
            delete requestBody.name;
        }

        const response = await updateCategory(id, requestBody);

        if(response && response.success===false){
            dispatch(setOpenToastAction(t('toast-category'),response.message, 'danger'));
            setLoading(false);
            return;
        };

        dispatch(setOpenToastAction(t('toast-category'), t('toast-category-update-success'), 'success'));
        setLoading(false);
        reload();
        return;
    }

    const deleteCategory = () => {
        dispatch(setOpenDelModal({
            open: true,
            title: t('modal-delete-title'),
            message: t('modal-delete-message'),
            id: category.id,
            type: 'category'
        }));
    }

    useState(() => {
        if(category){
            setData();
        }
    }, [category]);

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span className={`${zawgyi(lang)}`}> {t('category-update-title')} </span>
                        <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={t('input-category-name')}
                            value={name || ''}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={t('input-category-description')}
                            value={description  || ''}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
                                
                <Card.Footer>
                    <Button 
                        className={`btn-small w-full ${zawgyi(lang)}`} 
                        disabled={loading}
                        onClick={() => update()}
                    >
                        {t('btn-update')}
                    </Button>

                    {category && category.items.length === 0 && (
                        <Button 
                            className={`btn-small btn-danger w-full mt-1 ${zawgyi(lang)}`} 
                            disabled={loading}
                            onClick={() => deleteCategory()}
                         >
                            {t('btn-delete')}
                        </Button> 
                    )}
                </Card.Footer>
            </Card>
        </>
    )

}