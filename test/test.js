const assert = require("assert");
const { bundle, sleep, mockPkg } = require("./utils");
const { promisify } = require("util");
const readFile = promisify(require("fs").readFile);
const rimraf = promisify(require("rimraf"));

describe("sitemap", function () {
    it("should create a sitemap", async function () {
        try {
            await mockPkg({
                sitemap: {
                    siteURL: "https://www.example.org/"
                }
            });

            await bundle(__dirname + "/integration/index.html");
            await sleep(1000); // Wait for sitemap generation...
            let sitemap = await readFile(__dirname + "/dist/sitemap.xml", "utf8");

            assert.strictEqual(
                sitemap,
                '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/exclude.html</loc></url>,<url><loc>https://www.example.org/index.html</loc></url>,<url><loc>https://www.example.org/other.html</loc></url>,<url><loc>https://www.example.org/dir/subdir.html</loc></url></urlset>',
                ''
            );
        } finally {
            await rimraf(__dirname + "/dist/");
            await rimraf(__dirname + "/integration/package.json");
        }
    });

    it("should exclude glob in sitemap.exclude", async function () {
        try {
            await mockPkg({
                sitemap: {
                    siteURL: "https://www.example.org/",
                    exclude: "exclude.html"
                }
            });

            await bundle(__dirname + "/integration/index.html");
            await sleep(1000); // Wait for sitemap generation...
            let sitemap = await readFile(__dirname + "/dist/sitemap.xml", "utf8");

            assert.strictEqual(
                sitemap,
                '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/other.html</loc></url>,<url><loc>https://www.example.org/index.html</loc></url>,<url><loc>https://www.example.org/dir/subdir.html</loc></url></urlset>',
                ''
            );
        } finally {
            await rimraf(__dirname + "/dist/");
            await rimraf(__dirname + "/integration/package.json");
        }
    });

    it("should exclude globs[] in sitemap.exclude", async function () {
        try {
            await mockPkg({
                sitemap: {
                    siteURL: "https://www.example.org/",
                    exclude: ["dir/*", "exclude.html"]
                }
            });

            await bundle(__dirname + "/integration/index.html");
            await sleep(1000); // Wait for sitemap generation...
            let sitemap = await readFile(__dirname + "/dist/sitemap.xml", "utf8");

            assert.strictEqual(
                sitemap,
                '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/index.html</loc></url>,<url><loc>https://www.example.org/other.html</loc></url></urlset>',
                ''
            );
        } finally {
            await rimraf(__dirname + "/dist/");
            await rimraf(__dirname + "/integration/package.json");
        }
    });
});
