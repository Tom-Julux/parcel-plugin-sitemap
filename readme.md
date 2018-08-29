[![Travis CI](https://travis-ci.org/tom-julux/parcel-plugin-sitemap.svg?branch=master)](https://travis-ci.org/tom-julux/parcel-plugin-sitemap)

# parcel-plugin-sitemap

A parcel plugin for creating basic sitemaps.

### Disclaimer:

This plugin will not create a fully featured sitemap, but the most basic, but still valid one. Parcel makes it easy for you to create an sitemap manually, as html files keep their names, while beeing processed. So if you want to achive perfect SEO optimisation you should not use this plugin, but create a sidemap manually.

**However**, if you, just want to make shure to have all pages listed, so that a search-engines can list them, this plugin has you covert.

## Installation

```bash
yarn add parcel-plugin-sitemap
```

or

```bash
npm install parcel-plugin-sitemap
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
