#!/usr/bin/env node

const commandLineArgs = require('command-line-args')
const crypto = require("crypto")

const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'random', alias: 'r', type: Boolean },
  { name: 'hasher', alias: 'h', type: String },
  { name: 'encoding', alias: 'e', type: String },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'hashes', type: Boolean }
  //{ name: 'timeout', alias: 't', type: Number }
]

const options = commandLineArgs(optionDefinitions)

const secret =
  `I didn't think we had any secrets here. I mean, we're all adults, right?`

options.src = options.src 
  ? options.src.join("") 
  : String(Math.exp(Math.log2(Math.random() * Date.now())))

let  hash = crypto.createHmac(options.hasher || 'whirlpool', secret)
      .update(options.src)
      .digest(options.encoding || 'base64')

console.log(hash.slice(0, 30))

if (options.hashes) console.log(crypto.getHashes())
