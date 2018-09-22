const moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        created_at: moment.valueOf()
    };
};

let generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        created_at: moment.valueOf()
    };
};

module.exports = { generateMessage, generateLocationMessage };