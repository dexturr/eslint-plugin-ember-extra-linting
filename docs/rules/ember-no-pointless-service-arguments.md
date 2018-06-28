# Errors if a service argument is passed that does not need to be passed (ember-no-pointless-service-arguments)

It is optional to pass in the service name to the `inject` function as this can be determined from the key, if the names are the same. 
 
## Rule Details

This rule errors if a key is provided to the `inject` function that is not required.

Examples of **incorrect** code for this rule:

```js

import { inject as service } from '@ember/service';
 export default Route.extend({
           serviceName: service('service-name'),
 });

```

Examples of **correct** code for this rule:

```js

import { inject as service } from '@ember/service';
 export default Route.extend({
           serviceName: service(),
 });

```

### Options

There are currently no options for this rule.

## When Not To Use It

If you prefer specifying the service for readability.
 