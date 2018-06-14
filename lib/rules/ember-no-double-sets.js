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
    fixable: null,
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {
    // ----------------------------------------------------------------------
    // Variables
    // ----------------------------------------------------------------------
    let reportNode;
    let skipFunction = false;
    let sets = [];

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    const handleFunction = (node) => {
      skipFunction = node.generator || node.async;
    };

    const incrementCount = (name) => {
      const setObject = sets.find((set) => set.calledOn === name);
      if (!setObject) {
        sets.push({
          calledOn: name,
          count: 1,
          node: reportNode
        });
      } else {
        setObject.count++;
      }
    };

    const incrementCountForObject = (object) => {
      if (object.type === 'ThisExpression') {
        incrementCount('this');
      } else if (object.type === 'Identifier') {
        incrementCount(object.name);
      }
    };

    return {

      BlockStatement(node) {
        reportNode = node;
      },

      CallExpression(node) {
        if (!skipFunction) {
          if (node.callee.type === 'Identifier' && node.callee.name === 'set') {
            const objectSetCalledOn = node.arguments[0];
            incrementCountForObject(objectSetCalledOn);
          } else if (
            node.callee.type === 'MemberExpression'
            && node.callee.property.type === 'Identifier'
            && node.callee.property.name === 'set'
          ) {
            const objectSetCalledOn = node.callee.object;
            incrementCountForObject(objectSetCalledOn);
          }
        }
      },

      'Program:exit': function() {
        for (const set of sets) {
          if (set.count > 1) {
            context.report({
              node: set.node,
              message: 'Use setProperties if you need to set multiple properties on the same object'
            });
          }
        }
      },

      FunctionDeclaration: handleFunction,

      FunctionExpression: handleFunction,

      ArrowFunctionExpression: handleFunction

    };
  }
};
