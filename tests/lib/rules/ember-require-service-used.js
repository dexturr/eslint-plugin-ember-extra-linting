/**
 * @fileoverview Ensure that all imported services are used
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/ember-require-service-used');
const { RuleTester }  = require('eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-require-service-used', rule, {

  valid: [
    {
      code: `
        import { inject as service } from '@ember/service';
        export default Route.extend({
                  test: service(),

                  doSomething() {
                    this.test.function();
                  },
        });
          `
    },
    {
      code: `
          import { inject as service } from '@ember/service';
          export default Route.extend({
                    test: service(),
  
                    doSomething() {
                      const { a, b } = this.test;
                    },
          });
            `
    },
    {
      code: `
          import { inject as service } from '@ember/service';
          export default Route.extend({
                    test: service(),
  
                    doSomething() {
                      const { test } = this;
                    },
          });
            `
    },
    {
      code: `
          import { inject as service } from '@ember/service';
          export default Route.extend({
                    test: service(),
  
                    doSomething() {
                      set(this, 'test', something);
                    },
          });
            `
    },
    {
      code: `
          import { inject as service } from '@ember/service';
          export default Route.extend({
                    test: service(),
  
                    doSomething() {
                      setProperties(this, { test: 1234 });
                    },
          });
            `
    }
  ],

  invalid: [
    {
      code: `
      import { inject as service } from '@ember/service';
      export default Route.extend({
                test: service(),
      });
        `,
      errors: [{
        message: 'Service is injected but not used',
        type: 'Property'
      }]
    },
    {
      code: `
        import { inject } from '@ember/service';
        export default Route.extend({
                  test: inject(),
        });
          `,
      errors: [{
        message: 'Service is injected but not used',
        type: 'Property'
      }]
    },
    {
      code: `
          import { inject as service } from '@ember/service';
          export default Route.extend({
                    test: service(),
  
                    doSomething() {
                      const { test } = thingt;
                    },
          });
            `,
      errors: [{
        message: 'Service is injected but not used',
        type: 'Property'
      }]
    }
  ]
});
