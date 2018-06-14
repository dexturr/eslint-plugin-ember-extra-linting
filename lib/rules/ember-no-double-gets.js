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
    fixable: null,
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {
    let reportNode;
    let skipFunction = false;
    let gets = [];

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    const handleFunction = (node) => {
      skipFunction = node.generator || node.async;
    };

    const incrementCount = (name) => {
      const getObject = gets.find((get) => get.calledOn === name);
      if (!getObject) {
        gets.push({
          calledOn: name,
          count: 1,
          node: reportNode
        });
      } else {
        getObject.count++;
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
          if (node.callee.type === 'Identifier' && node.callee.name === 'get') {
            const objectGetCalledOn = node.arguments[0];
            incrementCountForObject(objectGetCalledOn);
          } else if (
            node.callee.type === 'MemberExpression'
            && node.callee.property.type === 'Identifier'
            && node.callee.property.name === 'get'
          ) {
            const objectGetCalledOn = node.callee.object;
            incrementCountForObject(objectGetCalledOn);
          }
        }
      },

      'Program:exit': function() {
        for (const get of gets) {
          if (get.count > 1) {
            context.report({
              node: get.node,
              message: 'Use getProperties if you need to get multiple properties from the same object'
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
