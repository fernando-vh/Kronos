require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();

/*TODOS: 
    -implement fb authentication with passport
    -test google and facebook authentication
    -implement ssl certificate: https

    -email verification
    -image max size
    -cors implementation
*/
