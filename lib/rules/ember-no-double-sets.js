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

    const getExpressionArgument = (expression, argument = 0, thisFlag = Symbol()) => {
      if (expression.arguments[0].type === 'ThisExpression') {
        return thisFlag;
      }
      return expression.arguments[0].name || expression.arguments[0].raw;
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
        const thisFlag = '123456789lnjbhgfdzsjk[ougiyuftytjk[p[kougiyfut';
        const expressionStatements = node.body.filter(node => node.type === 'ExpressionStatement').map(node => node.expression);
        const callExpressions = expressionStatements.filter(node => node.type == 'CallExpression');
        const setExpressions = callExpressions.filter(node => node.callee.name === 'set');
        const argumentsNames = setExpressions.map(setExpression => getExpressionArgument(setExpression, 0, thisFlag));
        const groupedArguments = group(argumentsNames);
        const multipleSetsForSameArgument = Object
                                              .keys(groupedArguments)
                                              .map(key => groupedArguments[key])
                                              .filter(argument => argument.length > 1)
                                              .map(argument => argument[0]);
        if (multipleSetsForSameArgument.length > 0) {
          context.report({
            node: node,
            message: 'Use setProperties if you need to set mutiple properties'
            // fix(fixer) {
            //   return fixer.removeRange(comment.range);
            // }
          });
        }
      }
    };
  }
};
