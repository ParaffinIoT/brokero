'use strict'
const { required, asyncPipe, checkStringForCharacter, logError, logSuccess } = require("../utils")
const shell = require('shelljs');
const utils = require("util")
const execPromisfy = utils.promisify(shell.exec)
const sleep = require('sleep-promise');


const isWins = process.platform === 'win32'
const linux = process.platform  === "linux"


const installDocker = ()=>{
return new Promise((resolve)=> {

    if (linux) {
        return asyncPipe(
            _=> execPromisfy("sudo apt-get update").catch(logError),
            _=> execPromisfy("sudo apt-get install \ apt-transport-https \ ca-certificates \ curl \ gnupg-agent \ software-properties-common -y").catch(logError),
            _=> execPromisfy("curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -").catch(logError),
            _=> execPromisfy('sudo add-apt-repository \
            "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
            $(lsb_release -cs) \ stable"').catch(logError),
            _=> execPromisfy("sudo apt-get update").catch(logError),
            _=>execPromisfy("sudo apt-get install docker-ce docker-ce-cli containerd.io").catch(logError),
            _=> execPromisfy("which docker"),
            data=> {
                const isInstalled = checkStringForCharacter(data, 'docker')
                if(isInstalled) return logSuccess("docker installed successfully")
                logError("docker installation failed")
                shell.exit(1)
            },
            _=>sleep(100)
        )()
    }
})
}

const setup = async ({ directory_name =required("directory_name") })  => {
    if (shell.which('docker')) {
        shell.echo('docker not found. installing....');
        await installDocker()
        shell.exit(1);
      }
    // console.logError(directory_name)
}



module.exports = {
    setup
}