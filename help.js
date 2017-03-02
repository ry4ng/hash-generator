function show(){
    console.log("\nHash matching:\n");

    console.log("-t, --target    The hash you are trying to find a match for.");
    console.log("-h, --hash      Type of hash e.g sha256, sha512 etc. (sha256 default)");
    console.log("-s, --start     The number you would like to start at (1 default)");
    console.log("-d, --delay     Delay in milliseconds between each hash (5 default)");
    console.log("-l, --log       Keep a log of all created hashes to file (Can slow hash generation when ON)");
    console.log("-V, --Verbose   Verbose output (shows hex & hash)");
    console.log("    --ssh       Enables SSH mode (No console output at all) - Highly recommended when running Hash-gen on a VPS");

    console.log("\nHash creation:\n");

    console.log("-c, --create    Only used when creating a hash. The value you would like to hash (e.g. password)");
    console.log("-h, --hash      Type of hash e.g sha256, sha512 etc. (sha256 default)");
    console.log("    --digest    hex, base64, utf8, latin1 (hex default)");


    console.log("\nGlobal:\n");
    console.log("    --help      Shows help for Hash-gen\n");

    process.exit(-1);
}

module.exports = {
    show: show
};
