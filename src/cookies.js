'use strict'

const os = require('os')
const path = require('path')
const fs = require("fs")
const utils = require("util")
const { required, asyncPipe } = require("../utils")

const homedir = os.homedir()

const cookiePath = path.join(homedir, ".brokero_cookie")


const saveCookie = ({ token=required("cookie"), username=required("username") })=>{
const fsPromise = utils.promisify(fs.writeFile)
return fsPromise(cookiePath, JSON.stringify({ token, username }))
}

const fsReadFileSync = utils.promisify(fs.readFile)


const readCookie = ()=>asyncPipe(
    fsReadFileSync,
    JSON.parse
)(cookiePath)
.catch(()=>{})


const deleteCookie = () => utils.promisify(fs.unlink)(cookiePath)



module.exports = {
    saveCookie,
    readCookie,
    deleteCookie
}

