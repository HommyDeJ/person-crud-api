import {Request, Response, NextFunction} from "express";
import { PersonController } from "../controllers/PersonController";

export class Routes { 
    
    public personController: PersonController = new PersonController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET successfull!'
            })
        })
        
        // Start Person Routes 
        app.route('/person')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, this.personController.getPersons)        

        // POST endpoint
        .post(this.personController.addNewPerson);

        // Person detail
        app.route('/person/:personId')
        // get specific contact
        .get(this.personController.getPersonWithID)
        .put(this.personController.updatePerson)
        .delete(this.personController.deletePerson)
        //End Person Routes
    }
}