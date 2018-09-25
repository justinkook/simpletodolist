const todos = [{
    text: "walk the dog",
    completed: false
},
{
    text: "do homework",
    completed: true
}
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = todos;