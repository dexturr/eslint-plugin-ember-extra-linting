/**
 * @fileoverview Ensure that all imported services are used
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Ensure that all imported services are used',
      category: 'Fill me in',
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
            // fill in your schema
    ]
  },

  create: function(context) {
    let services = [];
    let injectFunctionName;
    let isInjectImport = false;
        // ----------------------------------------------------------------------
        // Helpers
        // ----------------------------------------------------------------------

        // ----------------------------------------------------------------------
        // Public
        // ----------------------------------------------------------------------

    return {

      ImportDeclaration(node) {
        isInjectImport = node.source.value === '@ember/service';
      },

      ImportSpecifier(node) {
        if (isInjectImport && node.imported.name === 'inject') {
          injectFunctionName = node.local.name;
        }
      },

      Property(node) {
        if (injectFunctionName) {
          if (node.value.type === 'CallExpression') {
            if (node.value.callee.name === injectFunctionName) {
              services.push({
                name: node.key.name,
                numberOfTimesCalled: 0,
                node
              });
            }
          }
        }
      },

      MemberExpression(node) {
        if (!injectFunctionName || !services.length) {
          return;
        }
        if (node.object.type !== 'ThisExpression') {
          return;
        }
        const serviceName = node.property.name;
        const service = services.find((service) => service.name === serviceName);
        if (service) {
          service.numberOfTimesCalled++;
        }
      },

      VariableDeclarator(node) {
        if (!node.id || node.id.type !== 'ObjectPattern' || !node.init || node.init.type !== 'ThisExpression') {
          return;
        }
        const objectPattern = node.id;
        const serviceNames = services.map((service) => service.name);
        const servicesCalledNodes = objectPattern.properties.filter((property) => serviceNames.includes(property.key.name));
        for (const serviceNode of servicesCalledNodes) {
          const service = services.find((service) => service.name === serviceNode.key.name);
          service.numberOfTimesCalled++;
        }
      },

      CallExpression(node) {
        if (node.callee.name === 'set' || node.callee.name === 'get' || node.callee.name === 'getProperties') {
          const serviceNames = services.map((service) => service.name);
          if (node.arguments[0].type === 'ThisExpression') {
            const stringArguments = node.arguments.filter((argument) => argument.type === 'Literal' && typeof argument.value === 'string');
            for (const stringArgument of stringArguments) {
              if (stringArgument.value) {
                const [argumentName] = stringArgument.value.split('.');
                if (serviceNames.includes(argumentName)) {
                  const service = services.find((service) => service.name === argumentName);
                  service.numberOfTimesCalled++;
                }
              }
            }
          }
        } else if (node.callee.name === 'setProperties') {
          const serviceNames = services.map((service) => service.name);
          if (node.arguments[0].type === 'ThisExpression') {
            const setObject = node.arguments[1];
            const propertiesSet = setObject.properties.map((property) => property.key.name);
            for (const property of propertiesSet) {
              if (serviceNames.includes(property)) {
                const service = services.find((service) => service.name === property);
                service.numberOfTimesCalled++;
              }
            }
          }
        }
      },

      'Program:exit': function() {
        for (const service of services) {
          if (service.numberOfTimesCalled === 0) {
            context.report({
              node: service.node,
              message: 'Service is injected but not used'
            });
          }
        }
      }
    };
  }
};
