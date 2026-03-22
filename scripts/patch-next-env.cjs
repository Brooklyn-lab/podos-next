/* eslint-disable @typescript-eslint/no-require-imports */
const Module = require('module')
const nextEnv = require('@next/env')

const origLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === '@next/env') {
    return { default: nextEnv, ...nextEnv }
  }
  return origLoad.call(this, request, parent, isMain)
}
