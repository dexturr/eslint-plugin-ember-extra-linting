# Rename inject as service for eslint (ember-require-inject-as-service)

Enforces `import { inject as service } from '@ember/service'`.
 
## Rule Details

This rule aims to ensure that inject is always renamed to service for consistency.

Examples of **incorrect** code for this rule:

```js

import { inject } from '@ember/service'

```

Examples of **correct** code for this rule:

```js

import { inject as service } from '@ember/service'

```

### Options

There are currently no options for this rule.

## When Not To Use It

If you prefer `inject` to be named something else or you believe `inject` is more descriptive. 
