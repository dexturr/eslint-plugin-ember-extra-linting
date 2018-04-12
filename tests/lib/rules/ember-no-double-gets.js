/**
 * @fileoverview Prevents using mutliple gets
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ember-no-double-gets');

var  RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-no-double-gets', rule, {

  valid: [
    {
      code: `
                {
                  get(this, 'a');
                  get(this2, 'c');
                }
                `
    },
    {
      code: `
                {
                  get(arg1, 'a');
                  get(arg2, 'c');
                }
                `
    },
    {
      code: `
                {
                  get1(this, 'a', b);
                  get1(this, 'c', d);
                }
                `
    },
    {
      code: `
                {
                  get(this, 'a');
                }
                `
    },
    {
      code: `
                {
                  object.get(this, 'a');
                  object.get(this, 'c');
                }
                `
    }
  ],

  invalid: [
    {
      code: `
                {
                  get(arg1, 'a');
                  get(arg1, 'c');
                }
                `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
                {
                  get(this, 'a');
                  get(this, 'c');
                }
                `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
                {
                  {
                    get(this, 'a');
                    get(this, 'c');
                  }
                }
                `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
                {
                  get(this, 'a');
                  get(this, 'c');
                  get(this, 'e');
                }
                `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    }

  ]
});
