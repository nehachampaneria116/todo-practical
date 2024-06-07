/**
 * NPM PACKAGES
 */
const express = require('express')
var app = express();
const path = require('path');
var avenue = require('./routes/index')
var http = require("http").Server(app);
var CronJob = require('cron').CronJob;

/**
 * FILE READER PATH
 */
app.use(express.static('./public/upload'));
app.use(express.static(path.join(__dirname, './public')));
/**
 * ROUTING PATH
 */
var users = avenue.users
var todo = avenue.todo

require('dotenv').config();
const PORT = process.env.port || 8000

/**
 * BODY PARSER
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', users);
app.use('/todo', todo)

const {
    reminderTodo
} = require('./controller/todoController/index')
new CronJob('* * * * *', reminderTodo.reminder, null, true);

/**
 * APPLICATION LISTEN
 */
http.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
})
