'use strict'
const inquirer = require("inquirer")
const { setup } = require("../../src")
const { defaultDir } = require("../../utils")




const setupPrompt = ()=>{
return inquirer.prompt([
{
    type : "text",
    name: "directory_name",
    message: "enter directory where we should setup",
    default: defaultDir()
}
]).then(setup)
}



module.exports = {
    setupPrompt
}