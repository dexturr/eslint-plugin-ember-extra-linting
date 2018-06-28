/**
 * @fileoverview Errors if a service arguement is passed that does not need to be passed
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Errors if a service arguement is passed that does not need to be passed',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {

        // variables should be defined here
    let isInjectImport = false;
    let injectFunctionName = '';

        // ----------------------------------------------------------------------
        // Helpers
        // ----------------------------------------------------------------------
    function snakeToCamel(s) {
      return s.replace(/(\-\w)/g, function(m) {
        return m[1].toUpperCase();
      });
    }
        // any helper functions should go here or else delete this section

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

    return {

      ImportDeclaration(node) {
        isInjectImport = node.source.value === '@ember/service';
      },

      ImportSpecifier(node) {
        if (isInjectImport && node.imported.name === 'inject') {
          injectFunctionName = node.local.name;
        }
      },

      Property(node) {
        if (node.value.type === 'CallExpression'
        && node.value.callee.name === injectFunctionName
        && node.value.arguments.length
        && node.value.arguments[0].type === 'Literal') {
          const { name } = node.key;
          const [{ value: dasherizedServiceKey }] = node.value.arguments;
          const camelizedServiceKey = snakeToCamel(dasherizedServiceKey);
          if (camelizedServiceKey === name) {
            context.report({
              node,
              message: 'Service key is not needed'
            });
          }
        }
      }
    };
  }
};
