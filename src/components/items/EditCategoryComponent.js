import React, { useState } from "react";
import { t, zawgyi } from "../../utilities/translation.utility";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { LoadingComponent } from "../general/Loading";
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { updateCategory } from "../../services/category.service";

export const EditCategoryComponent = ({ props, category, reload}) => {
    const { lang } = props.reducer;
    const { id } = props.match.params;
    const dispatch = useDispatch();

    const [ editCategory, setEditCategory ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ loadingData, setLoadingData ] = useState(true);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const setData = () => {
        setEditCategory(category),
        setName(category.name),
        setDescription(category.description)
    }

    const httpHandler = (response) => {
        if(response && response.success===false){
            dispatch(setOpenToastAction('Update Category',response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        };
        return dispatch(setOpenToastAction('Update Category', 'Updated Successfully', 'success'));
    };

    const updateCategory = async () => {
        const requestBody = {
            name: name,
            description: description
        }

        const fields = Object.keys(requestBody);
        fields.map((field) => {
            if(requestBody[field] === editCategory[field]){
                delete requestBody[field];
            }
        });
        
        if(Object.keys(requestBody).length > 0){
            setLoadingData(true);
            setLoading(true);

            const response = await updateCategory(id, requestBody);
            httpHandler(response);
            dispatch(setOpenToastAction('Update Category', 'Category is Updated', 'success'));
            setLoadingData(false);
            setLoading(false);
            reload();
        }
        return;
    }

    useState(() => {
        setLoadingData(true);
        if(category){
            setData();
            setLoadingData(false);
        }
    })

    return(
        <>
        <Card>
        <Card.Header>
                <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                    <span className={`${zawgyi(lang)}`}> {t('category-edit-title')} </span>
                    <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                </Card.Title>
            </Card.Header>
            { editCategory && !loadingData &&
            (
                <Card.Body>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-category-name')}`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-category-description')}`}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
            )
            }
            {editCategory && !loadingData && (
                <Card.Footer>
                    <Button 
                        className={`btn-small w-full ${zawgyi(lang)}`} 
                            disabled={loading}
                            onClick={() => updateCategory()}
                        >
                            {t('category-update-btn')}
                    </Button>
                </Card.Footer>
            )}

            { loadingData && (
                <Card.Body>
                    <LoadingComponent />
                </Card.Body>
            )}
        </Card>
        </>
    )

}