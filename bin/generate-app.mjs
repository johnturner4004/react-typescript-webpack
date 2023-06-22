#! usr/bin/env node
/* eslint-disable spellcheck/spell-checker */

import { promisify } from 'util'
import cp from 'child_process'
import path from 'path'
import fs from 'fs'
// cli spinner
import ora from 'ora'

// convert the libs to promises
const exec = promisify(cp.exec)
const rm = promisify(fs.rm)

if (process.argv.length < 3) {
  console.log('Please provide a name for your app.')
  console.log('For example:')
  console.log('npx create-react-typescript-webpack my-app')
  process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const gitRepo = 'https://github.com/johnturner4004/react-typescript-webpack'

try {
  fs.mkdirSync(projectPath)
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(`The file ${projectName} already exists in the current directory.`)
    console.log('Please choose a different name.')
  } else {
    console.log(err)
  }
  process.exit(1)
}

const main = async () => {
  try {
    const gitSpinner = ora('Downloading files...').start()
    // clone the repo into the project folder -> creates the new boilerplate
    await exec(`git clone --depth-1 ${gitRepo} ${projectPath} --quiet`)
    gitSpinner.succeed()

    const cleanSpinner = ora('Removing unused files...').start()
    // remove my .git history
    const rmGit = rm(path.join(projectPath, '.git'), { recursive: true, force: true })
    const rmBin = rm(path.join(projectPath, 'bin'), { recursive: true, force: true })
    await Promise.all([rmGit, rmBin])

    process.chdir(projectPath)
    // remove packages needed for cli
    await exec('npm uninstall ora cli-spinners')
    cleanSpinner.succeed()

    const npmSpinner = ora('Installing dependencies...').start()
    await exec('npm install')
    npmSpinner.succeed()

    console.log('Installation complete.')
    console.log('You can now run your app with:')
    console.log(`cd ${projectName}`)
    console.log('npm run start')
    console.log('Happy hacking!')
  } catch (err) {
    fs.rmSync(projectPath, { recursive: true, force: true })
    console.error(err)
  }
}

main()
