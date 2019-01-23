#!/usr/bin/env node

const path = require('path')
const childProcess = require('child_process')

const proc = childProcess.spawn('/bin/sh', ['-c', 'curl -sSL http://releasename.com/api/random'])

proc.stdout.setEncoding('utf8')
proc.stdout.on('data', (data) => {
  try {
    const response = JSON.parse(data)
    console.log('release-' + response.name.split(' ').join('-'))
  } catch (e) {
    console.log('error: go home')
  }
})

process.on('exit', function () {
  proc.kill()
})
