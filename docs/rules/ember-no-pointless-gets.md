# Do not use get in ember 3.1+ (ember-no-pointless-gets)

In [RFC](TODO) the ember team allowed us to use normal property accessors and left the `get` function in order to avoid code such as `a && a.b && a.b.c && a.b.c.d`. This rule errors when the `get` function is not used in this way and enforces better standards.

**Note:** This rule assumes [use-ember-get-set](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-get-and-set.md) is also enabled otherwise it will not work. 

## Rule Details

This rule aims to remove unneeded usage of Embers `get` function:

Examples of **incorrect** code for this rule:

```js

get(this, 'test');

```

Examples of **correct** code for this rule:

```js

get(model, 'markets.length');

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

If you are on an ember version less than 3.1 or you do not [use-ember-get-set](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-get-and-set.md).

## Further Reading

In Ember 3.1 ES5 property getters were implemented due to dropping support for IE10. This can be seen in the [Ember Blog](TODO);
[ES5 getters and setters](TODO)
[RFC](TODO)
