const AUTOPREFIXER = [
    "Android >= 4",
    "chrome >= 35",
    "Explorer >= 8",
    "Firefox >= 31"
]


module.exports = {
    plugins: [
        require("autoprefixer")({ overrideBrowserslist: [ '> 0.15% in CN' ] })
    ]
}


