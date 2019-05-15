#!/usr/bin/env node

'use strict'
const { welcomeDisplay, runCommands } = require('./commands')

function run() {
  welcomeDisplay()
  runCommands()
}

run()
