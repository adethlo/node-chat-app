const expect = require('expect');

const { generateMessage } = require('./message');

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