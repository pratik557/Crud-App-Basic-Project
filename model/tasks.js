const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"], // custom message
        trim: true, // trim spaces before and after name
        maxlength: [20, "name can not exceed length 20"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// you can think of model as a fancy constructor
// and instance of a model is called document

module.exports = mongoose.model('db', taskSchema)