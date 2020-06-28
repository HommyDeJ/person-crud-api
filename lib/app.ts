import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "../lib/routes/Routes";
let mongoose = require("mongoose");

class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost:27017/person-crud';

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
            allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: [/.*localhost.*/],
            preflightContinue: false
        };

        //use cors middleware
        this.app.use(cors(options));

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