import React, { useEffect, useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { saveCategory } from "../../services/category.service";

export const CreateCategoryComponent2 = ({props, reload}) => {
    const { lang } = props.reducer;
    const [ btnLoading, setBtnLoading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const dispatch = useDispatch();

    const httpHandler = (response) => {
        if(response && response.success === false){
            dispatch(setOpenToastAction('Create Item', response.message, 'danger'));
            setBtnLoading(false);
            return;
        }
        return dispatch(setOpenToastAction('Create Item', 'Category Created Successfully', 'success'));
    }

    const createCategory = async () => {
        if(name === '') {
            dispatch(setOpenToastAction('Create Category', t('category-error-empty'), 'danger'));
            return;
        }
        const requestBody = {
            name: name,
            description: description
        }

        setBtnLoading(true);

        const response = await saveCategory(requestBody);
        httpHandler(response);
        setBtnLoading(false);
        reload();
    }

    useEffect(() => {
        
    })

    return (
        <>
        <Card className="mt3">
            <Card.Header>
                <Card.Title>
                    <span className={`${zawgyi(lang)} card-title`}>{t('create-category-title')}</span>
                </Card.Title>
            </Card.Header>

            <Card.Body>
                <InputGroup>
                    <FormControl
                     className={`${zawgyi(lang)}`}
                     type = "text"
                     placeholder={t('input-create-name')}
                     value = {name}
                     onChange ={e => setName(e.target.value)}/>
              </InputGroup>

              <InputGroup>
                    <FormControl
                     className={`${zawgyi(lang)}`}
                     type = "text"
                     placeholder={t('input-create-description')}
                     value = {description}
                     onChange ={e => setDescription(e.target.value)}/>
              </InputGroup>
            </Card.Body>

            <Card.Footer className="d-flex flex-column">
                <Button
                className={`btn-small ${zawgyi(lang)} mb-3`}
                onClick ={ () => createCategory()}
                disabled ={btnLoading}
                >
                    {t('create-category-btn-save')}
                </Button>
            </Card.Footer>
        </Card>
        </>
    )
}