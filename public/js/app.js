$(function () {

  const render = function () {

    // Empty our output divs
    $('#todos').empty();

    // Turn off any click listeners from our update items
    $('add-new-todo').off('click');

    // Run Queries!
    // ==========================================
    getTodos();
  }

  const renderTodo = function (outputElement, todo) {
    const output = $(outputElement);

    const todoElement = $('<div>').addClass('todo');

    const label = $('<label>').addClass('fancy-checkbox');
    const checkbox = $('<input type="checkbox">')
      .attr('checked', todo.completed)
      .addClass('completed')
      .attr('data-id', todo._id);


    label.append(checkbox);
    // label.append('<i class="fas fa-check-square checked">');
    // label.append('<i class="far fa-square unchecked">');

    todoElement.append(
      label,

      $('<span>').text(todo.text).addClass('list-text'),

      $('<i>')
      .addClass('delete')
      .attr('data-id', todo._id)
      .addClass('fas fa-times')
    );

    output.append(todoElement);
  }

  const renderTodos = function (outputElement, todos) {
    const output = $(outputElement);
    output.empty();
    todos.forEach((todo) => renderTodo(outputElement, todo));
  }

  const getTodos = function () {

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({
        url: '/api/todos',
        method: 'GET'
      })
      .then(function (todos) {
        renderTodos('#todos', todos);
      });
  }

  // ADD NEW TODO
  // Click listener for the submit button
  $('.submit').on('click', function (e) {
    e.preventDefault();

    // Here we grab the form elements
    const newTodo = {
      text: $('#toDoInput').val().trim(),
      completed: false,
    };

    for (let key in newTodo) {
      if (newTodo[key] === '') {
        alert('Please add text for new todo');
        return;
      }
    }
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: newTodo
    }).then(
      function (data) {
        if (data) {

          // Clear the form when submitting
          $('#toDoInput').val(null);

          // Set the users focus (cursor) to input
          $('#toDoInput').focus();

          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }
      });
  });

  // UPDATE TODO COMPLETED STATUS
  $('body').on('click', '.completed', function (event) {
    const todoId = $(this).attr('data-id');
    const completed = event.target.checked;

    // Make the PUT request
    $.ajax({
        url: `/api/todos/${todoId}`,
        method: 'PUT',
        data: {
          completed: completed
        },
      })
      .then(function (data) {

        // If our PUT request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }


      });
  })

  // DELETE TODO
  $('body').on('click', '.delete', function (event) {
    const todoId = $(this).attr('data-id');

    // Make the DELETE request
    $.ajax({
        url: `/api/todos/${todoId}`,
        method: 'DELETE'
      })
      .then(function (data) {

        // If our DELETE request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }

      });
  });

  // fetch all todos and render them 
  render();
});