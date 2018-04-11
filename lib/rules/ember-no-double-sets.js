/**
 * @fileoverview Use setProperties over multiple sets
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Use setProperties over multiple sets',
      category: 'Stylistic Issues',
      recommended: true
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {

        // variables should be defined here

        // ----------------------------------------------------------------------
        // Helpers
        // ----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

    return {
      BlockStatement(node) {
        const expressionStatements = node.body.filter(node => node.type === 'ExpressionStatement');
        const callExpressions = expressionStatements.filter(node => node.expression.type == 'CallExpression');
        const setExpressions = callExpressions.filter(node => node.expression.callee.name === 'set');
        if (setExpressions.length > 1) {
          context.report({
            node: node,
            message: 'Use setProperties if you need to set mutiple properties',
            // fix(fixer) {
            //   return fixer.removeRange(comment.range);
            // }
          });
        }
      }
    };
  }
};
