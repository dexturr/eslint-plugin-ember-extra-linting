/**
 * @fileoverview Use setProperties over multiple sets
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ember-no-double-sets');

var RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  }
});

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ember-no-double-sets', rule, {

  valid: [
    {
      code: `
            function test() {
              set(this, 'a', b);
              set(this2, 'c', d);
            }
            `
    },
    {
      code: `
      function test() {
              set(arg1, 'a', b);
              set(arg2, 'c', d);
            }
            `
    },
    {
      code: `
      function test() {
              set1(this, 'a', b);
              set1(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              set(this, 'a', b);
            }
            `
    },
    {
      code: `
            var test = function () {
              set(this, 'a', b);
              set(this2, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              set(arg1, 'a', b);
              set(arg2, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              set1(this, 'a', b);
              set1(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              set(this, 'a', b);
            }
            `
    },
    {
      code: `
      var test = function () {
              set(this, 'a', b);
            }
            `
    },
    {
      code: `
            var test = () => {
              set(this, 'a', b);
              set(this2, 'c', d);
            }
            `
    },
    {
      code: `
      var test =  () => {
              set(arg1, 'a', b);
              set(arg2, 'c', d);
            }
            `
    },
    {
      code: `
      var test =  () => {
              set1(this, 'a', b);
              set1(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test =  () => {
              set(this, 'a', b);
            }
            `
    },
    {
      code: `
      function* test(){
              set(arg1, 'a', b);
              set(arg1, 'c', d);
            }
            `
    },
    {
      code: `
      function* test(){
              set(this, 'a', b);
              set(this, 'c', d);
            }
            `
    },
    {
      code: `
      function* test(){
        function* test1 ()  {
                set(this, 'a', b);
                set(this, 'c', d);
              }
            }
            `
    },
    {
      code: `
      function* test(){
              set(this, 'a', b);
              set(this, 'c', d);
              set(this, 'e', f);
            }
            `
    },
    {
      code: `
      async function test(){
              set(arg1, 'a', b);
              set(arg1, 'c', d);
            }
            `
    },
    {
      code: `
      async function test(){
              set(this, 'a', b);
              set(this, 'c', d);
            }
            `
    },
    {
      code: `
      async function test(){
        async function test2()  {
                set(this, 'a', b);
                set(this, 'c', d);
              }
            }
            `
    },
    {
      code: `
      async function test(){
              set(this, 'a', b);
              set(this, 'c', d);
              set(this, 'e', f);
            }
            `
    }

  ],

  invalid: [
    {
      code: `
      function test() {
              this.set(arg1, 'a', b);
              this.set(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      function test() {
              set(arg1, 'a', b);
              set(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      function test() {
              set(this, 'a', b);
              set(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      function test() {
        function test() {
                set(this, 'a', b);
                set(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      function test() {
              set(this, 'a', b);
              set(this, 'c', d);
              set(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
              set(arg1, 'a', b);
              set(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
              set(this, 'a', b);
              set(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
        var test1 = function ()  {
                set(this, 'a', b);
                set(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
              set(this, 'a', b);
              set(this, 'c', d);
              set(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
              set(arg1, 'a', b);
              set(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
              set(this, 'a', b);
              set(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
        var test1 = function ()  {
                set(this, 'a', b);
                set(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
              set(this, 'a', b);
              set(this, 'c', d);
              set(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
          if(true) {
            'hi';
          } else {
            set(this, 'a', b);
            set(this, 'c', d);
            set(this, 'e', f);
          }
            }
            `,
      errors: [{
        message: 'Use setProperties if you need to set multiple properties on the same object'
      }]
    }
  ]
});
