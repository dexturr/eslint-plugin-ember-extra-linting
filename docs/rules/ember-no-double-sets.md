# No Double Sets (ember-no-double-sets)

Errors if there is more than one set for an object in a single block.

**Note:** This rule assumes [use-ember-get-set](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-get-and-set.md) is also enabled otherwise it will not work. 

TODO: make this work for `this.set` as well.

This rule does not apply to asynchronous or generator functions, as multiple `sets` could be a valid pattern within these. For example setting an `onAir` value before sending the API call and setting a response value after it has returned.

## Rule Details

This rule aims to prevent excessive `sets` that can be grouped into a single `setProperties` call. 

Examples of **incorrect** code for this rule:

```js

set(this, 'a', 'b');
set(this, 'c', 'd');

```

Examples of **correct** code for this rule:

```js

setProperties(this, {
    a: 'b',
    c: 'd',
})

```

### Options

Currently there are not options for this rule.

## When Not To Use It

If you do not use [use-ember-get-set](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-get-and-set.md).

## Further Reading

Ember `setProperties` [documentation](https://emberjs.com/api/ember/release/functions/@ember%2Fobject/setProperties).
