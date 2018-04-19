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
    fixable: 'whitespace',  // or "code" or "whitespace"
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

            // give me methods
      CallExpression(node) {
        if (node.callee.name === 'get') {
          if (node.arguments.length === 2) {// Don't really know what to do in the else. Maybe fail silently an another rule should take care of it?
            const stringArguments = node.arguments.filter(arg => arg.type === 'Literal');
            if (stringArguments.length === 1) {// Don't really know what to do in the else. Maybe fail silently an another rule should take care of it? {
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
            }
          }
        }
      }

    };
  }
};
