const express = require('express');
const cors = require('cors');

const fileUpload = require('express-fileupload');
const db = require('../db/connection');

const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user: '/api/users',
            auth: '/api/auth',
            uploads: '/api/uploads',
            song: '/api/songs',
            search: '/api/search'
        };

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('DB online');
        }catch(e){
            throw new Error(e.message);
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Public
        this.app.use(express.static('public'));

        //JSON
        this.app.use(express.json());

        //FILE management
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: false
        }));

        //Bad JSON format
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
                return res.status(400).send({ status: 400, message: 'Bad json format' }); // Bad request
            }
            next();
        });

        //External auth
        this.passportStrategies();

        this.app.use(passport.initialize());
    }

    passportStrategies(){
        passport.use(new FacebookTokenStrategy({
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            fbGraphVersion: 'v3.0',
            enableProof: true,
            //profileFields: ['id', 'displayName', 'photos', 'email']
          }, (function(accessToken, refreshToken, profile, done) {
              return done(null, profile);
          })
        ));
    }

    routes(){
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.song, require('../routes/song'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })
    }
}

module.exports = Server;