/*
 * Copyright (c) 2011, Lloyd Hilaiel <lloyd@hilaiel.com>
 * Copyright (c) 2013, Gvozdev Viktor <gvozdev.viktor@gmail.com>

 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.

 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
/*global define, describe, xdescribe, it, assert*/
define(['JsonQuery'], function(JsonQuery) {
    'use strict';
    describe('level_3', function () {
        describe('basic', function () {
            var data = {
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

            it("basic_has-multiple", function () {
                assert.deepEqual(new JsonQuery(":root > object:has(string.first):has(string.last)", data), [
                    {
                        "first": "Lloyd",
                        "last": "Hilaiel"
                    }
                ]);
            });

            it("basic_has-root-in-expr", function () {
                assert.deepEqual(new JsonQuery(":has(:root > .first)", data), [
                    {
                        "first": "Lloyd",
                        "last": "Hilaiel"
                    }
                ]);
            });

//            it("basic_has-sans-first-paren", function() {
//                assert.deepEqual(new JsonQuery("object:has .language)", data), [
//                    Error: opening paren expected '(' in 'object:has .language)'
//                ]);
//            });
//
//            it("basic_has-sans-paren", function() {
//                assert.deepEqual(new JsonQuery("object:has(.language", data), [
//                    Error: missing closing paren in 'object:has(.language'
//                ]);
//            });

            it("basic_has-whitespace", function () {
                assert.deepEqual(new JsonQuery(".languagesSpoken object:has       (       .language       )", data), [
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
                ]);
            });

            it("basic_has-with-comma", function () {
                assert.deepEqual(new JsonQuery(":has(:root > .language, :root > .last)", data), [
                    {
                        "first": "Lloyd",
                        "last": "Hilaiel"
                    },
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
                ]);
            });

            it("basic_has", function () {
                assert.deepEqual(new JsonQuery(".languagesSpoken object:has(.language)", data), [
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
                ]);
            });

            it("basic_multiple-has-with-strings", function () {
                assert.deepEqual(new JsonQuery(":has(:val(\"Lloyd\")) object:has(:val(\"Hilaiel\"))", data), [
                    {
                        "first": "Lloyd",
                        "last": "Hilaiel"
                    }
                ]);
            });
        });
        xdescribe('expr', function () {
            var data = {
                "int": 42,
                "float": 3.1415,
                "string": "foo.exe",
                "string2": "bar.dmg",
                "null": null,
                "true": true,
                "false": false
            };

            it("expr_div", function () {
                assert.deepEqual(new JsonQuery(":expr(7 = x / 6)", data), [
                    42
                ]);
            });

            it("expr_ends-with", function () {
                assert.deepEqual(new JsonQuery(":expr(x $= \".dmg\")", data), [
                    "bar.dmg"
                ]);
            });

            it("expr_false-eq", function () {
                assert.deepEqual(new JsonQuery(":expr(false=x)", data), [
                    false
                ]);
            });

            it("expr_greater-than", function () {
                assert.deepEqual(new JsonQuery(":expr(x>3.1)", data), [
                    42,
                    3.1415
                ]);
            });

            it("expr_less-than", function () {
                assert.deepEqual(new JsonQuery(":expr(x<4)", data), [
                    3.1415
                ]);
            });

            it("expr_mod", function () {
                assert.deepEqual(new JsonQuery(":expr((12 % 10) + 40 = x)", data), [
                    42
                ]);
            });

            it("expr_mult", function () {
                assert.deepEqual(new JsonQuery(":expr(7 * 6 = x)", data), [
                    42
                ]);
            });

            it("expr_null-eq", function () {
                assert.deepEqual(new JsonQuery(":expr(null=x)", data), [
                    null
                ]);
            });

            it("expr_number-eq", function () {
                assert.deepEqual(new JsonQuery(":expr(42 = x)", data), [
                    42
                ]);
            });

            it("expr_precedence-1", function () {
                assert.deepEqual(new JsonQuery(".true:expr( 4 + 5 * 6 / 5 + 3 * 2 = 16 )", data), [
                    true
                ]);
            });

            it("expr_precedence-2", function () {
                assert.deepEqual(new JsonQuery(".true:expr( (4 + 5) * 6 / (2 + 1) * 2 = 36 )", data), [
                    true
                ]);
            });

            it("expr_simple-false", function () {
                assert.deepEqual(new JsonQuery(".true:expr(1=2)", data), []);
            });

            it("expr_simple", function () {
                assert.deepEqual(new JsonQuery(".true:expr(1=1)", data), [
                    true
                ]);
            });

            it("expr_starts-with", function () {
                assert.deepEqual(new JsonQuery(":expr(x ^= \"foo\")", data), [
                    "foo.exe"
                ]);
            });

            it("expr_string-eq", function () {
                assert.deepEqual(new JsonQuery(":expr(x = \"foo.exe\")", data), [
                    "foo.exe"
                ]);
            });

            it("expr_true-eq", function () {
                assert.deepEqual(new JsonQuery(":expr(true = x)", data), [
                    true
                ]);
            });
        });
        describe('polykids', function () {
            var data = [
                {
                    "language": "Bulgarian",
                    "level": "advanced"
                },
                {
                    "language": "English",
                    "level": "native",
                    "preferred": true
                },
                {
                    "language": "Spanish",
                    "level": "beginner"
                }
            ];

            it("polykids_has-with_descendant", function() {
                assert.deepEqual(new JsonQuery(":has(.preferred) > .language", data), [
                    "English"
                ]);
            });

            it("polykids_val", function() {
                assert.deepEqual(new JsonQuery(":has(:root > .language:val(\"Bulgarian\")) > .level", data), [
                    "advanced"
                ]);
            });
        });
    });
});