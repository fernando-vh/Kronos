const fs = require("fs");
const path = require('path');

const mm = require('music-metadata');

const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensions = [], fileLocation) => {
    return new Promise((resolve, reject) => {
        const {file} = files;
        const filteredName = file.name.split('.');
        const extension = filteredName[filteredName.length-1].toLowerCase();

        if(!extensions.includes(extension)){
            reject({status:400, res:`File has an invalid extension: ${extension}, use: ${extensions} insted`});
            return;
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(fileLocation, tempName);
    
        file.mv(uploadPath, (err) => {
            if (err) reject({status:500, res:'Something went wrong'});
            resolve({status:201, res:tempName});
        });

    });
}

const uploadBinFile = (file, extension, fileLocation) => {
    return new Promise((resolve, reject) => {

        if(!file){
            reject({status:400, res:'No file uploaded'})
        }

        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(fileLocation, tempName);

        fs.writeFileSync(uploadPath, file);
        resolve({status:201, res:tempName});

    });
}

const extractMP3Data = async (filePath = 'C:/Users/HavyM/Desktop/08. LAMC.mp3') => {
    try {
        const {format} = await mm.parseFile(filePath);
        const {size:sizeInBytes} = fs.statSync(filePath)
        //const sizeInMegaBytes = sizeInBytes / (1024*1024);

        return {
            size: sizeInBytes,
            duration: Math.round(format.duration)
        }
    } catch (error) {
        return {}
    }
}

module.exports = {
    uploadFile,
    uploadBinFile,
    extractMP3Data
}