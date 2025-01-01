import DATAUriParser from 'datauri/parser.js';
import path from 'path';

const parser = new DATAUriParser();

const dataURI = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file data: 'originalname' or 'buffer' is missing.");
    }
    console.log(file.buffer)

    const extname = path.extname(file.originalname).toString();

    if (!extname) {
        throw new Error("Unable to determine file extension.");
    }
   
    return parser.format(extname, file.buffer).content;
};

export default dataURI;
