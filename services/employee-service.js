// This file contains the business logic and validations for employee
const validator = require('../utils/validators');
const employeeDao = require('../dao/employee-dao');

const employeeStatus = ['Active', 'Deleted']

const validateEmployee = async (employee) => {
    let errors = [];
    // Validating for empty fields
    if (validator.isEmpty(employee.name)) {
        errors[errors.length] = 'name is required';
    }

    if (validator.isEmpty(employee.email)) {
        errors[errors.length] = 'email is required';
    }

    if (errors.length > 0) {
        return errors;
    } else {
        //Validating for character length
        if (validator.isIncorrectLength(employee.name, 2, 150)) {
            errors[errors.length] = 'Name cannot be longer than 150 characters';
        }

        if (validator.isIncorrectLength(employee.email, 2, 75)) {
            errors[errors.length] = 'Email cannot be longer than 75 characters';
        }

        if (errors.length > 0) {
            return errors;
        } else {
            // validating email syntax
            if (!validator.isEmail(employee.email)) {
                errors[errors.length] = 'Incorrect email syntax';
            }

            // validating the profile picture file size
            if (employee.profile_picture && employee.profile_picture.size > 10485760) { // 10MB = 10 * 1024 * 1024 bytes
                errors[errors.length] = 'Profile picture size should be limited to 10MB';
            }

            // Validating employee status fields
            if (!employeeStatus.includes(employee.status)) {
                errors[errors.length] = 'Status is invalid';
            }

            return errors;
        }
    }
}

const createEmployee = async (employee) => {
    let response = {};
    let creationResult = await employeeDao.createEmployee(employee);
    let errors = [];

    if (!creationResult.errno && creationResult.affectedRows === 1) {
        response.sts = 1;
        return response;

    } else {
        errors[errors.length] = 'Internal Error 1';
        response.sts = -2;
        response.errors = errors;

        return response;
    }
};

exports.validateEmployee = validateEmployee;
exports.createEmployee = createEmployee;

