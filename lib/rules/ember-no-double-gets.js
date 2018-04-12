/**
 * @fileoverview Prevents using mutliple gets
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Use getProperties over multiple gets',
      category: 'Stylistic Issues',
      recommended: false
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

        // any helper functions should go here or else delete this section

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

    return {
      BlockStatement(node) {
        const expressionStatements = node.body.filter(node => node.type === 'ExpressionStatement')
                                              .map(node => node.expression);
        const callExpressions = expressionStatements.filter(node => node.type == 'CallExpression');
        const getExpressions = callExpressions.filter(node => node.callee.name === 'get');
        const argumentsNames = getExpressions.map(getExpression => getExpressionArgument(getExpression, 0, 'this'));
        const groupedArguments = group(argumentsNames);
        const multipleGetsForArgument = Object.keys(groupedArguments)
                                                  .map(key => groupedArguments[key])
                                                  .filter(argument => argument.length > 1)
                                                  .map(argument => argument[0]);
        if (multipleGetsForArgument.length > 0) {
          context.report({
            node: node,
            message: 'Use getProperties if you need to get mutiple properties from the same object'
            // fix(fixer) {
            //   return fixer.removeRange(comment.range);
            // }
          });
        }
      }
    };
  }
};
