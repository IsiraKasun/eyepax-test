const express = require('express');
const employeeRouter = require('./routes/employee-router');

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());
app.use(employeeRouter);

module.exports = app;

