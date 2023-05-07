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

function removeEmptyLines(input) {
    return input.reduce((acc, val) => {
        if (val.length) {
            acc.push(val)
        }
        return acc
    }, []);
}

async function getConfig(opts) {
    const filepath = path.resolve(__dirname, opts.file);
    let input = await fs.promises.readFile(filepath)
    let finalInput = []

    if(opts.file.endsWith('.txt')){
        input = input.toString().split('\n')
        input = removeEmptyLines(input)
        finalInput = R.map((val)=>{
            return {
                command: val,
                key: -1,
                description: ''
            }
        }, input)
    }
    else if(opts.file.endsWith('.yml')||opts.file.endsWith('.yaml')){
        input = input.toString().split('\n')
        input = yaml.load(input, {});
        finalInput = R.map((val)=>{
            return {
                command: '',
                key: '',
                description: '',
                ...val
            }
        }, input)
    }
    return finalInput
}

async function run(program) {
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



