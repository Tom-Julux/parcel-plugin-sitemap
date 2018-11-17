const Bundler = require("parcel-bundler");
const path = require("path");
const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);
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

exports.mockPkg = pkg => writeFile(
    path.resolve(__dirname, "integration", "package.json"),
    JSON.stringify(pkg, null, 2),
    "utf-8"
);

exports.bundle = bundle;
exports.sleep = n => new Promise(resolve => setTimeout(resolve, n));
