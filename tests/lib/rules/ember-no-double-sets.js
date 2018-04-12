/**
 * @fileoverview Use setProperties over multiple sets
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ember-no-double-sets');

var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-no-double-sets', rule, {

  valid: [
    {
      code: `
            {
              set(this, 'a', b);
              set(this2, 'c', d);
            }
            `
    },
    {
      code: `
            {
              set(arg1, 'a', b);
              set(arg2, 'c', d);
            }
            `
    },
    {
      code: `
            {
              set1(this, 'a', b);
              set1(this, 'c', d);
            }
            `
    },
    {
      code: `
            {
              set(this, 'a', b);
            }
            `
    },
    {
      code: `
            {
              object.set(this, 'a', b);
              object.set(this, 'c', d);
            }
            `
    }
  ],

  invalid: [
    {
      code: `
            {
              set(arg1, 'a', b);
              set(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set mutiple properties on the same object'
      }]
    },
    {
      code: `
            {
              set(this, 'a', b);
              set(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set mutiple properties on the same object'
      }]
    },
    {
      code: `
            {
              {
                set(this, 'a', b);
                set(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set mutiple properties on the same object'
      }]
    },
    {
      code: `
            {
              set(this, 'a', b);
              set(this, 'c', d);
              set(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set mutiple properties on the same object'
      }]
    }
  ]
});
