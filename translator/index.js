const api = require('../api');

module.exports.translate = translate;
module.exports.getLanguages = getLanguages;

function translate(lang, array, fn) {
    api.getPackLang(lang, (err, res, body) => {
        if(!array || body === null) return fn(array);
        if(body.massage) return console.log(body.massage);

        for (let key in array)
            array[key] = body[array[key]] || array[key];

        fn(array);
    });
}

function getLanguages(fn) {
    api.getLangNames((err, res, body) => {
        delete body._id;
        delete body.name;
        fn(body);
    });
}