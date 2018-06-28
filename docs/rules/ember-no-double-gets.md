# No Double Gets (ember-no-double-gets)

Errors if there is more than one get for an object in a single block.

This rule does not apply to asynchronous or generator functions, as multiple `gets` could be a valid pattern within these. For example using conditional access after multiple synchronous API calls.

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

There are currently no options for this rule.

## When Not To Use It

If you do not believe that multiple `get`s looks messy or do not like the `getProperties` function.

## Further Reading

Ember `getProperties` [documentation](https://emberjs.com/api/ember/release/functions/@ember%2Fobject/getProperties).
