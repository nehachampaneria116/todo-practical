const constant = require('../config/constant')
const jwtDecode = require("jwt-decode")
const moment = require('moment');
/**
 * 
 * CHECK STRONG PASSWORD VALIDATION FUNCTION
 * @param {STRING}      
 * @returns BOOLEAN
 */
async function checkPassword(password) {
    var kPasswordRegex = constant.kPasswordRegex;
    if (password.match(kPasswordRegex)) {
        return true;
    } else {
        return false;
    }
}

/**
 * USER NAME VALIDATION FUNCTION
 * @param {String} username 
 * @returns 
 */
async function usernameValidation(username) {
    var ValidationUsername = username.match(constant.kUsername)
    return (ValidationUsername) ? true : false;
}

/**
 * GET USER
 * @param {*} bearerToken 
 */
async function getUser(bearerToken) {
    var token = bearerToken.replace(/Bearer /g, '');
    var decoded = jwtDecode(token);
    return decoded.userId;
}

/**
 * check valid date
 * @param {*} date 
 */
async function checkValidDate(date) {
    var validate = moment(date).format('YYYY-MM-DD')
    if (validate == 'Invalid date' || (moment(date).isBefore(moment().format('YYYY-MM-DD')))) {
        return false;
    }
    return true
}

async function checkValidDateTime(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) &&
        date.toUTCString() !== date.toLocaleString();
}

/**
 * email VALIDATION FUNCTION
 * @param {String} email 
 * @returns 
 */
async function emailValidation(email) {
    var ValidationUsername = email.match(constant.kEmailRegex)


    return (ValidationUsername) ? true : false;
}


module.exports = {
    checkPassword,
    usernameValidation,
    getUser,
    checkValidDate,
    checkValidDateTime,
    emailValidation
}