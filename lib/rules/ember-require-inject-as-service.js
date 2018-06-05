/**
 * @fileoverview Rename inject as service for eslint
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Rename inject as service for eslint',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {

    return {

      ImportSpecifier(node) {
        if (node.imported.name === 'inject' && node.local.name !== 'service') {
          context.report({
            node,
            message: 'Prefer using renaming inject to service'
          });
        }
      }
    };
  }
};
