const Bundler = require("parcel-bundler");
const path = require("path");
const Plugin = require("..");

async function bundle(input) {
    const bundler = new Bundler(input, {
        outDir: path.join(__dirname, "dist/"),
        watch: false,
        cache: false,
        hmr: false,
        logLevel: 0,
        publicUrl: "./"
    });
    await Plugin(bundler);
    return await bundler.bundle();
}

exports.bundle = bundle;
exports.sleep = n => new Promise(resolve => setTimeout(resolve, n));
