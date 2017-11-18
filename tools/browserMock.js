const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body><div id="aw" class="background-image-login-page"`).window;

global.window = dom;
global.document = window.document;
global.navigator = {
    userAgent: "node.js",
};

Object.defineProperty(document, "getElementsByClassName", { value: function() {
    return [{value:"background-image-login-page", style: { 0: "transform", "transform":"translate(20px, -10px) scale(1.2)" }}];
} });

//mocking DOM for test environment
