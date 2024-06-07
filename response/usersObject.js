var common = require('./common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;


/**
 * TO GET DATA OF SINGLE USER BY ID
 * @param {Number} userId 
 * @param {String} token 
 * @returns 
 */
async function singleUserObjectRes(userId, token) {

    var data = await common.query.findOne(usersCollection, { where: { id: userId } })

    var responseData = {
        id: data.id,
        username: data.username,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        token: token,
    }

    return responseData;
}



module.exports = {
    singleUserObjectRes,
}