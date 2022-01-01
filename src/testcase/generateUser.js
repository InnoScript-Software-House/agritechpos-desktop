
const chars= ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n','o', 'p', 'q', 'r','s','t', 'u', 'v', 'w', 'x', 'y', 'z'];

export const getRandomName = (nameLength) => {
    let name = '';

    for(let x=0; x<=nameLength; x++) {
        const randomInteger = Math.floor(Math.random() * (chars.length - 1 + 1)) + 1;
        name += chars[randomInteger];
    }

    return name;
}