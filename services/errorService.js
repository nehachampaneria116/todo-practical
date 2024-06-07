function successOrErrors(key) {

    /**
     *ERROR PARAMETER
     */
    var parameters = {
        "noParams": "",
        "page": "page",
        "username": "username",
        "password": "password",
        "title": "title",
        "description": "description",
        "dueDate": "dueDate",
        "todo": "todo",
        "isCompleted": "isCompleted",
        "reminderTime": "reminderTime",
        "login": "login"
    }

    /**
     * SUCCESS MESSAGE
     */
    var successMessages = {
        "success": "Success",
        "login": "Login successful",
        "register": "Registration successful",
        "getall": "Get all successful",
        "logout": "Logout successful",
        "todoAdded": "TODO has been added successfully",
        "todoUpdated": "TODO has been updated",
        "todoDeleted": "TODO has been deleted",
        "noDataFound": "No data found"
    }

    /**
     * ERROR OBJECT
     */
    var obj = {
        "successMessage": successMessages,
        "ex_00": {
            code: "ex_00",
            failMsg: "Exception",
            message: "exception",
            parameters: parameters,
            location: "params"
        },
        "err_02": {
            code: "err_02",
            failMsg: "InvalidDetails",
            message: "Please enter required details",
            parameters: parameters,
            location: "body"
        },
        "err_03": {
            code: "err_03",
            failMsg: "NotRegister",
            message: "Something went wrong while registering device",
            parameters: parameters,
            location: "body"
        },
        "err_04": {
            code: "err_04",
            failMsg: "InvalidDetails",
            message: "Invalid username.",
            parameters: parameters,
            location: "body"
        },
        "err_05": {
            code: "err_05",
            failMsg: "InvalidDetails",
            message: "Username already exits",
            parameters: parameters,
            location: "body"
        },
        "err_06": {
            code: "err_06",
            failMsg: "InvalidDetails",
            message: "Todo with this name already exist, please try another name",
            parameters: parameters,
            location: "body"
        },
        "err_07": {
            code: "err_07",
            failMsg: "InvalidDetails",
            message: "Kindly enter valid date format, should be in YYYY-MM-DD format",
            parameters: parameters,
            location: "body"
        },
        "err_08": {
            code: "err_08",
            failMsg: "InvalidDetails",
            message: "Invalid todo id",
            parameters: parameters,
            location: "body"
        },
        "err_09": {
            code: "err_09",
            failMsg: "InvalidDetails",
            message: "Invalid data",
            parameters: parameters,
            location: "body"
        },
        "err_010": {
            code: "err_010",
            failMsg: "InvalidDetails",
            message: "Kindly enter valid date-time format, should be in YYYY-MM-DD HH:mm:ss format",
            parameters: parameters,
            location: "body"
        },
        "err_011": {
            code: "err_011",
            failMsg: "InvalidDetails",
            message: "Email already exits",
            parameters: parameters,
            location: "body"
        },
        "err_012": {
            code: "err_012",
            failMsg: "InvalidDetails",
            message: "Invalid login credentials",
            parameters: parameters,
            location: "body"
        },
    }
    return obj[key]
}

module.exports = {
    successOrErrors,
}