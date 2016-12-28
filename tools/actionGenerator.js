/**
 * Created by cuitao on 2016/12/28.
 */

import fs from 'fs'
import path from 'path'

const srcPath = path.resolve(__dirname, "../src")
const actionsPath = path.join(srcPath, "actions")
const constantsPath = path.join(srcPath, "constants")

const actionsJsFilePath = path.join(actionsPath, "index.js")
const constantsJsFilePath = path.join(constantsPath, "index.js")


function createDir(dir) {
    if (!fs.existsSync(dir)) {
        createDir(path.basename(dir))
        fs.mkdirSync(dir)
    }
}

function openFile(file) {


    if (fs.existsSync(file))
        fs.unlinkSync(file)
    else
        createDir(path.basename(file))

    return fs.openSync(file, "w")

}

const regex = /[A-Z]?[a-z]+/g

function getMatches(p) {
    const ret = []
    let r

    while (r = regex.exec(p)) {
        ret.push(r[0].toUpperCase())
    }

    return ret
}

const writer = fd => content => fs.writeSync(fd, content)

const withFd = path => work => {
    const fd = openFile(path)
    work(fd)
    fs.closeSync(fd)
}

const contentWriter = head => entryFormat => entryList => fd => {
    writer(fd)(head)
    entryList.forEach(entry => writer(fd)(entryFormat(entry)))
}

const aw = l => withFd(actionsJsFilePath)(contentWriter("import {createAction} from 'redux-act'\nimport * as Const from '../constants'\n\n")(entry => `export const ${entry[0]} = createAction(Const.${entry[1]})\n`)(l))
const cw = l => withFd(constantsJsFilePath)(contentWriter("")(entry => `export const ${entry[1]} = '${entry[1]}'\n`)(l))

const list = fs.readFileSync(path.join(srcPath, "action_def.txt")).toString().trim().split("\n").map(str => [str, getMatches(str).join("_")])
aw(list)
cw(list)
