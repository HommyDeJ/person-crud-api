const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Person = new schema({

    name: {
        type: String
    },

    last_name: {
        type: String
    },

    email: {
        type: String
    },

    phone_number: {
        type: String
    },

});

module.exports = mongoose.model('Person', Person);