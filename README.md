## What does this program do?

Hash-gen aims to find the matching hex value for a given hash, therefore finding out the
unencrypted value of the hash.

## Example

Take the number, `500`.

Convert `500` to hex and you will get `01f4`.

Encrypt `01f4` with sha256 and you will get the following hash:

`bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d`

Now, say you are trying to find the value behind this hash. How would Hash-gen
do this? Just run the following:

```bash
hash-gen --target bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d --start 5 --delay 1 --Verbose --log
```

After running this command, Hash-gen would set the target hash target to `bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d`, starting at `5` it would increment by `1`, each time converting the number to hex, hashing the hex and checking
to see if the hash is equal to the `target` hash. For example:

```bash
ryan$ hash-gen -t bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d --start 5 --delay 1 --Verbose --log

Hash Type:   sha256
Target Hash: bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d

Created folder: /Users/ryan/Documents/hash_logs
Matches will be saved to: /Users/ryan/Documents/hash_logs/sha256-20811.txt

Starting hashing in 4 seconds.
Starting hashing in 3 seconds.
Starting hashing in 2 seconds.
Starting hashing in 1 seconds.
Starting hashing in 0 seconds.

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

If Hash-gen does finds a match it will output something like this to the console:

```bash
-- A MATCH FOR YOUR HASH VALUE HAS BEEN FOUND --

Writing to /Users/ryan/Documents/hash_logs/sha256-54048.txt...
Successfully saved match.
```

Locate the .txt file (different each time) and you will find the following text:

```
Hash-gen matches.Matched On Int: 500
Hex Value: 01f4
Hash Type: sha256
Hash: bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d
```

Congratulations! You now know that your `target hash` has the hex value of `01f4`.

## 1. Install hash-gen

```bash
npm install --global hash-gen
```
## 2. Start Hashing!

### App options

```bash
hash-gen --target bf9949911bad9ad71e2b8d4904ea4ffd386a6a8fa03e68e1d2ac738fd1d8be4d --start 5 --delay 1 --Verbose --log
```

```
-t, --target    The hash you are trying to find a match for.
-h, --hash      Type of hash e.g sha256, sha512 etc. (sha256 is default)
-s, --start     The number you would like to start at (1 is default).
-d, --delay     Delay in milliseconds between each hash (5 is default).

-l, --log       Keep a log of all created hashes to file (Slower hash generation when ON).
-V, --Verbose   Verbose output (shows hex & hash)
```
