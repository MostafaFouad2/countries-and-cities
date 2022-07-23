var config = {
    "lang": "ar",
    "langFile": "./../../ar.json"//relative path to index.js file of i18n-nodejs module
}
//init internationalization / localization class
var i18n_module = require('i18n-nodejs');
var i18n = new i18n_module(config.lang, config.langFile);

const translate = (st)=>i18n.__(st);



module.exports = translate;