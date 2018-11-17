# Parcel Sitemap Plugin (with `excluded` option)

Fork of [parcel-plugin-sitemap](https://github.com/parcel-bundler/parcel), a plugin for creating basic sitemaps.  

Added the functionality to exclude HTML files from being added to the sitemap by specifying globs in the package.json field.  
The glob(s) will be negated and passed to [fast-glob](https://www.npmjs.com/package/fast-glob) under the hood.  
```json
"sitemap": {
    "siteURL": "https://www.example.org/",
    "exclude": "static/**/*"
}
```  
or an Array of globs:  
```json
"sitemap": {
    "siteURL": "https://www.example.org/",
    "exclude": [
        "static/**/*",
        "exclude.html"
    ]
}
```
### Disclaimer:

This plugin will not create a fully featured [sitemap](https://www.sitemaps.org/protocol.html), but the most basic one, that is still valid. Parcel makes it easy for you to create an sitemap manually, as html files keep their names, while beeing processed. So if you want to achive perfect SEO optimisation you should not use this plugin, but create a sidemap manually.

**However**, if you, just want to make shure to have all pages listed, so that a search-engines can list them, this plugin has you covert.

## Installation

```bash
yarn add parcel-plugin-sitemap-exclude
```

or

```bash
npm install parcel-plugin-sitemap-exclude
```

## Usage

Add the following snippet to your `package.json` file and replace "https://www.example.org/" with the location where your site will be hosted:

```json
"sitemap": {
    "siteURL": "https://www.example.org/"
}
```

## License

MIT License
