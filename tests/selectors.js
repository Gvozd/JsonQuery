var JsonQuery = require('../dist/JsonQuery.js');
var fs = require('fs'), path = require('path'), sys = require('sys');

var pathToTests = path.join(__dirname, "tests");

fs.readdirSync(pathToTests).forEach(function(subdir) {
    "use strict";
    var currentPath = path.join(pathToTests, subdir);
    if (!fs.statSync(currentPath).isDirectory()) {
        return;
    }
    var files = fs.readdirSync(currentPath);
    files.forEach(function(file) {
        var testCase = /^([^.][A-Za-z]+)_(.+)\.selector$/.exec(file);
        if (testCase) {
            exports[subdir + '/' + testCase[1] + '_' + testCase[2]] = function(test){
                test.expect(1);
                var selector = String(fs.readFileSync(path.join(currentPath, file))).trim();
                var data = JSON.parse(fs.readFileSync(path.join(currentPath, testCase[1] + '.json')));
                var actual = JsonQuery(selector, data).map(function(el) {return JSON.stringify(el, undefined, 4)}).join("\n");
                var expected = String(fs.readFileSync(path.join(currentPath, file.replace(/selector$/, "output")))).trim();
                test.equal(actual.trim().replace(/\r?\n/g, '\n'), expected.trim().replace(/\r?\n/g, '\n'));
                test.done();
            };
        }
    });
});
console.log(exports);