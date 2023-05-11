import * as R from 'ramda'

import { type CommandLine } from './types'
import { type ExecException } from 'child_process'

const exec = require('child_process').exec
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { program } = require('commander')
const yaml = require('js-yaml')
const consolationMenu = require('./consolationMenu')

function runCommand (res): void {
  console.log()
  console.log(chalk.grey(res))
  exec(res, (error: ExecException, stdout: string, _stderr: string) => {
    if (error) {
      throw error
    }
    if (_stderr) {
      console.error(`exec error: ${_stderr}`)
    }
    console.log(stdout)
    process.exit()
  })
}

async function show (menu): Promise<void> {
  const res = await consolationMenu(menu)
  if (res === null) {
    process.exit()
  }
  if (typeof res === 'string') {
    runCommand(res)
  }
}

function extractYaml (input: CommandLine[]) {
  let defKey = 0
  return R.map((val) => {
    return {
      command: val.command,
      key: val.key || (defKey++ + ''),
      description: val.description
    }
  }, input)
}

function extractText (input: string[]): CommandLine[] {
  const finalInput: CommandLine[] = []
  R.forEach((val: string) => {
    if (val.length > 0) {
      finalInput.push({
        command: val,
        key: finalInput.length + '',
        description: ''
      })
    }
  }, input)
  return finalInput
}

async function getConfig (opts: { file: string }): Promise<CommandLine[]> {
  const filepath = path.resolve(process.cwd(), opts.file)
  let finalInput: CommandLine[] = []

  if (opts.file.endsWith('.txt')) {
    let input: string[] = await fs.promises.readFile(filepath)
    input = input.toString().split('\n')
    finalInput = extractText(input)
  } else if (opts.file.endsWith('.yml') || opts.file.endsWith('.yaml')) {
    finalInput = yaml.load(fs.readFileSync(filepath, 'utf8'))
    finalInput = extractYaml(finalInput)
  }
  return finalInput
}

async function run (program: { name: any, parse: any, opts: any }): Promise<void> {
  program.name('console menu')
    .description('cli to show a list of possible commands')
    .version('0.0.1')
    .requiredOption('-f, --file <char>', 'config file')
    .option('-s, --select <char>', 'run this line')

  program.parse()

  const options = program.opts()

  const input = await getConfig(options)
  if (options.select) {
    if (input.length < options.select) {
      console.log(`invalid selection "${options.select}"`)
      process.exit(1)
    }
    runCommand(input[options.select])
  }
  await show(input)
}

run(program).catch(r => {
})
