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
    describe('level_2', function () {
        describe('sibling', function () {
            var data = {
                "a": 1,
                "b": 2,
                "c": {
                    "a": 3,
                    "b": 4,
                    "c": {
                        "a": 5,
                        "b": 6
                    }
                },
                "d": {
                    "a": 7
                },
                "e": {
                    "b": 8
                }
            };

            it("sibling_childof", function () {
                assert.deepEqual(new JsonQuery(":root > .a ~ .b", data), [
                    2
                ]);
            });

            it("sibling_descendantof", function () {
                assert.deepEqual(new JsonQuery(":root .a ~ .b", data), [
                    2,
                    4,
                    6
                ]);
            });

            it("sibling_unrooted", function () {
                assert.deepEqual(new JsonQuery(".a ~ .b", data), [
                    2,
                    4,
                    6
                ]);
            });
        });
    });
});