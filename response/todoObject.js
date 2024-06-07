/**
 * TO GET DATA OF SINGLE USER BY ID
 * @param {Number} userId 
 * @param {String} token 
 * @returns 
 */
async function todoObjectRes(data) {

    var responseData = {
        id: data.id,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        isCompleted: data.isCompleted,
        reminderTime: data.reminderTime,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }

    return responseData;
}



module.exports = {
    todoObjectRes,
}