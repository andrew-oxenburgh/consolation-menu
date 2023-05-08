import { CommandLine } from "./commandLine.js"

const consolationMenu = require('./consolationMenu')
const exec = require('child_process').exec
const chalk = require('chalk')
const fs = require('fs')
const path = require('path');
const {program} = require("commander");
const yaml = require('js-yaml');
const R = require("ramda");
function runCommand(res) {
    console.log()
    console.log(chalk.grey(res))
    exec(res, (error, stdout, _stderr) => {
        console.log(stdout)
        process.exit()
    })
}

// console.log(JSON.stringify(types, null, 3))

// @ts-ignore
async function show(menu) {
    const res = await consolationMenu(menu)
    if(res === null){
        process.exit()
    }
    if(typeof res === 'string'){
        runCommand(res);
    }
}

function removeEmptyLines(input: string[]): string[] {
    return input.reduce((acc, val) => {
        if (val.length) {
            acc.push(val)
        }
        return acc
    }, []);
}

function extractYaml(input: CommandLine[]) {
    return R.map((val) => {
        return {
            command: val.command,
            key: val.key,
            description: val.description,
        }
    }, input)
}

function extractText(input: string[]): CommandLine[] {
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

async function getConfig(opts: {file: string}): Promise<CommandLine[]> {
    const filepath = path.resolve(__dirname, opts.file);
    let finalInput: CommandLine[] = []

    if(opts.file.endsWith('.txt')){
        let input: string[] = await fs.promises.readFile(filepath)
        input = input.toString().split('\n')
        finalInput = extractText(input);
    }
    else if(opts.file.endsWith('.yml')||opts.file.endsWith('.yaml')){
        finalInput = yaml.load(fs.readFileSync(filepath, 'utf8'));
        finalInput = extractYaml(finalInput);
    }
    return finalInput
}

async function run(program: { name: Function, parse: Function, opts: Function }) {
    program.name('console menu')
        .description('cli to show a list of possible commands')
        .version('0.0.1')
        .requiredOption('-f, --file <char>', 'config file')
        .option('-s, --select <char>', 'run this line')

    program.parse()

    const options = program.opts();

    let input = await getConfig(options);
    if(options.select){
        if(input.length < options.select){
            console.log(`invalid selection "${options.select}"`)
            process.exit(1)
        }
        runCommand(input[options.select])
    }
    await show(input)
    return ''
}

run(program);



