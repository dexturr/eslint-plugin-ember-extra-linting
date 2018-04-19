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

    const getExpressionArgument = (expression, argument = 0, thisFlag) => {
      if (expression.arguments[0].type === 'ThisExpression') {
        return thisFlag;
      }
      return expression.arguments[0].name || expression.arguments[0].rawValue;
    };

    const group = function(array) {
      return array.reduce(function(groups, item) {
        const val = item;
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
      }, {});
    };

    const calculateSetsForArguments = (node) => {
      const expressionStatements = node.body.body.filter(node => node.type === 'ExpressionStatement')
      .map(node => node.expression);
      const callExpressions = expressionStatements.filter(node => node.type == 'CallExpression');
      const setExpressions = callExpressions.filter(node => node.callee.name === 'set');
      const argumentsNames = setExpressions.map(setExpression => getExpressionArgument(setExpression, 0, 'this'));
      const groupedArguments = group(argumentsNames);
      return Object.keys(groupedArguments)
          .map(key => groupedArguments[key])
          .filter(argument => argument.length > 1)
          .map(argument => argument[0]);
    };

        // any helper functions should go here or else delete this section

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

    return {
      FunctionDeclaration(node) {
        if (node.generator || node.async) {
          return;
        }
        const multipleSetsForArgument = calculateSetsForArguments(node);
        if (multipleSetsForArgument.length > 0) {
          context.report({
            node: node,
            message: 'Use setProperties if you need to set mutiple properties on the same object'
            // fix(fixer) {
            //   return fixer.removeRange(comment.range);
            // }
          });
        }
      },
      FunctionExpression(node) {
        if (node.generator || node.async) {
          return;
        }
        const multipleSetsForArgument = calculateSetsForArguments(node);
        if (multipleSetsForArgument.length > 0) {
          context.report({
            node: node,
            message: 'Use setProperties if you need to set mutiple properties on the same object'
            // fix(fixer) {
            //   return fixer.removeRange(comment.range);
            // }
          });
        }
      },
      ArrowFunctionExpression(node) {
        if (node.generator || node.async) {
          return;
        }
        const multipleSetsForArgument = calculateSetsForArguments(node);
        if (multipleSetsForArgument.length > 0) {
          context.report({
            node: node,
            message: 'Use setProperties if you need to set mutiple properties on the same object'
            // fix(fixer) {
            //   return fixer.removeRange(comment.range);
            // }
          });
        }
      }
    };
  }
};
