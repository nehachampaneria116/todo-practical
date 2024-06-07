/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const todoCollection = common.db.todo;

/**
 * ADD TODOs
 * @param {Object} req 
 * @returns Object
 */
module.exports.add = async (req) => {
    try {
        var errorArray = [];
        var errorFlag = 0

        const userId = await common.helpers.getUser(req.headers.authorization)

        if (req.body.title == "" || typeof req.body.title == 'undefined') {

            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_02");
            errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.title, successOrError.location))

        } else {

            var titleExist = await common.query.findOne(todoCollection, {
                where: { title: req.body.title, userId: userId }
            })
            if (titleExist == null) {
            } else {
                /**
                 * Todo with this name already exist, please try another name
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_06");
                var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.skills, successOrError.location);
                errorArray.push(responseObj)

            }
        }

        if (req.body.description == "" || typeof req.body.description == 'undefined') {
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_02");
            errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.description, successOrError.location))
        }

        if (req.body.dueDate == "" || typeof req.body.dueDate == 'undefined') {
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_02");
            errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.dueDate, successOrError.location))
        } else {
            const validDate = await common.helpers.checkValidDate(req.data.dueDate)
            if (validDate = false) {
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_07");
                errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.dueDate, successOrError.location))
            }
        }

        if (req.body.dueDate == "" || typeof req.body.dueDate == 'undefined') {
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_02");
            errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.dueDate, successOrError.location))
        } else {
            const validDate = await common.helpers.checkValidDate(req.data.dueDate)
            if (validDate = false) {
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_07");
                errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.dueDate, successOrError.location))
            }
        }

        if (req.body.reminderTime == "" || typeof req.body.reminderTime == 'undefined') {
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_02");
            errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.reminderTime, successOrError.location))
        } else {
            const validDate = await common.helpers.checkValidDateTime(req.data.reminderTime)
            if (validDate = false) {
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_010");
                errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.reminderTime, successOrError.location))
            }
        }

        if (errorArray.length > 0 && errorFlag == 1) {

            return common.responseModel.failResponse("Errors", {}, errorArray)

        } else {

            var addTodo = await common.query.create(todoCollection, {
                title: req.body.title,
                description: req.body.description,
                dueDate: req.body.dueDate,
                userId: userId
            });

            /**
             * SUCCESS
             */
            var response = await common.response.todo.todoObjectRes(addTodo)
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successCreateResponse(successOrError.todoAdded, response, []);
        }

    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObj = common.responseModel.resObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObj)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array)

    }
}