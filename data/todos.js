const mongoose = require('mongoose');

/* --- PHASE 1 - WRITE THE INVENTORY MODEL --- */

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var todoSchema = new Schema({
    todoID: {
        type: Number,
        trim: true,
        unique: true,
        required: "To do ID is Required"
    },
    text: {
        type: String,
        trim: true,
        required: "To do item is Required"
    },
    completed: {
        type: Boolean,
        required: "Completion Status is Required"
    },
});

// This creates our model from the above schema, using Mongoose's model method
const todos = mongoose.model("todos", todoSchema);
// Note how we export the array. This makes it accessible to other files using require.
module.exports = todos;