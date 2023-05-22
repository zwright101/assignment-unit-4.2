/**
 * We have to do a bit of work upfront to allow the tests
 * to run in the browser and in Node.js. 
 */
let assert, expect;
let root;
if (typeof window === 'object') {
    // Run tests in browser
    assert = chai.assert;
    expect = chai.expect;
    mocha.setup('bdd');
    root = document;
} else {
    // Run tests in Node.js
    assert = require('assert');
    expect = require('chai').expect;
    // get filesystem module
    const fs = require("fs");
    const { parse } = require('node-html-parser');
    // using the readFileSync() function and passing the path to the file
    const buffer = fs.readFileSync('assignment/index.html');
    // use the toString() method to convert Buffer into String
    const fileContent = buffer.toString();
    root = parse(fileContent);
}

/**
 * Put all tests within this describe.
 */
describe('Automated tests', function () {
    describe('The original `<h1>` and `<p>` placed in a `<header>`', function () {
        it('The original `<h1>` and `<p>` placed in a `<header>`', function () {
            let header = root.querySelector('header');
            expect(header, '<header> element not found.').to.exist;
            let h1 = header.querySelector('h1');
            expect(h1, '<h1> not in header.').to.exist;
            let p = header.querySelector('p');
            expect(p, '<p> not in header.').to.exist;
        });
    });
    describe('Background color added to the `<header>`', function () {
        it('Background color added to the `<header>`', function () {
            if (typeof window === 'object') {
                let header = root.querySelector('header');
                expect(header, '<header> element not found.').to.exist;
                let style = window.getComputedStyle(header);
                let backgroundColor = style.getPropertyValue('background-color');
                expect(backgroundColor, '<header> element does not have background color.').not.to.be.empty;
                expect(backgroundColor, '<header> element does not have background color.').to.not.equal('rgba(0, 0, 0, 0)');
            } else {
                // Unable to test background color with node
                this.skip();
            }
        });
    });
    describe('Added `div` with class of "info"', function () {
        it('Added `div` with class of "info"', function () {
            let div = root.querySelector('.info');
            expect(div, '<div> with class info not found.').to.exist;
        });
    });
    describe('Text content added to the `<h2>`', function () {
        it('Text content added to the `<h2>`', function () {
            let h2 = root.querySelector('.info > h2');
            expect(h2, '<h2> element was not found in div.').to.exist;
            expect(h2.innerHTML, '<h2> was empty.').not.to.be.empty;
        });
    });
    describe('Background color added to the `<h2>`', function () {
        it('Background color added to the `<h2>`', function () {
            if (typeof window === 'object') {
                let h2 = root.querySelector('.info > h2');
                expect(h2, '<h2> element was not found in div.').to.exist;
                let style = window.getComputedStyle(h2);
                let backgroundColor = style.getPropertyValue('background-color');
                expect(backgroundColor, '<h2> element does not have background color.').not.to.be.empty;
                expect(backgroundColor, '<h2> element does not have background color.').to.not.equal('rgba(0, 0, 0, 0)');
            } else {
                // Unable to test background color with node
                this.skip();
            }
        });
    });
    describe('Added `<img>` element', function () {
        it('Added `<img>` element', function () {
            let img = root.querySelector('img');
            expect(img, '<img> element was not found.').to.exist;
            expect(img.src, 'src was empty.').not.to.be.empty;
        });
    });
    describe('Text content added to the `<h3>`', function () {
        it('Text content added to the `<h3>`', function () {
            let h3 = root.querySelector('h3');
            expect(h3, '<h3> element was not found.').to.exist;
            expect(h3.innerHTML, '<h3> was empty.').not.to.be.empty;
        });
    });
});

/**
 * If running the tests in the browser, call mocha.run()
 */
if (typeof window === 'object') {
    mocha.run();
}
