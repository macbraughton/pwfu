#!/usr/bin/env node
"use strict";

var _commandLineArgs = _interopRequireDefault(require("command-line-args"));

var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));

var _crypto = _interopRequireDefault(require("crypto"));

var _readline = _interopRequireDefault(require("readline"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secret;

var homeDir = _os["default"].homedir();

var configFile = '.pwfu';

try {
  if (_fs["default"].existsSync(_path["default"].join(homeDir, configFile))) {
    secret = _fs["default"].readFileSync(_path["default"].join(homeDir, configFile));
  }
} catch (_unused) {
  pass;
}

var optionDefinitions = [{
  name: 'algorithm',
  alias: 'a',
  type: String
}, {
  name: 'encoding',
  alias: 'e',
  type: String
}, {
  name: 'src',
  type: String,
  multiple: true,
  defaultOption: true
}, {
  name: 'hashes',
  alias: 'l',
  type: Boolean
}, {
  name: 'help',
  alias: 'h',
  type: Boolean
}, {
  name: 'secret',
  alias: 's',
  type: String,
  multiple: true
}];
var options = (0, _commandLineArgs["default"])(optionDefinitions);

if (!secret) {
  var rl = _readline["default"].createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Tell me a secret so I can salt your passwords:\n", function (secret) {
    _fs["default"].writeFileSync(_path["default"].join(homeDir, configFile), "SECRET=".concat(secret));

    console.log("Mmmm... That's a salty string.");
    rl.close();
  });
} else if (options.secret) {
  _fs["default"].writeFileSync(_path["default"].join(homeDir, configFile), "SECRET=".concat(options.secret.join(" ")));
} else if (options.hashes) {
  var formatHashes = function formatHashes(hashes) {
    var heading = "Available Hashing Algorithms:\n\t";
    var formattedHashes = hashes.join("\n\t");
    return heading + formattedHashes;
  };

  console.log(formatHashes(_crypto["default"].getHashes()));
} else if (options.help) {
  var sections = [{
    header: 'pwfu',
    content: 'Generates random and deterministic passwords'
  }, {
    header: 'Options',
    optionList: [{
      name: 'src',
      typeLabel: '{underline string}',
      description: 'Seed for hashing algorithm'
    }, {
      name: 'algorithm',
      alias: 'a',
      description: 'Hashing algorithm (default: whirlpool)'
    }, {
      name: 'encoding',
      alias: 'e',
      description: 'Output encoding (default: base64)'
    }, {
      name: 'hashes',
      alias: 'l',
      description: 'Print available hashing algorithms'
    }, {
      name: 'help',
      description: 'Print this usage guide.'
    }]
  }];
  var usage = (0, _commandLineUsage["default"])(sections);
  console.log(usage);
} else {
  options.src = options.src ? options.src.join(" ") : String(Math.exp(Math.log2(Math.random() * Date.now())));

  var hash = _crypto["default"].createHmac(options.hasher || 'whirlpool', secret).update(options.src).digest(options.encoding || 'base64');

  console.log(hash.slice(0, 30));
}