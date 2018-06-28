/**
 * @fileoverview Errors if a service arguement is passed that does not need to be passed
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/ember-no-pointless-service-arguments');

const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-no-pointless-service-arguments', rule, {

  valid: [
    {
      code:
        `import { inject as service } from '@ember/service';
        export default Route.extend({
                  serviceName: service(),
        });`
    },
    {
      code:
          `import { inject as service } from '@ember/service';
          export default Route.extend({
                    serviceName: 'testing',
          });`
    },
    {
      code:
            `import { inject as service } from '@ember/service';
            export default Route.extend({
                      serviceName: service('testing'),
            });`
    },
    {
      code:
            `import { inject as service } from '@ember/service';
            let testing;
            export default Route.extend({
                      serviceName: service(testing),
            });`
    }
  ],

  invalid: [
    {
      code:
      `import { inject as service } from '@ember/service';
      export default Route.extend({
                serviceName: service('service-name'),
      });`,
      errors: [{
        message: 'Service key is not needed',
        type: 'Property'
      }]
    },
    {
      code:
        `import { inject } from '@ember/service';
        export default Route.extend({
                  serviceName: inject('service-name'),
        });`,
      errors: [{
        message: 'Service key is not needed',
        type: 'Property'
      }]
    }
  ]
});
