const express = require('express')
const router = express()

/**
 * IMPORT CONTROLLER 
 */
const {
    registerUser,
    loginUser,
} = require('../controller/usersController/index')

/**
 * REGISTER USER
 */
router.post('/',
    async (req, res) => {
        try {
            var ctrlResponse = await registerUser.registration(req);
            res.status(ctrlResponse.code).send(ctrlResponse);
        } catch (err) {
            res.send(err)
        }
    })


/**
 * LOGIN USER
 */
router.post('/login',
    async (req, res) => {
        try {
            var ctrlResponse = await loginUser.login(req);
            res.send(ctrlResponse)

        } catch (err) {
            res.send(err)
        }
    })



module.exports = router