const addTodo = require('./add');
const listTodo = require('./list');
const updateTodo = require('./update');
const deleteTodo = require('./delete');
const reminderTodo = require('./reminder')

module.exports = {
    addTodo,
    listTodo,
    updateTodo,
    deleteTodo,
    reminderTodo
}