# eslint-plugin-ember-extra-linting

Addtional ember linting rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ember-extra-linting`:

```
$ npm install eslint-plugin-ember-extra-linting --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ember-extra-linting` globally.

## Usage

### Basic Usage

Add `ember-extra-linting` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ember-extra-linting"
    ]
}
```

You can the specifcy the rules you wish to implement. If you want to use the recommended rule set see below.

### Configuration

Add the plugin's
[`recommended`](./config/recommended.js) configuration to the list of extensions:

```js
// .eslintrc.js

module.exports = {
  // ...
  extends: [
    'eslint:recommended',
    'plugin:ember-extra-linting/recommended'
  ],
  rules: {
  }
};
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ember-extra-linting/rule-name": 2
    }
}
```

## Supported Rules

`no-ember-autogenerated-comments`: Errors if any of the testing autogenerated comments are left in files. These should either be removed or replaced with specific comments. **Note:** this rule is only configured for ember 3.0+ currently. 

`ember-no-double-gets`: Errors if trying to get from the same object twice in a single block. This informs the user that they should be using the `getProperties` method.

`ember-no-double-sets`: Errors if trying to get from the same object twice in a single block. This informs the user that they should be using the `getProperties` method.



