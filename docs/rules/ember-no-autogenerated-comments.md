# No Ember Autogenerated Comments (ember-no-autogenerated-comments)

Ember auto generates comments in file in order instruct new users on how the framework works. These comments, while helpful initially, amount to a lot of code bloat for larger projects.

## Rule Details

This rule errors if these autogenerated comments are left in

Examples of **incorrect** code for this rule:

```js

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | service-name', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:service-name');
    assert.ok(service);
  });
});

```

Examples of **correct** code for this rule:

```js

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | service-name', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let service = this.owner.lookup('service:service-name');
    assert.ok(service);
  });
});

```

### Options

There are currently no options for this rule.

## When Not To Use It

If you don't care about the autogenerated comments or feel that these comments are useful.
