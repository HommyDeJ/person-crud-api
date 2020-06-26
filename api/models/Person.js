const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Person = new schema({

    name: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    },

    phoneNumber: {
        type: String
    },

});

module.exports = mongoose.model('Person', Person);