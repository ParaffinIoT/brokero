'use strict'

const {  asyncPipe, checkStringForCharacter, logError, logSuccess } = require("../../../utils")
const shell = require('shelljs');
const utils = require("util")

const execPromisfy = utils.promisify(shell.exec)
const sleep = require('sleep-promise');

const installDockerOnLinux = async ()=>{
        return asyncPipe(
            _=> execPromisfy(`sudo chmod +x ./scripts/linux/install-docker.sh `),
            _=> execPromisfy("./scripts/linux/install-docker.sh").catch(logError),
            _=> {
                const whichDocker = shell.which("docker")
                const whichDockerCompose =shell.which("docker-compose")
                const isDockerInstalled = checkStringForCharacter(whichDocker, 'docker')
                const isDockerComposeInstalled = checkStringForCharacter(whichDockerCompose, 'docker-compose')
                if(isDockerInstalled && isDockerComposeInstalled) return logSuccess("docker  and docker-compose installed successfully")
               !isDockerInstalled && logError("docker installation failed. Please visit https://docs.docker.com/install/linux/docker-ce/ubuntu/ to install")
               !isDockerComposeInstalled && logError("docker compose installation failed. You can manually install from here https://docs.docker.com/compose/install/")
                shell.exit(1)
            },
            _=>sleep(100)
        )()
}


module.exports = {
    installDockerOnLinux
}