WORK IN PROGRESS - Feel free to raise any issues, features or improvements on GitHub!

[![npm version](https://badge.fury.io/js/hash-gen.svg)](https://badge.fury.io/js/hash-gen)
[![npm](https://img.shields.io/npm/dm/hash-gen.svg)](https://www.npmjs.com/package/hash-gen)

[![NPM](https://nodei.co/npm/hash-gen.png?downloads=true&downloadRank=true)](https://nodei.co/npm/hash-gen/)

## What does this program do?

Hash-gen aims to find the matching hex value for a given hash, therefore finding out the
unencrypted value of the hash.

![alt tag](https://s2.postimg.org/74q9wpg7t/Screen_Shot_2017_03_01_at_20_57_40.png)

## Example

Take the number, `500`.

Convert `500` to hex and you will get `1f4`.

Encrypt `1f4` with sha256 and you will get the following hash:

`10be707c02c8eafff11f843178cc5c86381b2d31d3569b268ad4d0a4dc890c7d`

Now, say you are trying to find the value behind this hash. How would Hash-gen
do this? Just run the following:

```bash
$ hash-gen -t 10be707c02c8eafff11f843178cc5c86381b2d31d3569b268ad4d0a4dc890c7d -s 5 -d 1 -h sha256 -V --log
```

After running this command, Hash-gen would set the target hash target to `10be707c02c8eafff11f843178cc5c86381b2d31d3569b268ad4d0a4dc890c7d`, starting at `5` it would increment by `1`, each time converting the number to hex, hashing the hex and checking
to see if the hash is equal to the `target` hash. For example:

```bash
Int:  5
Hex:  5
Hash: ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d

...

Int:  170
Hex:  aa
Hash: 961b6dd3ede3cb8ecbaacbd68de040cd78eb2ed5889130cceb4c49268ea4d506

Int:  171
Hex:  ab
Hash: fb8e20fc2e4c3f248c60c39bd652f3c1347298bb977b8b4d5903b85055620603

Int:  172
Hex:  ac
Hash: f45de51cdef30991551e41e882dd7b5404799648a0a00753f44fc966e6153fc1

Int:  173
Hex:  ad
Hash: 70ba33708cbfb103f1a8e34afef333ba7dc021022b2d9aaa583aabb8058d8d67

Int:  174
Hex:  ae
Hash: f9a00f43e97e3966bb846e76b6795e11512c3bbfa787e6b70e0310c7b9346b98

Int:  175
Hex:  af
Hash: 503126878d17fcd6bde7df320ff6eb7c278a1c42f30014a03b17f3dd0c023c1d
```

If Hash-gen does find a match it will output something similar to this:

```bash
-- A MATCH FOR YOUR HASH VALUE HAS BEEN FOUND --

Writing to /Users/ryan/Documents/hash_logs/sha256-54048.txt...
Successfully saved match.
```

Locate the .txt file, if the `--log` argument was passed, this file will contain all the previous hex/hash pairs.
You may need to run a search on the file for the target hash. Example contents of .txt file:

```
Hash-gen matches.Matched On Int: 500
Hex Value: 01f4
Hash Type: sha256
Hash: bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d
```

Congratulations! You now know that your `target hash` has the hex value of `01f4`.

## 1. Install hash-gen

```bash
$ npm install --global hash-gen
```

Double check the installation has gone smoothly by simply running:

```bash
$ hash-gen
```

If it has, you should see the following message:

```bash
Hash-gen has been successfully installed! Time to get hashing.
```

## 2. Start Hashing!

```bash
$ hash-gen -h sha256 -t bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d -s 5 -d 1 -V -l
```

### Hash Matching
```
-t, --target    The hash you are trying to find a match for
-h, --hash      Type of hash e.g sha256, sha512 etc. (sha256 is default)
-s, --start     The number you would like to start at (1 is default)
-d, --delay     Delay in milliseconds between each hash (5 is default)
-l, --log       Keep a log of all created hashes to file (Can slow hash generation when ON)
-V, --Verbose   Verbose output (Shows hex & hash)
    --ssh       Enables SSH mode (No console output at all) - Highly recommended when running Hash-gen on a VPS
```

### Hash Creation
```
-c, --create    Only used when creating a hash. The value you would like to hash (e.g. password)
-h, --hash      Type of hash e.g sha256, sha512 etc. (sha256 default)
    --digest    hex, base64, utf8, latin1 (hex default)
```

### Global
```
    --help      Shows help for Hash-gen
```

## Currently Supported hashes

`md4`, `md5`, `mdc2`,
`sha`, `sha1`, `sha224`, `sha256`, `sha384`, `sha512`,
`dss1`,
`ripemd`, `ripemd160`, `rmd160`,
`whirlpool`

More hashing algorithm's coming soon! Keep updated via GitHub!
