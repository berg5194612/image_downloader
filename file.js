import fs from "fs";
import fetch from "node-fetch";
import FileType from "file-type";

const allUrl = "https://giftis.ru/email/email_pic/block2.jpg, https://giftis.ru/email/email_pic/block3.jpg";
const links = allUrl.replace(/ /g, '').split(',')
console.log(links)

links.forEach(link => {
    savePhotoFromAPI(link)
});


async function savePhotoFromAPI(link) {
    const imageName = link.split('/').pop(-1)
    const response = await fetch(link);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = await FileType.fromBuffer(buffer);
    if (fileType.ext) {
        const outputFileName = `images/${imageName}`
        fs.createWriteStream(outputFileName).write(buffer);
        console.log('Ready: ' + imageName)
    } else {
        console.log('Type not found')
    }
}