/**
 * @fileoverview Prevents using mutliple gets
 * @author Dexter Edwards
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/ember-no-double-gets"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("ember-no-double-gets", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "get(a, 'b'); get(a, 'c');",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
