const path = require("path");
const { promisify } = require("util");
const writeFile = promisify(require("fs").writeFile);
const glob = require("fast-glob");

module.exports = bundler => {
    bundler.on("bundled", async bundle => {
        const { outDir } = bundler.options;
        const options = await bundle.entryAsset.getConfig([], {
            packageKey: "sitemap"
        });

        if (!options || !options.siteURL) {
            return console.error(
                'parcel-plugin-sitemap: You need to specify a "sitemap.siteURL" option in your package.json file. For example "https://example.org/"'
            );
        }

        const htmlGlobs = [outDir + "/**/*.html"];

        if (options.exclude) {
            let { exclude } = options;
            if (!Array.isArray(exclude)) exclude = [exclude];

            if (exclude.some(s => typeof s !== 'string')) {
                return console.error(
                    'parcel-plugin-sitemap: "sitemap.exclude" has to be a string or an Array of strings in glob format.'
                );
            }
            exclude.forEach(glob => htmlGlobs.push('!' + outDir + '/' + glob));
        }

        let htmlFiles = await glob.async(htmlGlobs);
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${htmlFiles.map(
            url =>
                `<url><loc>${options.siteURL}${path.relative(
                    outDir,
                    url
                )}</loc></url>`
        )}</urlset>`;

        await writeFile(path.join(outDir, "sitemap.xml"), sitemap);
    });
};
