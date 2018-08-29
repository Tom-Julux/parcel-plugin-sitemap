const assert = require("assert");
const { bundle, sleep } = require("./utils");
const { promisify } = require("util");
const readFile = promisify(require("fs").readFile);
const rimraf = promisify(require("rimraf"));
afterEach(async () => await rimraf(__dirname + "/dist/"));
describe("sitemap", function() {
    it("should create a sitemap", async function() {
        await bundle(__dirname + "/integration/index.html");
        await sleep(1000); // Wait for sitemap generation...
        let sitemap = await readFile(__dirname + "/dist/sitemap.xml", "utf8");
        assert.equal(
            sitemap,
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/index.html</loc></url>,<url><loc>https://www.example.org/other.html</loc></url></urlset>'
        );
    });
});
