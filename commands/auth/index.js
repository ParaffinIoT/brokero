'use strict'

const inquirer = require("inquirer")
const { validateEmail } = require("../../utils")
const { loginUser } = require("../../src")

/**
 * prompt user for login details
 */
function promptLogin(){
    return inquirer.prompt([
        {
            type: "input",
            name: "email",
            message: "Enter your email",
            validate: validateEmail
        },
        {
            type: "password",
            name: "password",
            message: "Enter password",
        }
    ]).then(loginUser)
}




module.exports = {
    promptLogin
}