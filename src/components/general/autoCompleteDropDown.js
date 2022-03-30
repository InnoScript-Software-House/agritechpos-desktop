import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { zawgyi } from "../../utilities/translation.utility";

const CustomMenu = React.forwardRef(({options, dataSource, chooseItem}, ref) => {

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const lang = useSelector(state => state.lang);

    const searchResult = (text) => {
        setText(text);

        if(text === '') {
            setSuggestions([]);
            return;
        }

        const suggestionResult = items.filter((item) => item[options.search_name].toLowerCase().includes(text.toLowerCase()));
        setSuggestions(suggestionResult);
    }

    const selectedItem = (item) => {
        setText(item[options.search_name]);
        setSuggestions([]);
        chooseItem(item);
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource);
        }
    }, [dataSource]);

    return(
        <>
            <FormControl 
                className={`${zawgyi(lang)}`}
                type={options.type}
                placeholder={options.placeholder}
                value={text}
                onChange={(e) => searchResult(e.target.value)}
            />

        <div className="dropdown-wrapper">
            {suggestions.length > 0 && suggestions.map((value, index) => {
                return(
                    <Dropdown.Item 
                        key={`suggestion_id_${index}`}
                        eventKey={value.id}
                        onClick={() => selectedItem(value)}
                        onKeyPress={(e) => {
                            if(e.code === 'Enter') {
                                selectedItem(value)
                            }
                        }}
                    > 
                        {value[options.search_name]} 
                    </Dropdown.Item>
                )
            })}
        </div>
        </>

    )
});

export const AutoCompleteDropDown = ({dataSource, inputOption, chooseItem}) => {
    return(
        <Dropdown>
            <Dropdown.Menu 
                show={true}
                as={CustomMenu} 
                options={inputOption} 
                dataSource={dataSource} 
                chooseItem={(e) => chooseItem(e)}
            />
        </Dropdown>
    );
}