# Ensure that all imported services are used (ember-require-service-used)

Injecting services and not using them is just code bloat and should be removed.


## Rule Details

This rule aims to ensure that all services injected are used.

Examples of **incorrect** code for this rule:

```js
import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({

  session: service(),

  foo() {
      this.bar = 'baz';
  }

});
```

Examples of **correct** code for this rule:

```js

import Service from '@ember/service';

export default Service.extend({

  foo() {
      this.bar = 'baz';
  }

});

```

### Options

There are currently no options for this rule.

## When Not To Use It

If you believe that having unused services is not an issue.
