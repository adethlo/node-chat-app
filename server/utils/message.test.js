const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        
        // store res in a variable
        let message = generateMessage(from, text);
        // assert from and text match
        expect(message).toInclude({from, message});
        // assert createAt is number
        expect(message.created_at).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should gernerate correct location object', () => {
        let from = 'Deb';
        let lat = 15;
        let lon = 19;
        let url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, lat, lon);

        // assert from and text match
        expect(message).toInclude({from, url});
        // assert createAt is number
        expect(message.created_at).toBeA('number');
    });
});