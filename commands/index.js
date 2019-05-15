'use strict'
const program = require('commander')
const chalk = require('chalk').default
const welcomeDisplay = require('./welcome-display')
const { promptLogin } = require('./auth')
const { setupPrompt } = require('./setup')

const appName = 'Paraffin server'

function runCommands() {
  program.version(require('../package.json').version)

  program
    .command('login')
    .alias('l')
    .description(`login to ${appName}`)
    .action(function() {
      promptLogin()
    })

  program
    .command('signup')
    .alias('s')
    .description(`create a new account on ${appName}`)
    .action(setupPrompt)

  program
    .command('configure')
    .alias('c')
    .description(`setup ${appName} locally`)
    .action(setupPrompt)

  program.on('command:*', function() {
    console.log(
      chalk.red(
        `Invalid command: ${program.args.join(
          ' '
        )}\nSee --help for a list of available commands.`
      )
    )
    process.exit(1)
  })

  program.on('--help', function() {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ brokero login')
    console.log('  $ brokero signup')
  })

  if (!process.argv.slice(2).length) {
    program.outputHelp(text => chalk.green(text))
    process.exit(1)
  }

  program.parse(process.argv)
}

module.exports = {
  welcomeDisplay,
  runCommands,
}
