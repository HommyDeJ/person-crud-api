import * as cors from "cors";
import * as dotenv from 'dotenv';
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/Routes";
let mongoose = require("mongoose");

class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    public mongoUrl: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/person-crud';

    constructor() {
        this.app = express();
        this.config();
        this.routes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        //env
        dotenv.config();

        // Add headers
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });


    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;