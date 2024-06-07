/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const todoCollection = common.db.todo;
var Op = common.db.Sequelize.Op

/**
 * UPDATE SKILLS 
 * @param {Object} req 
 * @returns Object
 */
module.exports.update = async (req) => {
    try {

        const userId = await common.helpers.getUser(req.headers.authorization)


        var errorArray = [];
        var errorFlag = 0
        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            /**
             * IF ID IS IS VALID THEN CALL THIS CONDITION 
             */

            var todoIdQuery = {
                id: req.params.id
            }

            var findTodo = await common.query.findOne(todoCollection, { where: todoIdQuery })
            if (findTodo == null) {
                /**
                 * INVALID ID
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_08");
                var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.todo, successOrError.location);
                errorArray.push(responseObj)

            } else {

                var obj = {}

                if (req.body.title != '' && req.body.title != undefined) {
                    var findDuplicateQuery = {
                        where: {
                            title: req.body.title,
                            id: {
                                [Op.ne]: req.params.id
                            },
                            userId: userId
                        }
                    }
                    var findDuplicate = await common.query.findOne(todoCollection, findDuplicateQuery);
                    if (findDuplicate != null) {
                        errorFlag = 1;
                        var successOrError = common.responseServices.successOrErrors("err_06");
                        var responseObj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.skills, successOrError.location);
                        errorArray.push(responseObj)
                    } else {
                        obj.title = req.body.title
                    }

                }
                if (req.body.description != '' && req.body.description != undefined) {
                    obj.description = req.body.description
                }
                if (req.body.dueDate != '' && req.body.dueDate != undefined) {
                    const validDate = await common.helpers.checkValidDate(req.data.dueDate)
                    if (validDate = false) {
                        errorFlag = 1;
                        var successOrError = common.responseServices.successOrErrors("err_07");
                        errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.dueDate, successOrError.location))
                    } else {
                        obj.dueDate = req.body.dueDate
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
                if (req.body.isCompleted != '' && req.body.isCompleted != undefined) {
                    if (typeof req.body.isCompleted != 'boolean') {
                        errorFlag = 1;
                        var successOrError = common.responseServices.successOrErrors("err_09");
                        errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.isCompleted, successOrError.location))
                    } else {
                        obj.isCompleted = req.body.isCompleted
                    }
                }

                await common.query.update(todoCollection, { id: req.params.id }, obj)
                var findTodo = await common.query.findOne(todoCollection, { where: todoIdQuery })
            }

            if (errorArray.length >= 0 && errorFlag == 1) {

                return common.responseModel.failResponse("Errors", {}, errorArray)

            } else {

                /**
                 * SUCCESS RESPONSE
                 */
                var response = await common.response.todo.todoObjectRes(findTodo)
                var successOrError = common.responseServices.successOrErrors("successMessage");
                return common.responseModel.successResponse(successOrError.update, response, []);

            }
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