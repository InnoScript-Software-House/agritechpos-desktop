const imageUrlToBase64 = async (url) => {
    const data = await fetch(url).then(result => {
        return result
    }, error => {
        return null;
    });

    let blob;

    if(!data) {
        return url;
    }

    blob = await data.blob();

    if(blob && (blob.type === 'image/jpg' || blob.type === 'image/jpeg' || blob.type === 'image/png' || blob.type === 'image/gif')) {

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        })
    } 

    return url;
}

export const getBase64FromUrl = async (url) => {
    return await imageUrlToBase64(url);
}
