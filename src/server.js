let path = require('path'),
    cors = require('cors'),
    express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');

    mongoose.Promise - global.Promise;
    mongoose.connect(dbConfig.db, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Conexión exitosa');
    },
    error => {
        console.log('Problemas al contextar con la DB');
    });

    const personRoute = require('../api/routes/person/person.route');
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'dist/person-crud')));
    app.use('/', express.static(path.join(__dirname, 'dist/person-crud')));

    //Port Config
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`Connected to port ${port}`);
    });

    app.use(function(err, req, res, next) {
        console.error(err.message);
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    })