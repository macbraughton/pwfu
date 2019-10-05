# password-juju

Just a little CLI random password generator.

# Why?

Because sometimes you need a random password and you don't want to think about it that much.

# Implementation

Just a minimal CLI wrapper over the `node` `crypto` lib.

## Usage

```bash
cp secret.example.js secret.js
# Edit `secret.js`, put in your own secret!
```

```js
password
> GDDsAzDlzDxTlLZaFepEhbYIKB8x5M
password "bucky"
> aoTdc5GKb7p4EXjYZojwdkI5Lei+Ef
```

Get fancy...
```js
password -l
>[ 'RSA-MD4',
  'RSA-MD5',
  'RSA-MDC2',
  'RSA-RIPEMD160',
  ...
  ...
  ....
  'whirlpool' ]

password -h "sha256" "dude"
> O3bckFxvM9Jcl8tR2qWlJt2DXwqvk7
password -h "RSA-MD5" -e "hex" "sharks!"
> 1f311ac92b1f11150ccae3b5bc0d04
```

### TODO

- Maybe we'll turn this into a nice little npm package.
- Maybe change `secret.js` into an environment file
- Check for .env file first when it runs and ask for a secret if it doesn't have one
