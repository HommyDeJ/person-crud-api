import * as mongoose from 'mongoose';
import { PersonSchema } from '../models/Person';
import { Request, Response } from 'express';

const Person = mongoose.model('Person', PersonSchema);

export class PersonController {

    public addNewPerson(req: Request, res: Response) {
        let newPerson = new Person(req.body);

        newPerson.save((err, person) => {
            if (err) {
                res.send(err);
            }
            res.status(201).json(person);
        });
    }

    public getPersons(req: Request, res: Response) {
        Person.find({}, (err, persons) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(persons);
        });
    }

    public getPersonWithID(req: Request, res: Response) {
        Person.findById(req.params.personId, (err, person) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(person);
        });
    }

    public updatePerson(req: Request, res: Response) {
        Person.findOneAndUpdate({ _id: req.params.personId }, req.body, { new: true }, (err, person) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(person);
        });
    }

    public deletePerson(req: Request, res: Response) {
        Person.findOneAndRemove({ _id: req.params.personId }, (err, person) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json(
                {
                    message: 'Successfully deleted!',
                    person
                });
        });
    }

}