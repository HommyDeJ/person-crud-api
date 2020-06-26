let path       = require('path'),
    cors       = require('cors'),
    express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    dbConfig   = require('../database/dbConfig');


    //MONGO DB CONNECTION
    mongoose.Promise - global.Promise;
    mongoose.connect(dbConfig.db, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Database connected');
    },
    error => {
        console.log('Database connection error');
    });

    //ROUTE DECLARATION
    const personRoute = require('../routes/person/person.route');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.use(express.static(path.join(__dirname, 'dist/person-crud')));
    app.use('/', express.static(path.join(__dirname, 'dist/person-crud')));
    
    //ROUTES
    app.use('/api', personRoute);

    //PORT CONFIG
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`Connected to port ${port}`);
    });

    app.use(function(err, req, res, next) {
        console.error(err.message);
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    })