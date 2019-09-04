
import path from 'path'
import fs from 'fs'

import inquirer from 'inquirer'
import { run } from 'speedrun'

const basepath = path.resolve(__dirname, '../example')

const bail = reason => {
  console.error(reason)
  process.exit(1)
}

const getDirectory = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) {
        return reject(err)
      }
      stats.isDirectory()
        ? resolve(file)
        : resolve(false)
    })
  })
}

// Remove files (getDirectory returns false for a non-directory) and
// directories beginning with '_'
const filterDirectories = dirs => {
  return dirs
    .filter(d => d)
    .filter(d => !/^_/.test(path.basename(d)))
}

const iterateBasenames = d => d.map(f => path.basename(f))

const selectExample = examples => {
  if (!examples || !examples.length) {
    return bail(err)
  }

  return inquirer.prompt([{
    type: 'list',
    name: 'example',
    message: 'Please select an example:',
    default: examples[0],
    choices: examples
  }])
    .then(answers => answers.example)
}

const runExample = example => {
  const filepath = path.join('./example', example, 'index.js')

  run({
    entry: filepath
  })
}

fs.readdir(basepath, (err, files) => {
  if (err) {
    return bail(err)
  }

  Promise.all(files
    .map(file => path.join(basepath, file))
    .map(getDirectory))
    .then(filterDirectories)
    .then(iterateBasenames)
    .then(selectExample)
    .then(runExample)
    .catch(bail)
})
