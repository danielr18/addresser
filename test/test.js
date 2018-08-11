'use strict';

var expect = require('chai').expect;
var addressParser = require('../index');

describe('#addressParser', function() {
    it('should parse a simple address', function() {
        var result = addressParser("123 Main St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street name with two words', function() {
        var result = addressParser("123 Fat Duck St, Powder Springs, GA");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Fat Duck");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Fat Duck St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Powder Springs");
        expect(result.stateAbbreviation).to.equal("GA");
        expect(result.stateName).to.equal("Georgia");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street address with double spaces', function() {
        var result = addressParser("123 Main  St, Conway, SC");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.hasOwnProperty("zipCode")).to.equal(false);
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street address with zip code in standard format', function() {
        var result = addressParser("123 Main  St, New Braunfels, TX 78132");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("New Braunfels");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("78132");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse a street address with zip code plus four in standard format', function() {
        var result = addressParser("123 Main  St, Conway, NC 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("NC");
        expect(result.stateName).to.equal("North Carolina");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a state name', function() {
        var result = addressParser("123 Main  St, Conway, South Carolina 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a lowercase state name', function() {
        var result = addressParser("123 Main  St, Conway, south carolina 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Conway");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a lowercase state abbeviation', function() {
        var result = addressParser("123 Main  St, San Antonio, tx 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("San Antonio");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should parse a street address with a delimited zip code', function() {
        var result = addressParser("123 Main  St, Canyon Lake, tx, 29526-3131");
        expect(result.streetNumber).to.equal("123");
        expect(result.streetName).to.equal("Main");
        expect(result.streetSuffix).to.equal("St");
        expect(result.addressLine1).to.equal("123 Main St");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Canyon Lake");
        expect(result.stateAbbreviation).to.equal("TX");
        expect(result.stateName).to.equal("Texas");
        expect(result.zipCode).to.equal("29526");
        expect(result.zipCodePlusFour).to.equal("29526-3131");
    });
    it('should not parse a street address with missing city and state', function() {
        expect(addressParser.bind(addressParser, "123 Main  St")).to.throw('Can not parse address.');
    });
    it('should validate input is not undefined', function() {
        expect(addressParser.bind(addressParser)).to.throw('Argument must be a non-empty string.');
    });
    it('should validate input is a non-empty string', function() {
        expect(addressParser.bind(addressParser, "")).to.throw('Argument must be a non-empty string.');
    });
    it('should not parse an invalid city and state combination', function() {
        expect(addressParser.bind(addressParser, "123 Main St, Canyon Lake, SC, 29526-3131")).to.throw('Can not parse address.');
    });
    it('should not parse an invalid state abbreviation', function() {
        expect(addressParser.bind(addressParser, "123 Main St, Canyon Lake, XX, 29526-3131")).to.throw('Can not parse address.');
    });
    it('should not parse an invalid city name', function() {
        expect(addressParser.bind(addressParser, "123 Main St, Nocityisnamedthis, TX, 29526-3131")).to.throw('Can not parse address.');
    });
    it('should parse an address with same street and city name', function() {
        var result = addressParser("400 South Orange Ave, South Orange , NJ 07079");
        expect(result.streetNumber).to.equal("400");
        expect(result.streetName).to.equal("South Orange");
        expect(result.streetSuffix).to.equal("Ave");
        expect(result.addressLine1).to.equal("400 South Orange Ave");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("South Orange");
        expect(result.stateAbbreviation).to.equal("NJ");
        expect(result.stateName).to.equal("New Jersey");
        expect(result.zipCode).to.equal("07079");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with no city delimiter', function() {
        var result = addressParser("1301 Columbia College Drive Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.hasOwnProperty("addressLine2")).to.equal(false);
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a secondary value on same section with city', function() {
        var result = addressParser("1301 Columbia College Drive Unit 101 Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.addressLine2).to.equal("Unit 101");
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
    it('should parse an address with a secondary value on separate line', function() {
        var result = addressParser("1301 Columbia College Drive, APT A, Columbia, SC 29203");
        expect(result.streetNumber).to.equal("1301");
        expect(result.streetName).to.equal("Columbia College");
        expect(result.streetSuffix).to.equal("Dr");
        expect(result.addressLine1).to.equal("1301 Columbia College Dr");
        expect(result.addressLine2).to.equal("APT A");
        expect(result.placeName).to.equal("Columbia");
        expect(result.stateAbbreviation).to.equal("SC");
        expect(result.stateName).to.equal("South Carolina");
        expect(result.zipCode).to.equal("29203");
        expect(result.hasOwnProperty("zipCodePlusFour")).to.equal(false);
    });
});
