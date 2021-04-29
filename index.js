const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Server = require('./models/server');
const types = require('./models/types/types');

if(!fs.existsSync(types.FILE_DIRS.PP_DIRNAME)){
    console.log('Creating uploads directories');

    fs.mkdirSync(types.FILE_DIRS.PP_DIRNAME, {recursive:true});
    fs.mkdirSync(types.FILE_DIRS.SONGS_DIRNAME, {recursive:true});
    fs.copyFileSync('./assets/__default.jpg', `${types.FILE_DIRS.PP_DIRNAME}/__default.jpg`);
}

const server = new Server();

server.listen();

/*TODOS: 
    -implement ssl certificate: https

    -handle external image change, at login

    -image max size
    -cors implementation

    -email verification?
*/
