const symbolicJSON = require('../../lib/symbolic-json');
const path = require('path');
const catchError = require('../_helpers/catchError');

const fixture = file => path.join(__dirname, '../fixtures', file);

describe('symbolic-json', function () {
    describe('simple.json', function () {
        it('returns the contents of the simple json file', function () {
            const jsonContents = symbolicJSON(fixture('simple.json'));
            jsonContents.string.should.equal('bar');
            jsonContents.int.should.equal(123);
            jsonContents.bool.should.be.true;
        });
    });

    describe('linked-json.json', function () {
        it('returns a linked json object', function () {
            const jsonContents = symbolicJSON(fixture('linked-json.json'));
            jsonContents.linked.string.should.equal('bar');
            jsonContents.linked.int.should.equal(123);
            jsonContents.linked.bool.should.be.true;
        });
    });

    describe('linked-html.json', function () {
        it('returns a linked html file', function () {
            const jsonContents = symbolicJSON(fixture('linked-html.json'));
            jsonContents.linked.should.equal('<h1>Simple</h1>\n<p>HTML Part</p>\n');
        });
    });

    describe('linked-text.json', function () {
        it('returns a linked text file', function () {
            const jsonContents = symbolicJSON(fixture('linked-text.json'));
            jsonContents.linked.should.equal('Simple File\nFoo\n');
        });
    });

    describe('linked-empty.json', function () {
        it('returns a linked empty file', function () {
            const jsonContents = symbolicJSON(fixture('linked-empty.json'));
            jsonContents.linked.should.equal('');
        });
    });

    describe('circle-reference.json', function () {
        it('returns a linked empty file', function () {
            const err = catchError(() => symbolicJSON(fixture('circle-reference.json')));
            err.message.should.contain('Circular link');
            err.message.should.contain('circle-reference.json');
        });
    });

    describe('linked-large.json', function () {
        it('returns a large linked object', function () {
            const jsonContents = symbolicJSON(fixture('linked-large.json'));
            jsonContents.html_chunk.should.contain('dapibus erat et dictum.');
        });
    });

    describe('linked-nested.json', function () {
        it('returns a nested linked object', function () {
            const jsonContents = symbolicJSON(fixture('linked-nested.json'));
            jsonContents.nested.linked.string.should.equal('bar');
            jsonContents.nested.linked.int.should.equal(123);
            jsonContents.nested.linked.bool.should.be.true;
        });
    });
});
