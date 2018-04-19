/**
 * @fileoverview Do not use get in ember 3.1+
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Do not use get pointlessly in ember 3.1+',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'code',
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {

        // variables should be defined here

        // ----------------------------------------------------------------------
        // Helpers
        // ----------------------------------------------------------------------

    const findLiteralErrors = function(node) {
      const stringArguments = node.arguments.filter(arg => arg.type === 'Literal');
      // We are using a string literal
      if (stringArguments.length === 1) {
              // Verify the argument uses at least one dot
        const stringValue = stringArguments[0];
        const argument = node.arguments.filter(arg => arg.type !== 'Literal')[0];
        let parts = stringValue.raw.split('.');
        if (parts.length === 1) {
          const fixObject = argument.type === 'ThisExpression' ? 'this' : argument.name;
          const fixProperty = parts[0].replace(/'/g, '').replace(/"/g, '');
          context.report({
            node,
            message: 'Use this.propertyName, this method is supported in ember 3.1+',
            fix(fixer) {
              return fixer.replaceText(node, `${fixObject}.${fixProperty}`);
            }
          });
        }
      } else {
        const arg1 = node.arguments[0];
        const arg2 = node.arguments[1];
        const fixArg1 = arg1.type === 'ThisExpression' ? 'this' : arg1.name;
        const fixArg2 = arg2.name;
        context.report({
          node,
          message: 'Use this.propertyName, this method is supported in ember 3.1+',
          fix(fixer) {
            return fixer.replaceText(node, `${fixArg1}[${fixArg2}]`);
          }
        });
      }
    };

        // any helper functions should go here or else delete this section

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

    return {

            // give me methods
      CallExpression(node) {
        if (node.callee.name === 'get') {
          if (node.arguments.length === 2) { // Do nothing we are in a weird scenario and should write another rule to address this
            findLiteralErrors(node);
          }
        }
      }
      
    };
  }
};
