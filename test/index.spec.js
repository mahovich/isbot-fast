const expect = require("chai").expect;
const isBot = require("../index");

it("returns true when useragent is bot", function(){
    const useragent = "googlebot";
    const expected = true;
    const actual = isBot(useragent);
    expect(actual).to.be.equal(expected);
});


it("returns false when useragent is not bot", function(){
    const useragent = "mozilla";
    const expected = false;
    const actual = isBot(useragent);
    expect(actual).to.be.equal(expected);
});

describe("extend", function(){

    it("can extend list of bots", function(){
        const useragent = "pingdom";
        let actual = isBot(useragent);
        expect(actual).to.be.equal(false);

        isBot.extend(["pingdom"]);
        const expected = true;
        actual = isBot(useragent);
        expect(actual).to.be.equal(expected);
    });

});
