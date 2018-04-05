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

Add `ember-extra-linting` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ember-extra-linting"
    ]
}
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

* Fill in provided rules here





