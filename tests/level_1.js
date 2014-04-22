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
/*global define, describe, it, assert*/
define(['JsonQuery'], function(JsonQuery) {
    'use strict';
    describe('level_1', function () {
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

            it("first-child", function () {
                assert.deepEqual(new JsonQuery("string:first-child", data), [
                    "window",
                    "beer"
                ]);
            });

            it("grouping", function () {
                assert.deepEqual(new JsonQuery("string.level,number", data), [
                    "advanced",
                    "native",
                    "beginner",
                    172
                ]);
            });

            it("id", function () {
                assert.deepEqual(new JsonQuery(".favoriteColor", data), [
                    "yellow"
                ]);
            });

            it("id_multiple", function () {
                assert.deepEqual(new JsonQuery(".language", data), [
                    "Bulgarian",
                    "English",
                    "Spanish"
                ]);
            });

            it("id_quotes", function () {
                assert.deepEqual(new JsonQuery(".\"weight\"", data), [
                    172
                ]);
            });

            it("id_with_type", function () {
                assert.deepEqual(new JsonQuery("string.favoriteColor", data), [
                    "yellow"
                ]);
            });

            it("last-child", function () {
                assert.deepEqual(new JsonQuery("string:last-child", data), [
                    "aisle",
                    "wine"
                ]);
            });

            it("nth-child-2", function () {
                assert.deepEqual(new JsonQuery("string:nth-child(-n+2)", data), [
                    "window",
                    "aisle",
                    "beer",
                    "whiskey"
                ]);
            });

            it("nth-child", function () {
                assert.deepEqual(new JsonQuery("string:nth-child(odd)", data), [
                    "window",
                    "beer",
                    "wine"
                ]);
            });

            it("nth-last-child", function () {
                assert.deepEqual(new JsonQuery("string:nth-last-child(1)", data), [
                    "aisle",
                    "wine"
                ]);
            });

            it("root_pseudo", function () {
                assert.deepEqual(new JsonQuery(":root", data), [
                    {
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
                    }
                ]);
            });

            it("type", function () {
                assert.deepEqual(new JsonQuery("string", data), [
                    "Lloyd",
                    "Hilaiel",
                    "yellow",
                    "Bulgarian",
                    "advanced",
                    "English",
                    "native",
                    "Spanish",
                    "beginner",
                    "window",
                    "aisle",
                    "beer",
                    "whiskey",
                    "wine"
                ]);
            });

            it("type2", function () {
                assert.deepEqual(new JsonQuery("number", data), [
                    172
                ]);
            });

            it("type3", function () {
                assert.deepEqual(new JsonQuery("object", data), [
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
                    },
                    {
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
                    }
                ]);
            });

            it("universal", function () {
                assert.deepEqual(new JsonQuery("*", data), [
                    "Lloyd",
                    "Hilaiel",
                    {
                        "first": "Lloyd",
                        "last": "Hilaiel"
                    },
                    "yellow",
                    "Bulgarian",
                    "advanced",
                    {
                        "language": "Bulgarian",
                        "level": "advanced"
                    },
                    "English",
                    "native",
                    {
                        "language": "English",
                        "level": "native"
                    },
                    "Spanish",
                    "beginner",
                    {
                        "language": "Spanish",
                        "level": "beginner"
                    },
                    [
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
                    "window",
                    "aisle",
                    [
                        "window",
                        "aisle"
                    ],
                    "beer",
                    "whiskey",
                    "wine",
                    [
                        "beer",
                        "whiskey",
                        "wine"
                    ],
                    172,
                    {
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
                    }
                ]);
            });
        });

        describe('collision', function () {
            var data = {
                "object": {
                    "string": "some string",
                    "stringTwo": "some other string"
                }
            };

            it("nested", function() {
                assert.deepEqual(new JsonQuery(".object .string", data), [
                    "some string"
                ]);
            });

            it("quoted-string", function() {
                assert.deepEqual(new JsonQuery(".\"string\"", data), [
                    "some string"
                ]);
            });

            it("string", function() {
                assert.deepEqual(new JsonQuery(".string", data), [
                    "some string"
                ]);
            });
        });
    });
});