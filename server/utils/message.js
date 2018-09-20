let generateMessage = (from, txt) => {
    return {
        from,
        txt,
        created_at: new Date().getTime()
    };
};
module.exports = { generateMessage };