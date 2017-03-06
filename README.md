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

Convert `500` to hex and you will get `01f4`.

Encrypt `01f4` with sha256 and you will get the following hash:

`bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d`

Now, say you are trying to find the value behind this hash. How would Hash-gen
do this? Just run the following:

```bash
$ hash-gen --target bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d --start 5 --delay 1 --Verbose --log
```

After running this command, Hash-gen would set the target hash target to `bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d`, starting at `5` it would increment by `1`, each time converting the number to hex, hashing the hex and checking
to see if the hash is equal to the `target` hash. For example:

```bash
Integer:    5
Hex Value:  05
Hash Value: c97550ce8213ef5cf6ed4ba48790c137df3ef6a5da20b48961001a634b6cead2


Integer:    6
Hex Value:  06
Hash Value: aacd834b5cdc64a329e27649143406dd068306542988dfc250d6184745894849


Integer:    7
Hex Value:  07
Hash Value: 19b100ab7725c612f3d80ff203ca53cea5cadaafae3bf0f88f0fb4089fe08815


Integer:    8
Hex Value:  08
Hash Value: 323783be9a53a31e158ec9600626a4703e99f4e183bc1acb8772cbdf5c3a1ece


Integer:    9
Hex Value:  09
Hash Value: 3514acf61732f662da19625f7fe781c3e483f2dce8506012f3bb393f5003e105
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
