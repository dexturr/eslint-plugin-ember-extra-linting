/**
 * @fileoverview Rename inject as service for eslint
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ember-require-inject-as-service');

var { RuleTester } = require('eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-require-inject-as-service', rule, {

  valid: [
    {
      code: "import { inject as service } from '@ember/inject'"
    }
  ],

  invalid: [
    {
      code: "import { inject } from '@ember/inject'",
      errors: [{
        message: 'Prefer using renaming inject to service',
        type: 'ImportSpecifier'
      }]
    }
  ]
});
