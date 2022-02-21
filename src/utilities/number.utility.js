const numeral = require('numeral');

export const changeNumberFormat = (value, numberFormat, char) => {

    if(numberFormat === 'number') {
        return numeral(value).format('0,0');
    }

    let charValue = '';

    if(char) {
        for(let x=0; x<value.length; x++) {
            charValue += char.filter(charData => Number(charData.set_number) === Number(value.charAt(x)))[0].set_char;
        }
    }

    return charValue;
}