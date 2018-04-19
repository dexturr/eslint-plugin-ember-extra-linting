/**
 * @fileoverview Prevents using mutliple gets
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ember-no-double-gets');

var  RuleTester = require('eslint').RuleTester;
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
ruleTester.run('ember-no-double-gets', rule, {

  valid: [
    {
      code: `
            function test() {
              get(this, 'a', b);
              get(this2, 'c', d);
            }
            `
    },
    {
      code: `
      function test() {
              get(arg1, 'a', b);
              get(arg2, 'c', d);
            }
            `
    },
    {
      code: `
      function test() {
              get1(this, 'a', b);
              get1(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              get(this, 'a', b);
            }
            `
    },
    {
      code: `
      var test = function () {
              object.get(this, 'a', b);
              object.get(this, 'c', d);
            }
            `
    },
    {
      code: `
            var test = function () {
              get(this, 'a', b);
              get(this2, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              get(arg1, 'a', b);
              get(arg2, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              get1(this, 'a', b);
              get1(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              get(this, 'a', b);
            }
            `
    },
    {
      code: `
      var test = function () {
              object.get(this, 'a', b);
              object.get(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test = function () {
              get(this, 'a', b);
            }
            `
    },
    {
      code: `
      var test = function () {
              object.get(this, 'a', b);
              object.get(this, 'c', d);
            }
            `
    },
    {
      code: `
            var test = () => {
              get(this, 'a', b);
              get(this2, 'c', d);
            }
            `
    },
    {
      code: `
      var test =  () => {
              get(arg1, 'a', b);
              get(arg2, 'c', d);
            }
            `
    },
    {
      code: `
      var test =  () => {
              get1(this, 'a', b);
              get1(this, 'c', d);
            }
            `
    },
    {
      code: `
      var test =  () => {
              get(this, 'a', b);
            }
            `
    },
    {
      code: `
      var test =  () => {
              object.get(this, 'a', b);
              object.get(this, 'c', d);
            }
            `
    },
    {
      code: `
      function* test(){
              get(arg1, 'a', b);
              get(arg1, 'c', d);
            }
            `
    },
    {
      code: `
      function* test(){
              get(this, 'a', b);
              get(this, 'c', d);
            }
            `
    },
    {
      code: `
      function* test(){
        function* test1 ()  {
                get(this, 'a', b);
                get(this, 'c', d);
              }
            }
            `
    },
    {
      code: `
      function* test(){
              get(this, 'a', b);
              get(this, 'c', d);
              get(this, 'e', f);
            }
            `
    },
    {
      code: `
      async function test(){
              get(arg1, 'a', b);
              get(arg1, 'c', d);
            }
            `
    },
    {
      code: `
      async function test(){
              get(this, 'a', b);
              get(this, 'c', d);
            }
            `
    },
    {
      code: `
      async function test(){
        async function test2()  {
                get(this, 'a', b);
                get(this, 'c', d);
              }
            }
            `
    },
    {
      code: `
      async function test(){
              get(this, 'a', b);
              get(this, 'c', d);
              get(this, 'e', f);
            }
            `
    }

  ],

  invalid: [
    {
      code: `
      function test() {
              get(arg1, 'a', b);
              get(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      function test() {
              get(this, 'a', b);
              get(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      function test() {
        function test() {
                get(this, 'a', b);
                get(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      function test() {
              get(this, 'a', b);
              get(this, 'c', d);
              get(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
              get(arg1, 'a', b);
              get(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
              get(this, 'a', b);
              get(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
        var test1 = function ()  {
                get(this, 'a', b);
                get(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = function ()  {
              get(this, 'a', b);
              get(this, 'c', d);
              get(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
              get(arg1, 'a', b);
              get(arg1, 'c', d);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
              get(this, 'a', b);
              get(this, 'c', d);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
        var test1 = function ()  {
                get(this, 'a', b);
                get(this, 'c', d);
              }
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    },
    {
      code: `
      var test = () =>  {
              get(this, 'a', b);
              get(this, 'c', d);
              get(this, 'e', f);
            }
            `,
      errors: [{
        message: 'Use getProperties if you need to get mutiple properties from the same object'
      }]
    }
  ]
});
