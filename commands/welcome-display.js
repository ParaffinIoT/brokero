'use strict'

const chalk = require('chalk').default
const figlet = require('figlet')

const showDisplay = () => {
  console.log(
    chalk.white(
      figlet.textSync('Paraffin IOT CLIc', {
        font: 'Computer',
        horizontalLayout: 'full',
        verticalLayout: 'universal smushing',
      })
    )
  )
}

module.exports = showDisplay
