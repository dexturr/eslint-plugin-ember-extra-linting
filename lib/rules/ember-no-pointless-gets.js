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
    fixable: null,
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    const findLiteralErrors = function(node) {
      const stringArguments = node.arguments.filter(arg => arg.type === 'Literal');
      if (!stringArguments.length) {
        return;
      }
      // We are using a string literal
      // Verify the argument uses at least one dot
      const stringValue = stringArguments[0];
      let parts = stringValue.raw.split('.');
      if (parts.length === 1) {
        context.report({
          node,
          message: 'Use this.propertyName, this method is supported in ember 3.1+'
        });
      }
    };

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'get') {
          if (node.arguments.length === 2) {
            findLiteralErrors(node);
          }
        } else if (
          node.callee.type === 'MemberExpression'
          && node.callee.property.type === 'Identifier'
          && node.callee.property.name === 'get'
        ) {
          if (node.arguments.length === 1) {
            findLiteralErrors(node);
          }
        }
      }
    };
  }
};
