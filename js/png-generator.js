async function makeImage(width, height, svgElem, imgElem, datatype='image/png') {
    // https://stackoverflow.com/a/74026755/6542268

    const svgDataHeader = 'data:image/svg+xml;charset=utf-8';

    const loadImage = async url => {
        const tempImgElem = document.createElement('img');
        tempImgElem.src = url;
        return new Promise((resolve, reject) => {
            tempImgElem.onload = () => resolve(tempImgElem);
            tempImgElem.onerror = reject;
        });
    }

    const encodeAsUTF8 = str => `${svgDataHeader},${encodeURIComponent(str)}`;
    const encodeAsB64 = str => `${svgDataHeader};base64,${btoa(str)}`;

    const xmlString = encodeAsUTF8(new XMLSerializer().serializeToString(svgElem));

    const img = await loadImage(xmlString);

    const canvasElem = document.createElement('canvas');
    canvasElem.width = width;
    canvasElem.height = height;
    canvasElem.getContext('2d').drawImage(img, 0, 0, width, height);

    const dataURL = await canvasElem.toDataURL(datatype, 1.0);

    imgElem.src = dataURL;
}
