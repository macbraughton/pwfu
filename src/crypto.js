#!/usr/bin/env node
import dotenv from 'dotenv'
dotenv.config()
import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import crypto from 'crypto'
import readline from 'readline'
import fs from 'fs'

const secret = process.env.SECRET

const optionDefinitions = [
  { name: 'algorithm', alias: 'a', type: String },
  { name: 'encoding', alias: 'e', type: String },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'hashes', alias: 'l', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean }
]

const options = commandLineArgs(optionDefinitions)
if (!process.env.SECRET) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question("Tell me a secret so I can salt your passwords:\n", 
    secret => {
      fs.writeFileSync('.env', `SECRET=${secret}`)
      console.log("Mmmm... That's a salty string.");
      rl.close()
  })
}
else if (options.hashes) {
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
    ? options.src.join(" ") 
    : String(Math.exp(Math.log2(Math.random() * Date.now())))
  
  let hash = crypto.createHmac(options.hasher || 'whirlpool', secret)
        .update(options.src)
        .digest(options.encoding || 'base64')
  
  console.log(hash.slice(0, 30))
}