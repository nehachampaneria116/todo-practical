/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const todoCollection = common.db.todo;

/**
 * DELETE todo
 * @param {Object} req 
 * @returns Object
 */
module.exports.delete = async (req) => {
    try {

        var errorArray = [];
        var errorFlag = 0
        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            const query = { id: req.params.id }

            var findTodo = await common.query.findOne(todoCollection, { where: query })
            if (findTodo == null) {
                /**
                 * INVALID ID
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_08");
                var responseObj = common.responseModel.responseObj(successOrError.code, successOrError.message, successOrError.parameters.todo, successOrError.location);
                errorArray.push(responseObj)

            } else {
                await common.query.remove(todoCollection, query);
            }


            if (errorArray.length >= 0 && errorFlag == 1) {

                return common.responseModel.failResponse("Errors", {}, errorArray)

            } else {

                /**
                 * SUCCESS RESPONSE
                 */
                var successOrError = common.responseServices.successOrErrors("successMessage");
                return common.responseModel.successResponse(successOrError.todoDeleted, {}, []);

            }
        }

    } catch (error) {

        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var responseObj = common.responseModel.responseObj(successOrError.code, error.message, successOrError.parameters.noParams, successOrError.location);
        var array = []
        array.push(responseObj)
        return common.responseModel.failResponse(successOrError.failMsg, {}, array)

    }
}