# No Double Gets (ember-no-double-gets)

Errors if there is more than one set for an object in a single block.

**Note:** This rule assumes [use-ember-get-set](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-get-and-set.md) is also enabled otherwise it will not work. TODO: make this work for `this.get` as well.

## Rule Details

This rule aims to prevent excessive `gets` that can be grouped into a single `getProperties` call. 

Examples of **incorrect** code for this rule:

```js

var a = get(this, 'a');
var b = get(this, 'b');

```

Examples of **correct** code for this rule:

```js

let { a, b } = getProperties(this, 'a', 'b');

```

### Options

Currently there are not options for this rule.

## When Not To Use It

If you do not use [use-ember-get-set](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-get-and-set.md).

## Further Reading

Ember `getProperties` [documentation](https://emberjs.com/api/ember/release/functions/@ember%2Fobject/getProperties).
