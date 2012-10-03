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
        "weight": 172,
        "quoted\"property\"": "value of quoted"
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

    //test('basic_first-child', 'string:first-child', '', []);//"window","beer"
    test('basic_grouping',
        'string.level,number',
        'unionOr(unionOr(unionAnd(filterRoot(), unionAnd(filterType("string"), filterName("level"))),descendantUnion(filterRoot(),unionAnd(filterType("string"), filterName("level")))),unionOr(unionAnd(filterRoot(), filterType("number")),descendantUnion(filterRoot(),filterType("number"))))',
        [
            [":root>.languagesSpoken>.0>.level", data.languagesSpoken[0].level],
            [":root>.languagesSpoken>.1>.level", data.languagesSpoken[1].level],
            [":root>.languagesSpoken>.2>.level", data.languagesSpoken[2].level],
            [":root>.weight", data.weight]
        ]);
    test('basic_id',
        '.favoriteColor',
        'unionOr(unionAnd(filterRoot(), filterName("favoriteColor")),descendantUnion(filterRoot(),filterName("favoriteColor")))',
        [[":root>.favoriteColor", data.favoriteColor]]);
    test('basic_id_multiple',
        '.language',
        'unionOr(unionAnd(filterRoot(), filterName("language")),descendantUnion(filterRoot(),filterName("language")))',
        [
            [":root>.languagesSpoken>.0>.language", data.languagesSpoken[0].language],
            [":root>.languagesSpoken>.1>.language", data.languagesSpoken[1].language],
            [":root>.languagesSpoken>.2>.language", data.languagesSpoken[2].language]
        ]);
    test('basic_id_quotes',
        '."weight"',
        'unionOr(unionAnd(filterRoot(), filterName("weight")),descendantUnion(filterRoot(),filterName("weight")))',
        [
            [':root>.weight', data.weight]
        ]);//172,
    test('extend_id_quotes',
        '."quoted\\"property\\""',
        'unionOr(unionAnd(filterRoot(), filterName("quoted\\"property\\"")),descendantUnion(filterRoot(),filterName("quoted\\"property\\"")))',
        [
            [':root>.quoted\"property\"', data['quoted"property"']]
        ]);//172,
    test('basic_id_with_type',
        'string.favoriteColor',
        'unionOr(unionAnd(filterRoot(), unionAnd(filterType("string"), filterName("favoriteColor"))),descendantUnion(filterRoot(),unionAnd(filterType("string"), filterName("favoriteColor"))))',
        [[":root>.favoriteColor", data.favoriteColor]]);
    //test('basic_last-child', 'string:last-child', '', []);//"aisle","wine"
    //test('basic_nth-child-2', 'string:nth-child(-n+2)', '', []);//"window","aisle","beer","whiskey"
    //test('basic_nth-child', 'string:nth-child(odd)', '', []);//"window","beer","wine"
    //test('basic_nth-last-child', 'string:nth-last-child(1)', '', []);//"aisle","wine"
    test('basic_root_pseudo',
        ':root',
        'filterRoot()',
        [[":root", data]]);

    test('basic_type',
        'string',
        'unionOr(unionAnd(filterRoot(), filterType("string")),descendantUnion(filterRoot(),filterType("string")))',
        [
            [":root>.name>.first", data.name.first],
            [":root>.name>.last", data.name.last],
            [":root>.favoriteColor", data.favoriteColor],
            [":root>.languagesSpoken>.0>.language", data.languagesSpoken[0].language],
            [":root>.languagesSpoken>.0>.level", data.languagesSpoken[0].level],
            [":root>.languagesSpoken>.1>.language", data.languagesSpoken[1].language],
            [":root>.languagesSpoken>.1>.level", data.languagesSpoken[1].level],
            [":root>.languagesSpoken>.2>.language", data.languagesSpoken[2].language],
            [":root>.languagesSpoken>.2>.level", data.languagesSpoken[2].level],
            [":root>.seatingPreference>.0", data.seatingPreference[0]],
            [":root>.seatingPreference>.1", data.seatingPreference[1]],
            [":root>.drinkPreference>.0", data.drinkPreference[0]],
            [":root>.drinkPreference>.1", data.drinkPreference[1]],
            [":root>.drinkPreference>.2", data.drinkPreference[2]],
            [':root>.quoted\"property\"', data['quoted"property"']]
        ]);//"Lloyd","Hilaiel","yellow","Bulgarian","advanced","English","native","Spanish","beginner","window","aisle","beer","whiskey","wine"
    test('basic_type2',
        'number',
        'unionOr(unionAnd(filterRoot(), filterType("number")),descendantUnion(filterRoot(),filterType("number")))',
        [[":root>.weight", data.weight]]);//172
    test('basic_type3',
        'object',
        'unionOr(unionAnd(filterRoot(), filterType("object")),descendantUnion(filterRoot(),filterType("object")))',
        [
            [":root", data ],
            [":root>.name", data.name ],
            [":root>.languagesSpoken>.0", data.languagesSpoken[0]],
            [":root>.languagesSpoken>.1", data.languagesSpoken[1]],
            [":root>.languagesSpoken>.2", data.languagesSpoken[2]]
        ]);//{,"first": "Lloyd",,"last": "Hilaiel",},{,"language": "Bulgarian",,"level": "advanced",},{,"language": "English",,"level": "native",},{,"language": "Spanish",,"level": "beginner",},{,"name": {,"first": "Lloyd",,"last": "Hilaiel",},,"favoriteColor": "yellow",,"languagesSpoken": [,{,"language": "Bulgarian",,"level": "advanced",},,{,"language": "English",,"level": "native",},,{,"language": "Spanish",,"level": "beginner",},],,"seatingPreference": [,"window",,"aisle",],,"drinkPreference": [,"beer",,"whiskey",,"wine",],,"weight": 172,}

    test('basic_universal',//?
        '*',
        'unionOr(unionAnd(filterRoot(), filterAny()),descendantUnion(filterRoot(),filterAny()))',
        [
            [":root", data],
            [":root>.name", data.name],
            [":root>.name>.first", data.name.first],
            [":root>.name>.last", data.name.last],
            [":root>.favoriteColor", data.favoriteColor],
            [":root>.languagesSpoken", data.languagesSpoken],
            [":root>.languagesSpoken>.0", data.languagesSpoken[0]],
            [":root>.languagesSpoken>.0>.language", data.languagesSpoken[0].language],
            [":root>.languagesSpoken>.0>.level", data.languagesSpoken[0].level],
            [":root>.languagesSpoken>.1", data.languagesSpoken[1]],
            [":root>.languagesSpoken>.1>.language", data.languagesSpoken[1].language],
            [":root>.languagesSpoken>.1>.level", data.languagesSpoken[1].level],
            [":root>.languagesSpoken>.2", data.languagesSpoken[2]],
            [":root>.languagesSpoken>.2>.language", data.languagesSpoken[2].language],
            [":root>.languagesSpoken>.2>.level", data.languagesSpoken[2].level],
            [":root>.seatingPreference", data.seatingPreference],
            [":root>.seatingPreference>.0", data.seatingPreference[0]],
            [":root>.seatingPreference>.1", data.seatingPreference[1]],
            [":root>.drinkPreference", data.drinkPreference],
            [":root>.drinkPreference>.0", data.drinkPreference[0]],
            [":root>.drinkPreference>.1", data.drinkPreference[1]],
            [":root>.drinkPreference>.2", data.drinkPreference[2]],
            [":root>.weight", data.weight],
            [':root>.quoted\"property\"', data['quoted"property"']]
        ]);//"Lloyd","Hilaiel",{,"first": "Lloyd",,"last": "Hilaiel",},"yellow","Bulgarian","advanced",{,"language": "Bulgarian",,"level": "advanced",},"English","native",{,"language": "English",,"level": "native",},"Spanish","beginner",{,"language": "Spanish",,"level": "beginner",},[,{,"language": "Bulgarian",,"level": "advanced",},,{,"language": "English",,"level": "native",},,{,"language": "Spanish",,"level": "beginner",},],"window","aisle",[,"window",,"aisle",],"beer","whiskey","wine",[,"beer",,"whiskey",,"wine",],172,{,"name": {,"first": "Lloyd",,"last": "Hilaiel",},,"favoriteColor": "yellow",,"languagesSpoken": [,{,"language": "Bulgarian",,"level": "advanced",},,{,"language": "English",,"level": "native",},,{,"language": "Spanish",,"level": "beginner",},],,"seatingPreference": [,"window",,"aisle",],,"drinkPreference": [,"beer",,"whiskey",,"wine",],,"weight": 172,}
    test('collision_nested',
        '.object .string',
        'descendantUnion(unionOr(unionAnd(filterRoot(), filterName("object")),descendantUnion(filterRoot(),filterName("object"))),filterName("string"))',
        []);//"some string"
    test('collision_quoted-string',
        '."string"',
        'unionOr(unionAnd(filterRoot(), filterName("string")),descendantUnion(filterRoot(),filterName("string")))',
        []);//"some string"
    test('collision_string',
        '.string',
        'unionOr(unionAnd(filterRoot(), filterName("string")),descendantUnion(filterRoot(),filterName("string")))',
        []);//"some string" // TODO collisions






}());

