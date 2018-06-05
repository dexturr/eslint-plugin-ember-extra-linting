# Do not use get in ember 3.1+ (ember-no-pointless-gets)

In [this RFC](https://github.com/emberjs/rfcs/blob/master/text/0281-es5-getters.md) the ember team allowed us to use normal property accessors and left the `get` function in order to avoid code such as `a && a.b && a.b.c && a.b.c.d`. This rule errors when the `get` function is not used for conditional access.

## Rule Details

This rule aims to remove unneeded usage of Embers `get` function:

Examples of **incorrect** code for this rule:

```js

let foo = get(this, 'test');

```

Examples of **correct** code for this rule:

```js
let foo = this.test;
get(model, 'markets.length');

```

## When Not To Use It

If you are on an ember version less than 3.1.

## Further Reading

In Ember 3.1 ES5 property getters were implemented due to dropping support for IE10.
