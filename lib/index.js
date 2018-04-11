/**
 * @fileoverview Addtional ember linting rules
 * @author Dexter Edwards
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var requireIndex = require('requireindex');
var resolve = require('path').resolve;

// ------------------------------------------------------------------------------
// Plugin Definition
// ------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');
module.exports.configs = requireIndex(resolve(__dirname, '../config'));

