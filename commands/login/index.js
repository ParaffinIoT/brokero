'use strict'

const inquirer = require("inquirer")
const { validateEmail } = require("../../utils")


function promptLogin(){
    return inquirer.prompt([
        {
            type: "input",
            name: "email",
            message: "Enter your email",
            validate: validateEmail
        }
    ])
}




module.exports = promptLogin