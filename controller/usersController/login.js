/**
 * NPM PACKAGE
 */
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;

/**
 * LOGIN USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.login = async (req) => {
    try {
        var errorArray = [];
        var errorFlag = 0;
        var token = []
        /**
         * REQUIRE FIELDS
         */

        if (req.body.email == '' || typeof req.body.email == 'undefined') {

            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_02");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
            errorArray.push(responseObject)
        }
        /**
         * REQUIRED FIELD : PASSWORD
         */
        if (req.body.password == "" || typeof req.body.password == 'undefined') {
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_02");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.password, successOrError.location);
            errorArray.push(responseObject)
        }

        var usersDetails = await common.query.findOne(usersCollection, { where: { email: req.body.email } });

        if (usersDetails == null || (await bcrypt.compare(req.body.password, usersDetails.dataValues.password) == false)) {
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_012");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.login, successOrError.location);
            errorArray.push(responseObject)
        }

        if (errorArray.length >= 0 && errorFlag == 1) {
            return common.responseModel.failResponse("Errors", {}, errorArray)
        }

        var token = jwt.sign({ userId: usersDetails.id, }, process.env.secretKey)

        var response = await common.response.users.singleUserObjectRes(usersDetails.id, token)
        /**
         * SUCCESS
         */
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successResponse(successOrError.login, response, []);
    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObject = common.responseModel.resObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObject)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array);

    }
}