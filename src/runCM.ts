const consolationMenu = require('./consolationMenu')
const exec = require('child_process').exec
const chalk = require('chalk')


// @ts-ignore
async function run() {
    const res = await consolationMenu([
        'ls -al', 'ls -a', 'ls', 'echo dude'
    ])
    if(res === null){
        process.exit()
    }
    if(typeof res === 'string'){
        console.log('running ' + chalk.grey(res))
        exec(res, (error, stdout, stderr) => {
            console.log(stdout)
            process.exit()
        })
    }
}

run()


