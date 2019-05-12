'use strict'

const chalk = require("chalk").default
const fs = require("fs")
const path = require("path")
const utils = require("util")


const validateEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

const required = (str)=>{
    throw `${str} is required`
}

const asyncPipe = (...fns) => params=> fns.reduce(async (result, next) => next(await result), params)

const checkStringForCharacter = (str, character)=>{
    const regex = new RegExp(character)
    return regex.test(str)
}

const logError = error => console.log(chalk.red(error))
const logSuccess = message => console.log(chalk.green(message))

const defaultDir = _=> process.cwd().split("/").pop()



const dirExists = dir => {
return fs.existsSync(generateDirPath(dir))
}

const generateDirPath = dir => {
    const dirArray  =process.cwd().split("/")
        dirArray.pop()
return path.join(dirArray.join("/"), dir)
}

const emptyDir = dir=> {
    const dirPath = generateDirPath(dir)
    const fsReadPromise = utils.promisify(fs.readdir)
    const fsunlinkPromise = utils.promisify(fs.unlink)
   return  asyncPipe(
        fsReadPromise,
        (files=[])=>Promise.all(files.map(file=>{
            const filePath = path.join(dirPath, file)
            return fsunlinkPromise(filePath)
        }))
    )(dirPath)
}


module.exports = {
    validateEmail,
    required,
    asyncPipe,
    checkStringForCharacter,
    logError,
    logSuccess,
    defaultDir,
    dirExists,
    generateDirPath,
    emptyDir
}