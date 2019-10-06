#!/usr/bin/env node
require('dotenv').config()
const commandLineArgs = require('command-line-args')
const crypto = require("crypto")
const secret = process.env.SECRET
const optionDefinitions = [
  { name: 'random', alias: 'r', type: Boolean },
  { name: 'algorithm', alias: 'a', type: String },
  { name: 'encoding', alias: 'e', type: String },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'hashes', alias: 'l', type: Boolean }
]

const options = commandLineArgs(optionDefinitions)

if (options.hashes) {
  const formatHashes = hashes => {
    let heading = "Available Hashing Algorithms:\n\t"
    let formattedHashes = hashes.join("\n\t")
    return heading + formattedHashes
  }
  console.log(formatHashes(crypto.getHashes()))
} 
else {
  options.src = options.src 
    ? options.src.join("") 
    : String(Math.exp(Math.log2(Math.random() * Date.now())))
  
  let hash = crypto.createHmac(options.hasher || 'whirlpool', secret)
        .update(options.src)
        .digest(options.encoding || 'base64')
  
  console.log(hash.slice(0, 30))
}