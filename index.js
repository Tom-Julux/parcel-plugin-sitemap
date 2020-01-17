const path = require("path");
const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);
const glob = require("fast-glob");

const getConfig = async (bundle, packageKey) =>
    await bundle.entryAsset.getConfig([], { packageKey });

module.exports = bundler => {
    bundler.on("bundled", async bundle => {
        const { outDir } = bundler.options;
        const options = (await getConfig(bundle, "sitemap")) || {};
        const siteURL =
            options.siteURL || (await getConfig(bundle, "homepage"));

        if (!siteURL) {
            return console.error(
                'parcel-plugin-sitemap: You need to specify a "sitemap.siteURL" option in your package.json file. For example "https://example.org/"'
            );
        }

        let exclude = options.exclude;

        const htmlGlobs = [outDir + "/**/*.html"];

        if (exclude) {
            if (!Array.isArray(exclude)) exclude = [exclude];

            if (exclude.some(s => typeof s !== "string")) {
                return console.error(
                    'parcel-plugin-sitemap: "sitemap.exclude" has to be a string or an Array of strings in glob format.'
                );
            }
            exclude.forEach(glob => htmlGlobs.push("!" + outDir + "/" + glob));
        }

        const createLocationTag = url =>
            `<url><loc>${siteURL}${path.relative(outDir, url)}</loc></url>`;

        const htmlFiles = await glob(htmlGlobs);
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${htmlFiles
            .sort() // keep order stable, mainly to allow for reliable testing
            .map(createLocationTag)
            .join("")}</urlset>`;

        await writeFile(path.join(outDir, "sitemap.xml"), sitemap);
    });
};
