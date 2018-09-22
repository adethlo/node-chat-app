let generateMessage = (from, text) => {
    return {
        from,
        text,
        created_at: new Date().getTime()
    };
};

let generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        created_at: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };