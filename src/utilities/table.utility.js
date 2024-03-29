

export const autocomplete = (dataSource, text, columnName) => {
    const textString = text;

    const filterResult = dataSource.filter((result, index) => {

        let filterText = result[columnName] ? result[columnName] : '';

        if(Number(result[columnName])) {
            filterText = result[columnName].toString();
            if(filterText.includes(textString)) {
                return result;
            }
        }

        if(filterText.toLowerCase().includes(textString.toLowerCase())) {
            return result;
        }

    });

    return filterResult;
    

}

export const calculatePercentageAmount = (dataSource, percentageValue) => {
    let resultTable = [];
    resultTable = dataSource;
     const result = resultTable.map(e => e.percentage = Number(e.percentage) + Number(percentageValue));
        const requestBody = {
            percentage: result.map(e => e)
        }
        // Api Update For All percentage.
    return result;
}
