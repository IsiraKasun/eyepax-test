//This file contains all the validation related logics
const isEmpty = (input) => {
        if (!input) {
                return true;
        } else {
                return !input.trim();
        }
}

const isIncorrectLength = (input, min, max) => {
        return input && (input.length < min || input.length > max) ;
}

const isEmail = (email) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return email && email.match(re);
}

exports.isEmpty = isEmpty;
exports.isIncorrectLength = isIncorrectLength;
exports.isEmail = isEmail;
