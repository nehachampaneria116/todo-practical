/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const todoCollection = common.db.todo;
const usersCollection = common.db.users;

/**
 * ADD TODOs
 * @param {Object} req 
 * @returns Object
 */
module.exports.reminder = async (req) => {
    try {
        var todo = await common.query.find(todoCollection, {
            include: [
                {
                    model: usersCollection,
                    as: 'users',
                }],
            where: {
                reminderTime: new Date()
            }
        });

        for (let i = 0; i < todo.length; i++) {
            /**
             * send email
             */

            var transporter = common.nodemailer.createTransport({
                transport: `${process.env.mailTransport}`,
                host: `${process.env.mailHost}`,
                port: `${process.env.emailHost}`,
                debug: true,
                auth: {
                    user: `${process.env.mailAuthUser}`,
                    pass: `${process.env.mailAuthPassword}`
                },
                secure: false,
                tls: { rejectUnauthorized: false },
                debug: true
            })

            var mailOptions = {
                from: `<${process.env.mailAuthUser}>`,
                to: todo[i].users.email,
                subject: 'Reminder for ' + todo[i].title,
            }
            await transporter.sendMail(mailOptions);
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