/* This file contains all the router logic and request-response handling*/
const express = require('express');
const employeeService = require('../services/employee-service');
const constants = require('../utils/constants');
const formidable = require('formidable');
const formatters = require('../utils/formatters');
const fs = require('fs');

const router = express.Router();

// Capturing post requests to create an employee
router.post('/employee', (req, res) => {
    let form = new formidable.IncomingForm();

    let resObj = {};

    //Parsing all the form fields and files
    form.parse(req,  (err, fields, files) => {
        let employee = {
            name: fields.name,
            email: fields.email,
            status: fields.status,
            created_at: formatters.getCurrentMysqlDateTime(),
            modified_at: formatters.getCurrentMysqlDateTime(),
            profile_picture: files.profile_picture
        }

        //Validating employee details
        employeeService.validateEmployee(employee).then((result) => {
            let errors = result;

            // if there were validation errors http 400 will be sent to the API caller with an error message
            if (errors.length > 0) {
                resObj.errors = errors;
                res.status(constants.httpStatusCodes.BadRequest);

                res.send(resObj);

            } else {

                // If profile picture is available reading it converting to base64 encoding
                if (employee.profile_picture) {
                    employee.profile_picture = fs.readFileSync(employee.profile_picture.filepath).toString('base64');
                }

                // Persisting employee in the DB if there were no validation errors
                employeeService.createEmployee(employee).then((result) => {
                    resObj = result;

                    // If creating was a success sending http 200
                    if (result.sts === 1) {
                        res.status(constants.httpStatusCodes.Created);

                    } else if (result.sts === -2) { // If not sending 500 with error message
                        res.status(constants.httpStatusCodes.InternalError);
                    }

                    res.send(resObj);
                })
            }
        });
    });


});

module.exports = router;