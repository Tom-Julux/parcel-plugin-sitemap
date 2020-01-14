const { bundle, sleep, mockPkg } = require("./utils");
const { promisify } = require("util");
const readFile = promisify(require("fs").readFile);
const rimraf = promisify(require("rimraf"));

import test from "ava";

test.serial("should create a sitemap", async t => {
    try {
        await mockPkg({
            sitemap: {
                siteURL: "https://www.example.org/"
            }
        });

        await bundle(__dirname + "/integration/index.html");
        await sleep(1000); // Wait for sitemap generation...
        let sitemap = await readFile(__dirname + "/dist/sitemap.xml", "utf8");

        t.is(
            sitemap,
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/dir/subdir.html</loc></url><url><loc>https://www.example.org/exclude.html</loc></url><url><loc>https://www.example.org/index.html</loc></url><url><loc>https://www.example.org/other.html</loc></url></urlset>',
            ""
        );
    } finally {
        await rimraf(__dirname + "/dist/");
        await rimraf(__dirname + "/integration/package.json");
    }
});

test.serial("should use homepage key as alternative", async t => {
    try {
        await mockPkg({
            homepage: "https://www.example.org/"
        });

        await bundle(__dirname + "/integration/index.html");
        await sleep(1000); // Wait for sitemap generation...
        let sitemap = await readFile(__dirname + "/dist/sitemap.xml", "utf8");

        t.is(
            sitemap,
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/dir/subdir.html</loc></url><url><loc>https://www.example.org/exclude.html</loc></url><url><loc>https://www.example.org/index.html</loc></url><url><loc>https://www.example.org/other.html</loc></url></urlset>',
            ""
        );
    } finally {
        await rimraf(__dirname + "/dist/");
        await rimraf(__dirname + "/integration/package.json");
    }
});

test.serial("should exclude glob in sitemap.exclude", async t => {
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

        t.is(
            sitemap,
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/dir/subdir.html</loc></url><url><loc>https://www.example.org/index.html</loc></url><url><loc>https://www.example.org/other.html</loc></url></urlset>',
            ""
        );
    } finally {
        await rimraf(__dirname + "/dist/");
        await rimraf(__dirname + "/integration/package.json");
    }
});

test.serial("should exclude globs[] in sitemap.exclude", async t => {
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

        t.is(
            sitemap,
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.example.org/index.html</loc></url><url><loc>https://www.example.org/other.html</loc></url></urlset>',
            ""
        );
    } finally {
        await rimraf(__dirname + "/dist/");
        await rimraf(__dirname + "/integration/package.json");
    }
});
