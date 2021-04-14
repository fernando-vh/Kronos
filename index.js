require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();

/*TODOS: 
    -implement fb authentication with passport
    -test google and facebook authentication
    -implement ssl certificate: https
    -search implementation

    -email verification
    -image max size
    -cors implementation

    -in get users concatenate auth and role tables ?
*/
