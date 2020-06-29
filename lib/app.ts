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

        //options for cors midddleware
        const options: cors.CorsOptions = {
            allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "*"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: ["https://person-crud-newtech-frontend.herokuapp.com/"],
            preflightContinue: false
        };

        //use cors middleware
        this.app.use(cors(options));
        dotenv.config();

        //add your routes

        //enable pre-flight
        this.app.options("*", cors(options));
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;