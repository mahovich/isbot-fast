const expect = require("chai").expect;
const isBot = require("../index");

it("returns true when useragent is bot", function(){

    const data = [
        "ads_googlebot", 
        "site_check", 
        "cloudflare", 
        "crawler_test", 
        "site_download", 
        "site_monitor", 
        "bingpreview", 
        "site_scan", 
        "baiduspider", 
        "google",
        "qwantify", 
        "yahoo_search", 
        "facebookexternalhit_test", 
        "flipboard_test", 
        "test_tumblr", 
        "test_vkshare", 
        "whatsapp-test",
        "curl-test", 
        "perl-test", 
        "python-test", 
        "wget-test",
        "heritrix-test", 
        "ia_archiver_test"
    ];

    data.forEach(useragent => {
        const expected = true;
        const actual = isBot(useragent);
        expect(actual).to.be.equal(expected);
    });
 
});

it("returns true when useragent is bot", function(){
    const useragent = "check";
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

it("takes excludes as parameter", function(){
    const useragent = "googleBot";
    const expected = false;
    const actual = isBot(useragent, null, ["google"]);;
    expect(actual).to.be.equal(expected);
});

it("takes includes as parameter", function(){
    const useragent = "foo";
    const expected = true;
    const actual = isBot(useragent, ["foo"]);;
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
