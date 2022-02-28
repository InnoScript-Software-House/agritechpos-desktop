
export const autocomplete = (dataSource, text, columnName) => {
    const textString = text;

    const filterResult = dataSource.filter((result, index) => {

        let filterText = result[columnName] ? result[columnName] : '';

        // if(Number(result[columnName]) && Array(result[columnName])){
        //     filterText = result[columnName].length.toString();
        //     if(filterText.includes(textString)){
        //         console.log(result)
        //         return result;
        //     }
        // }

        if(Number(result[columnName])) {
            filterText = result[columnName].toString();
            if(filterText.includes(textString)) {
                console.log(result)
                return result;
            }
        }

        if(filterText.toLowerCase().includes(textString.toLowerCase())) {
            console.log(result)
            return result;
        }

    });

    return filterResult;
    

}
