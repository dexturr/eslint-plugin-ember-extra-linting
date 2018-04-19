/**
 * @fileoverview Do not use get in ember 3.1+
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ember-no-pointless-gets');

var  RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-no-pointless-gets', rule, {

  valid: [
    {
      code: "get(this, 'thing.thingy');"
    }
  ],

  invalid: [
    {
      code: "get(this, 'thing');",
      output: 'this.thing;',
      errors: [{
        message: 'Use this.propertyName, this method is supported in ember 3.1+'
      }]
    },
    {
      code: "get(service, 'thing');",
      output: 'service.thing;',
      errors: [{
        message: 'Use this.propertyName, this method is supported in ember 3.1+'
      }]
    }
  ]
});
