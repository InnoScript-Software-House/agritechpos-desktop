import React, { useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { saveCategory } from '../../services/category.service';
import { t, zawgyi } from '../../utilities/translation.utility';

export const CreateCategoryComponent = ({ props, reload }) => {

    const { lang } = props.reducer;

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState('');

    const reset = () => {
        setName('');
        setDescription('');
        setLoading(false);
    }

    const createCategory = async () => {
        if(name === '') {
            dispatch(setOpenToastAction(t('toast-category'), t('valitation-category-name-empty'), 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            description: description
        }

        setLoading(true);

        const response = await saveCategory(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction(t('toast-category'), response.message, 'danger'));
            setLoading(false);
            return;
        }

        dispatch(setOpenToastAction(t('toast-category'), t('toast-category-create-success'), 'success'));
        setLoading(false);
        reset();
        reload(true);
        return;
    }

    return(
        <Card className='mt-3'>
        <Card.Header>
            <Card.Title>
                <span className={`title ${zawgyi(lang)}`}> {t('category-create-title')} </span>
            </Card.Title>
        </Card.Header>

        <Card.Body>
            <InputGroup className="mb-3">
                <FormControl 
                    className={`${zawgyi(lang)}`}
                    type='text'
                    placeholder={t('input-category-name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl 
                    className={`${zawgyi(lang)}`}
                    type='text'
                    placeholder={t('input-category-description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </InputGroup>

            <Button
                className={`btn btn-samll ${zawgyi(lang)}`}
                disabled={loading}
                onClick={() => createCategory()}
            > 
                {t('btn-create')} 
            </Button>
        </Card.Body>
    </Card>
    )
}