# pwfu

Just a little CLI random password generator.

## Why?

Because sometimes you need a random password and you don't want to think about it that much.

## Implementation

Just a minimal CLI wrapper over the `node` `crypto` library.

## Installation

```bash
npm i - g pwfu
```

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
# Add a seed to make it deterministic
> pwfu bucky
8vRPrJZoowi2yuOZOsY69fc+q/MSgW
```

The cool part about generating passwords with a secret and a seed, is that they are deterministic, meaning if you know the seed and the secret you can use a simple phrase to generate the password again if you forget it.

```bash
# New facebook password
echo "SECRET=My little secret" > .env
> pwfu "Zuck no more"
LHFjqWwLHRmPEWAy/LgVNOU1gGMVTj
> pwfu "Zuck no more"
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

### TODO

- Maybe we'll turn this into a nice little npm package.
- Check for .env file first when it runs and ask for a secret if it doesn't have one