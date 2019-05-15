'use strict'
const {
  required,
  asyncPipe,
  logError,
  logSuccess,
  dirExists,
  emptyDir,
} = require('../utils')
const shell = require('shelljs')
const inquirer = require('inquirer')
const { installDockerScripts } = require('./platforms')
const utils = require('util')
const open = require('open');


const execPromisfy = utils.promisify(shell.exec)

const paraffinDockerUrl = 'https://github.com/ParaffinIoT/paraffin'

const setup = async ({ directory_name = required('directory_name') }) => {
  if (!shell.which('docker')) {
    shell.echo('docker not found. installing....')
    await installDockerScripts()
  } else {
    logSuccess('docker already installed')
  }

  logSuccess('continuing installation ...')

  if (!shell.which('git')) {
    logError(
      'git is required to run brokero. visit https://git-scm.com/downloads to install'
    )
  }

  asyncPipe(
    function() {
      if (dirExists(directory_name)) {
        return inquirer
          .prompt([
            {
              name: 'override',
              type: 'text',
              message: `A directory exist with the name ${directory_name}, do you want to override?`,
              default: 'y',
            },
          ])
          .then(({ override }) => {
            if (override === 'y') return
            logError('stopping process.... ')
            shell.exit()
          })
      }
    },
    _ => logSuccess('clone paraffin repo'),
    _ =>
      dirExists(directory_name)
        ? emptyDir(directory_name)
        : shell.mkdir(directory_name),
    _ =>
      execPromisfy(
        `git clone https://github.com/ParaffinIoT/paraffin ${
          dirExists(directory_name) ? '.' : directory_name
        }`
      ),
    _ => logSuccess('starting docker-compose'),
    _ =>
      dirExists(directory_name) ? execPromisfy('sudo docker-compose up -d') : '',
  _=>logSuccess("setup complete run. Openning parafin app "),
  _=> process.env.NODE_ENV !== 'production' &&  open("http://localhost:5000/dashboard") ,
    _ => shell.exit(1)
  )()

  // console.logError(directory_name)
}

module.exports = {
  setup,
}
