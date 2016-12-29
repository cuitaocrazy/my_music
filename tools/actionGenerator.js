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

const writerBuilder = settings => entryList => {
    const workers = settings.map(s => {
        const fd = openFile(s.path)
        fs.writeSync(fd, s.head)
        return {
            entryWrite: entry => fs.writeSync(fd, s.entryFormat(entry)),
            close: () => fs.closeSync(fd)
        }
    })

    const combine = {
        entryWrite: entry => workers.forEach(w => w.entryWrite(entry)),
        close: () => workers.forEach(w => w.close())
    }

    entryList.forEach(entry => combine.entryWrite(entry))
    combine.close()
}

const list = fs.readFileSync(path.join(srcPath, "action_def.txt")).toString().trim().split("\n").map(str => [str, getMatches(str).join("_")])

writerBuilder([
    {
        path: actionsJsFilePath,
        head: "import {createAction} from 'redux-act'\nimport * as Const from '../constants'\n\n",
        entryFormat: entry => `export const ${entry[0]} = createAction(Const.${entry[1]})\n`
    },
    {
        path: constantsJsFilePath,
        head: "",
        entryFormat: entry => `export const ${entry[1]} = '${entry[1]}'\n`
    }
])(list)
