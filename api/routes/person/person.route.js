const express = require('express');
const app = express();
const personRoute = express.Router();
const bodyParser = require('body-parser');

//Person model
let Person = require('../../models/Person');

//add person
personRoute.route('/person/create').post((req, res, next) => {
    Person.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(201).json(data);
        }
    });
});

//get all
personRoute.route('/person').get((req, res) => {
    Person.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json(data);
        }
    });
});

//get single person
personRoute.route('/person/read/:id').get((req, res) => {
    Person.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(data);
        }
    });
});

//update person
personRoute.route('/person/update/:id').put((req, res, next) => {
    Person.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.status(200).json(req.body);
        }
    });
});

//delete person
personRoute.route('/person/delete/:id').delete((req, res, next) => {
    Person.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                response:{
                    message: "Person was deleted successfully",
                    data
                }
            });
        }
    });
});

module.exports = personRoute;