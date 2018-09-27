$(function () {

  const render = function () {

    // Empty our output divs
    $('#todos').empty();
    $.ajax({
        url: '/api/todos',
        method: 'GET'
      })
      .then(function (data) {
        let htmlstr = '';
        data.forEach(element => {
          htmlstr += `<h5 class="card-title">${element.text}</h5>`;

        });
        $('#todos').html(htmlstr);
      })
      .catch(function (err) {
        console.log(err);
      });
    // Turn off any click listeners from our update items
    $('add-new-todo').off('click');

    getTodos();
  }

  const toggleLine = () => {
    $('.list-text').toggleClass('linethrough');
  }
  $('<input type="checkbox">').on('click', toggleLine);

  /**
   * TODO schema = { text: 'my todo text', completed: false }
   */
  // const renderTodo = function (outputElement, todo, index) {
  //   const output = $(outputElement);

  //   const todoElement = $('<li>').addClass('todo');

  //   const label = $('<label>').addClass('linethrough');
  //   const checkbox = $('<input type="checkbox">')
  //     .attr('checked', todo.completed)
  //     .addClass('completed')
  //     .attr('data-index', index);


  //   label.append(checkbox);

  //   todoElement.append(
  //     label,

  //     $('<span>').text(todo.text).addClass('list-text'),

  //     $('<button>')
  //     .addClass('delete')
  //     .attr('data-index', index)
  //     .append('<i>').addClass('fas fa-times')
  //   );

  //   output.append(todoElement);
  // }

  // const renderTodos = function (outputElement, todos) {
  //   const output = $(outputElement);
  //   output.empty();
  //   todos.forEach((todo, index) => renderTodo(outputElement, todo, index));
  // }

  // const getTodos = function () {

  //   // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
  //   $.ajax({
  //       url: '/api/todos',
  //       method: 'GET'
  //     })
  //     .then(function (todos) {
  //       // update todo length
  //       state.todos = todos;
  //       renderTodos('#todos', todos);
  //     });
  // }

  // ADD NEW TODO
  // Click listener for the submit button
  $('.submit').on('click', function (event) {
    event.preventDefault();

    // Here we grab the form elements
    const newTodo = {
      text: $('#new-todo-text').val().trim(),
      completed: false,
    };

    for (let key in newTodo) {
      if (newTodo[key] === '') {
        alert('Please add text for new todo');
        return;
      }
    }

    $.ajax({
        url: '/api/todos/post',
        method: 'POST',
        data: newTodo
      }).then(
        function (data) {

          // If our POST request was successfully processed, proceed on
          // Clear the form when submitting
          $('#new-todo-text').val(null);

          // Set the users focus (cursor) to input
          $('#new-todo-text').focus();

          render();
        })
      .catch(function (err) {
        console.log(err);
      });
  });

  // UPDATE TODO COMPLETED STATUS
  $('body').on('click', '.completed', function (event) {
    const todoID = $(this).data('id');
    const newCount = $(`input[id="${todoID}"]`).val().trim();
    const todoToUpdate = {
      todoID: newCount,
      text: text
    };
    // const todoIndex = $(this).attr('data-index');
    // const completed = event.target.checked; // TODO use jquery for this

    // find the todo the user is updating
    // const todoToUpdate = data[Number(todoIndex)];

    // update the competed field
    todoToUpdate.completed = completed;

    // Make the PUT request
    $.ajax({
        url: `/api/todos/update`,
        method: 'PUT',
        data: todoToUpdate
      })
      .then(function (data) {

        // If our PUT request was successfully processed, proceed on          
        render();
      })
      .catch(function (err) {
        console.log(err);

      })
  })

  // DELETE TODO
  $('body').on('click', '.delete', function (event) {
    const todoIndex = $(this).attr('data-index');

    // Make the DELETE request
    $.ajax({
        url: `/api/todos/${todoIndex}`,
        method: 'DELETE'
      })
      .then(function (data) {

        // If our DELETE request was successfully processed, proceed on
        render();
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  // fetch all todos and render them 
  render();
});