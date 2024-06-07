const { games } = require('googleapis/build/src/apis/games');
const constant = require('../config/constant')
const jwtDecode = require("jwt-decode")
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
    var date = common.moment(query.dueDate).format('YYYY-MM-DD')
    if (date == 'Invalid date' || (common.moment(req.body.dueDate).isBefore(common.moment().format('YYYY-MM-DD')))) {
        return false;
    }
    return true
}

async function checkValidDateTime(date) {
    var date = common.moment(query.dueDate).format('YYYY-MM-DD HH:mm:ss')
    if (date == 'Invalid date' || (common.moment(req.body.dueDate).isBefore(common.moment().format('YYYY-MM-DD HH:mm:ss')))) {
        return false;
    }
    return true
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