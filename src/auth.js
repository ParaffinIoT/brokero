'use strict'
const { required, asyncPipe } = require("../utils")
const { saveCookie,readCookie } = require('./cookies')

/**
 * Login to parraffin
 * @param {Object} param
 * @param {String} param.email
 * @param {String} param.password 
 */
const loginUser = ({ email= required("email"), password=required("password")  })=>asyncPipe(
    saveCookie,
    readCookie,
    console.log
)({ token: "sdsdffjskfnfsdf", username: "sdshfjdshfnsdifjksf" })




module.exports = {
    loginUser
}