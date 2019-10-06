#!/usr/bin/env node
require('dotenv').config()
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const crypto = require("crypto")
const secret = process.env.SECRET

const optionDefinitions = [
  { name: 'algorithm', alias: 'a', type: String },
  { name: 'encoding', alias: 'e', type: String },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'hashes', alias: 'l', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean }
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
else if (options.help) {
  const sections = [
    {
      header: 'pwfu',
      content: 'Generates random and deterministic passwords'
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'src',
          typeLabel: '{underline string}',
          description: 'Seed for hashing algorithm'
        },
        {
          name: 'algorithm',
          alias: 'a',
          description: 'Hashing algorithm (default: whirlpool)',
        },
        {
          name: 'encoding',
          alias: 'e',
          description: 'Output encoding (default: base64)'
        },
        {
          name: 'hashes',
          alias: 'l',
          description: 'Print available hashing algorithms'
        },
        {
          name: 'help',
          description: 'Print this usage guide.'
        }
      ]
    }
  ]
  const usage = commandLineUsage(sections)
  console.log(usage)
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