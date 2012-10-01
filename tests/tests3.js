/**
 * @url https://github.com/lloyd/JSONSelectTests
 */
/*global parser, convertResult, findByFilter, ok, equal, deepEqual */
/*global convertResult2 */
(function () {
    'use strict';
    var data;
    data = {
        "name": {
            "first": "Lloyd",
            "last": "Hilaiel"
        },
        "favoriteColor": "yellow",
        "languagesSpoken": [
            {
                "language": "Bulgarian",
                "level": "advanced"
            },
            {
                "language": "English",
                "level": "native"
            },
            {
                "language": "Spanish",
                "level": "beginner"
            }
        ],
        "seatingPreference": [
            "window",
            "aisle"
        ],
        "drinkPreference": [
            "beer",
            "whiskey",
            "wine"
        ],
        "weight": 172
    };
    function test(name, selector, filterStringExpected, resultExpected) {
        window.test(name, function () {
            var filter, filterString, result;
            filter = parser.parse(selector);
            filterString = filter.toString();
            result = convertResult(findByFilter(filter, data));
            equal(filterString, filterStringExpected, 'built filter');
            deepEqual(result, resultExpected, 'built result');
        });
    }
    return;
    test('basic_has-multiple', ':root > object:has(string.first):has(string.last)', '', []);//{,"first": "Lloyd",,"last": "Hilaiel",}
    test('basic_has-root-in-expr', ':has(:root > .first)', '', []);//{,"first": "Lloyd",,"last": "Hilaiel",}
    test('basic_has-sans-first-paren', 'object:has .language)', '', []);//Error: opening paren expected '(' in 'object:has .language)'
    test('basic_has-sans-paren', 'object:has(.language', '', []);//Error: missing closing paren in 'object:has(.language'
    test('basic_has-whitespace', '.languagesSpoken object:has       (       .language       )', '', []);//{,"language": "Bulgarian",,"level": "advanced",},{,"language": "English",,"level": "native",},{,"language": "Spanish",,"level": "beginner",}
    test('basic_has-with-comma', ':has(:root > .language, :root > .last)', '', []);//{,"first": "Lloyd",,"last": "Hilaiel",},{,"language": "Bulgarian",,"level": "advanced",},{,"language": "English",,"level":"native",},{,"language": "Spanish",,"level": "beginner",},
    test('basic_has', '.languagesSpoken object:has(.language)', '', []);//{,"language": "Bulgarian",,"level": "advanced",},{,"language": "English",,"level": "native",},{,"language": "Spanish",,"level": "beginner",}
    test('basic_multiple-has-with-strings', ':has(:val("Lloyd")) object:has(:val("Hilaiel"))', '', []);//{,"first": "Lloyd",,"last": "Hilaiel",},
    test('expr_div', ':expr(7 = x / 6)', '', []);//42
    test('expr_ends-with', ':expr(x $= ".dmg")', '', []);//"bar.dmg"
    test('expr_false-eq', ':expr(false=x)', '', []);//false,,
    test('expr_greater-than', ':expr(x>3.1)', '', []);//42,3.1415
    test('expr_less-than', ':expr(x<4)', '', []);//3.1415,
    test('expr_mod', ':expr((12 % 10) + 40 = x)', '', []);//42
    test('expr_mult', ':expr(7 * 6 = x)', '', []);//42
    test('expr_null-eq', ':expr(null=x)', '', []);//null,,,,
    test('expr_number-eq', ':expr(42 = x)', '', []);//42
    test('expr_precedence-1', '.true:expr( 4 + 5 * 6 / 5 + 3 * 2 = 16 )', '', []);//true
    test('expr_precedence-2', '.true:expr( (4 + 5) * 6 / (2 + 1) * 2 = 36 )', '', []);//true
    test('expr_simple-false', '.true:expr(1=2)', '', []);//
    test('expr_simple', '.true:expr(1=1)', '', []);//true
    test('expr_starts-with', ':expr(x ^= "foo")', '', []);//"foo.exe"
    test('expr_string-eq', ':expr(x = "foo.exe")', '', []);//"foo.exe"
    test('expr_true-eq', ':expr(true = x)', '', []);//true,,
    test('polykids_has-with_descendant', ':has(.preferred) > .language', '', []);//"English"
    test('polykids_val', ':has(:root > .language:val("Bulgarian")) > .level', '', []);//"advanced",






}());

