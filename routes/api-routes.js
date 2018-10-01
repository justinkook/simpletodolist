const todos = require('../data/todos.js');

module.exports = function (app) {

  app.get('/api/todos', function (req, res) {
    todos.find({})
      .then(function (dbtodos) {
        res.json(dbtodos);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
  
  app.post('/api/todos', function (req, res) {
    todos.create(req.body)
      .then(function (dbtodos) { 
        res.json({
          success: true
        });
      })
      .catch(function (err) { 
        res.json({
          success: false
        });
      });
  });


  app.put('/api/todos/:id', function (req, res) {

    todos.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          completed: req.body.completed
        }
      })
      .then(function (dbtodos) { 
        res.json({
          success: true
        });
      })
      .catch(function (err) { 
        res.json({
          success: false
        });
      })
  });

  app.delete('/api/todos/:id', function (req, res) {

    
    todos.deleteOne({
        _id: req.params.id
      })
      .then(function (dbtodos) { 
        res.json({
          success: true
        });
      })
      .catch(function (err) { 
        res.json({
          success: false
        });
      })
  });
}