'use strict'
const { installDockerOnLinux } = require("./linux")

const installDockerScripts = ()=>{
    if(process.platform === "linux") return installDockerOnLinux()
}






module.exports = {
    installDockerScripts
}