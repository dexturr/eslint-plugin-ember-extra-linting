/**
 * @fileoverview Errors if using the getProperties function
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/ember-no-get-properties');
const { RuleTester } = require('eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-no-get-properties', rule, {

  valid: [
    {
      code: "get(this, 'arg1')"
    }
  ],

  invalid: [
    {
      code: "getProperties(this, 'arg1', 'arg2')",
      errors: [{
        message: 'Do not use getProperties, prefer using destructring',
        type: 'CallExpression'
      }]
    }
  ]
});
