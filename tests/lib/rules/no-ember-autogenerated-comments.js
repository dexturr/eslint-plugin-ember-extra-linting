/**
 * @fileoverview Errors if autogenerated ember comments are left in files
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-ember-autogenerated-comments');

var  RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-ember-autogenerated-comments', rule, {

  valid: [
    {
      code: '// Replace this with your real tests.    '
    },
    {
      code: '//Replace this with your real tests.'
    },
    {
      code: '//      Replace this with your real tests.'
    },
    {
      code: '// Set any properties with this.set(\'myProperty\', \'value\');    '
    },
    {
      code: '//Set any properties with this.set(\'myProperty\', \'value\');'
    },
    {
      code: '//      Set any properties with this.set(\'myProperty\', \'value\');'
    },
    {
      code: '// Handle any actions with this.set(\'myAction\', function(val) { ... });    '
    },
    {
      code: '//Handle any actions with this.set(\'myAction\', function(val) { ... });'
    },
    {
      code: '//      Handle any actions with this.set(\'myAction\', function(val) { ... });'
    },
    {
      code: '// Template block usage:    '
    },
    {
      code: '//Template block usage:'
    },
    {
      code: '//      Template block usage:'
    }

  ],
  invalid: [
    {
      code: '// Replace this with your real tests.',
      output: '',
      errors: [{
        message: 'Delete this autogenerated comment'
      }]
    },
    {
      code: '// Set any properties with this.set(\'myProperty\', \'value\');',
      output: '',
      errors: [{
        message: 'Delete this autogenerated comment'
      }]
    },
    {
      code: '// Handle any actions with this.set(\'myAction\', function(val) { ... });',
      output: '',
      errors: [{
        message: 'Delete this autogenerated comment'
      }]
    },
    {
      code: '// Template block usage:',
      output: '',
      errors: [{
        message: 'Delete this autogenerated comment'
      }]
    }
  ]
});

