# Errors if using the getProperties function (ember-no-get-properties)

After Ember 3.1+ `this.propertyName` is now supported and `get` does not have to be used. In general this is a nicer syntax and more intuitive and should be favored over the previous syntax. As such it is now possible to use destructuring to get multiple properties which is again a more intuitive and nicer syntax. 

## Rule Details

This rule aims to ensure that destructuring is used over the `getProperties` function.

Examples of **incorrect** code for this rule:

```js

const { a, b, c } = getProperties(this, 'a', 'b', 'c');

```

Examples of **correct** code for this rule:

```js

const { a, b, c } = this;

```

### Options

There are currently no options for this rule

## When Not To Use It

The `get` function remains because it is useful for conditional access. If your project has a large amount of conditional access then grouping multiple `get`s into a single `getProperties` function is preferable.
