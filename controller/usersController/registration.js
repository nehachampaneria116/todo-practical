/**
 *  NPM PACKAGES 
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

/**
 *  HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;

/**
 * REGISTER USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.registration = async (req) => {
    try {
        var errorFlag = 0;
        var errorArray = []

        /**
         * REQUIRE FIELD
         */
        if (req.body.username == "" || typeof req.body.username == 'undefined') {
            /**
             * REQUIRED FIELD : username
             */
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_02");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.username, successOrError.location);
            errorArray.push(responseObject)
        }
        else {
            var usernameExist = await common.query.findOne(usersCollection, { where: { username: req.body.username } });
            if (usernameExist) {
                /**
                * USERNAME ALREADY EXIST
                */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_05");
                var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.username, successOrError.location);
                errorArray.push(responseObject)
            }
            else {
                var validationUsername = await common.helpers.usernameValidation(req.body.username)

                if (validationUsername == false) {
                    /**
                     * USERNAME VALIDATION
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_04");
                    var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.username, successOrError.location);
                    errorArray.push(responseObject)
                }
            }

        }
        if (req.body.email == "" || typeof req.body.email == 'undefined') {
            /**
             * REQUIRED FIELD : email
             */
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_02");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
            errorArray.push(responseObject)
        }
        else {
            var usernameExist = await common.query.findOne(usersCollection, { where: { email: req.body.email } });
            if (usernameExist) {
                /**
                * USERNAME ALREADY EXIST
                */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_011");
                var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
                errorArray.push(responseObject)
            }
            else {
                var validationUsername = await common.helpers.emailValidation(req.body.email)

                if (validationUsername == false) {
                    /**
                     * USERNAME VALIDATION
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_04");
                    var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.username, successOrError.location);
                    errorArray.push(responseObject)
                }
            }

        }
        if (req.body.password == "" || typeof req.body.password == 'undefined') {
            /**
             * REQUIRED FIELD : password
             */
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_02");
            var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.password, successOrError.location);
            errorArray.push(responseObject)
        } else {
            var strongPassword = await common.helpers.checkPassword(req.body.password);
            /**
             * PASSWORD VALIDATION
             */
            if (strongPassword == false) {

                /**
                 * INVALID PASSWORD 
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_12");
                var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.password, successOrError.location);
                errorArray.push(responseObject)

            }
        }

        if (errorArray.length == 0 && errorFlag == 0) {

            var addUserObject = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt),
            };

            var usersDetails = await common.query.create(usersCollection, addUserObject);

            if (usersDetails) {

                /**
                 * GENERATE JWT TOKEN
                 */
                const token = jwt.sign({ userId: usersDetails.id }, process.env.secretKey)

                /**
                 * SUCCESS RESPONSE
                 */
                var response = await common.response.users.singleUserObjectRes(usersDetails.id, token)

                var successOrError = common.responseServices.successOrErrors("successMessage");
                return common.responseModel.successCreateResponse(successOrError.register, response, []);


            } else {

                /**
                 * SOMETHING WENT WRONG WHILE REGISTER DEVICE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_03");
                var responseObject = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.location);
                errorArray.push(responseObject)

            }
        } else {

            if (errorArray.length > 0 && errorFlag == 1) {

                return common.responseModel.failResponse("Errors", {}, errorArray)

            }

        }

    } catch (error) {

        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObject = common.responseModel.resObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObject)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array)

    }
}