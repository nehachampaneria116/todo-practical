/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const todoCollection = common.db.todo;
const Op = common.db.Sequelize.Op;

/**
 * LIST OF SKILLS 
 * @param {Object} req 
 * @returns Object
 */
module.exports.list = async (req) => {
    try {

        const userId = await common.helpers.getUser(req.headers.authorization)

        var errorArray = [];
        var errorFlag = 0
        var query = req.query

        var whereCondition = {
            userId: userId
        }

        if (query.dueDate != undefined && query.dueDate != '') {
            const validDate = await common.helpers.checkValidDate(query.dueDate)
            if (validDate == false) {
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_07");
                errorArray.push(common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.dueDate, successOrError.location))
                return common.responseModel.failResponse(successOrError.failMsg, {}, array)
            }
            whereCondition.dueDate = query.dueDate
        }

        var todo = await common.query.find(todoCollection, {
            where: whereCondition
        });

        if (todo.length == 0) {
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successGetResponse(successOrError.noDataFound, [], [], {});

        }

        query.order != '' && typeof query.order != 'undefined' ? (query.order == 0 ? order = 'ASC' : order = 'DESC') : order = 'DESC'
        query.page != '' && typeof query.page != 'undefined' ? page = parseInt(query.page) : page = 1
        query.limit != '' && typeof query.limit != 'undefined' ? limit = parseInt(query.limit) : limit = 10

        var offset = (page - 1) * limit;
        var previousPage = page - 1;

        let totalPage = Math.ceil(todo.length / limit);

        var nextPage;
        if (page < totalPage) {
            nextPage = 1;
        } else {
            nextPage = 0;
        }

        var prevPage;
        if (previousPage == 0) {
            prevPage = 0;
        } else {
            prevPage = 1;
        }
        var skillListQuery = {
            where: whereCondition,
            limit: limit,
            order: [
                ['id', order]
            ],
            offset: offset
        }
        var skillsWithPagination = await common.query.find(todoCollection, skillListQuery);

        var pagination = {
            "previousPage": prevPage,
            "currentPage": page,
            "nextPage": nextPage,
            "totalCount": todo.length,
            "perPage": limit > skillsWithPagination.length ? skillsWithPagination.length : limit,
            "totalPage": totalPage
        }

        var dataArray = []
        for (let i = 0; i < skillsWithPagination.length; i++) {
            var response = await common.response.todo.todoObjectRes(skillsWithPagination[i])
            dataArray.push(response)
        }

        /**
         * SUCCESS RESPONSE
         */
        var successOrError = common.responseServices.successOrErrors("successMessage");
        return common.responseModel.successGetResponse(successOrError.getall, dataArray, [], pagination);

    } catch (error) {
        console.log(error);
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