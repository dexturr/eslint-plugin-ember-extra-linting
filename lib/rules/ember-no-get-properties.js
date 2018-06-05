/**
 * @fileoverview Errors if using the getProperties function
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Errors if using the getProperties function',
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === 'getProperties') {
          context.report({
            node,
            message: 'Do not use getProperties, prefer using destructring'
          });
        }
      }
    };
  }
};
