# pwfu

Just a little CLI random password generator.

## Why?

Because sometimes you need to generate a password and you don't want to think about it that much.

## Implementation

Just a minimal CLI wrapper over the `node` `crypto` library.

## Installation

```bash
cargo install pwfu
```

## Definitions

There are a few concepts involved in generating a password with `pwfu`:
- hash
- secret
- salt
- seed

A *hash* is just the output of the function we use to produce our password.
The *secret* is used to *salt* the password.
The *seed* is used to generate a *hash*.
The *secret* is just something you store locally that helps the program to generate hashes that are unique. This is called *salting*.
The *seed* is optional, but you can use if you want to reproduce a *hash*. If you have the same *secret* and *seed* you'll get the same *hash*.

## Usage

```bash
# First run you need to give a secret for salting your hashes
> pwfu
Tell me a secret so I can salt your passwords:
# prompts for user input
[This can be pretty much whatever you want]
# response
Mmmm... what a salty string.
# Just give me a random password!
> pwfu
p3eneRZgoesyhZgOLqsSX5VyM9lpWd
```
## Deterministic passwords

This can be useful if you want to create a complex password from a unique secret and seed.

```bash
# New facebook password
> pwfu -s My little secret
> pwfu Zuck no more
LHFjqWwLHRmPEWAy/LgVNOU1gGMVTj
# Secrets make passwords generated from seeds deterministic
> pwfu Zuck no more
LHFjqWwLHRmPEWAy/LgVNOU1gGMVTj
```

Get fancy...
```bash
$ pwfu -l
Available Hashing Algorithms:
        RSA-MD4
        RSA-MD5
        RSA-MDC2
        ...
        ...
        ...
        ssl3-md5
        ssl3-sha1
        whirlpool
> pwfu -a "sha256" "dude"
O3bckFxvM9Jcl8tR2qWlJt2DXwqvk7
> pwfu -a "RSA-MD5" -e "hex" "sharks!"
1f311ac92b1f11150ccae3b5bc0d04
```

## Disclaimer

If you want to use this for anything other than locally generating unique passwords, I won't judge but that probably isn't a very good idea.

## License

MIT
