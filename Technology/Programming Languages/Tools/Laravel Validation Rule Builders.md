---
area: technology
domain: laravel
type: guide
title: Laravel Validation Rule Builders
description: "Laravel 13.36 (framework PR 61833, released 2026-10-13) adds a Rule:: builder for every validation rule that was still string-only (Rule::requiredWithout, Rule::url()->protocols, Rule::uuid()->version, Rule::distinct()->ignoreCase, and others), plus Rule::date()->equals. Builders give IDE autocompletion and pass parameters as arrays, so values containing commas, quotes or pipes no longer break; string rules still work and can be mixed in."
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - laravel
  - php
  - validation
resource: https://laravel-news.com/laravel-validation-rule-builders
---

# Laravel Validation Rule Builders

Source: [Fluent Rule Builders for All Laravel Validation Rules](https://laravel-news.com/laravel-validation-rule-builders) (Paul Redmond, Laravel News, 2026-10-16). Cross-checked on 2026-10-19 against:

- the framework PR [laravel/framework#61833](https://github.com/laravel/framework/pull/61833), "[13.x] Add validation rule builders for remaining validation rules" by ericmp33, merged 2026-10-08, 41 files changed
- the [v13.36.0 release](https://github.com/laravel/framework/releases/tag/v13.36.0) (2026-10-13), whose notes list that PR
- `src/Illuminate/Validation/Rule.php` at tag `v13.36.0`
- the 13.x docs: [Validation → Rule Builders](https://laravel.com/docs/13.x/validation#rule-builders)

## The problem

Most rules are strings with parameters after a colon, separated by commas: `required_without:email`, `url:https`, `distinct:ignore_case`. This has two weaknesses:

- Editors can't autocomplete them, and a typo only fails when the validator runs.
- Parameters are split on commas, so a value that itself contains a comma (or quotes or pipes) is parsed wrongly.

Before 13.36, `Illuminate\Validation\Rule` already had builders for some rules: `in`, `notIn`, `unique`, `exists`, `enum`, `date`, `email`, `file`, `dimensions`, `string`, `numeric`, `anyOf`, `contains` and others. I did not check which version introduced each of these. 13.36 adds builders for all the remaining ones.

## Before and after (from the article)

```php
$request->validate([
    'email' => 'required_without:phone|email',
    'website' => 'nullable|url:https',
    'device_id' => 'uuid:4',
    'tags.*' => 'distinct:ignore_case',
    'timezone' => 'timezone:per_country,US',
]);
```

```php
use Illuminate\Validation\Rule;

$request->validate([
    'email' => [Rule::requiredWithout('phone'), 'email'],   // mixing builders and strings is fine
    'website' => [Rule::nullable(), Rule::url()->protocols(['https'])],
    'device_id' => [Rule::uuid()->version(4)],
    'tags.*' => [Rule::distinct()->ignoreCase()],
    'timezone' => [Rule::timezone(['per_country', 'US'])],
]);
```

## The three kinds of new builders

**1. No parameters.** These return the plain rule string, so `Rule::required()` is just `'required'`:

`accepted`, `activeUrl`, `bail`, `base64`, `boolean`, `declined`, `exclude`, `filled`, `hexColor`, `json`, `list`, `macAddress`, `missing`, `nullable`, `present`, `prohibited`, `required`, `sometimes`, `ulid`.

`Rule::boolean(true)` returns `boolean:strict`, which accepts only `true` and `false` (confirmed in source).

**2. Take field names or values,** either as separate arguments or as one array:

`acceptedIf`, `declinedIf`, `excludeWith`, `excludeWithout`, `inArray`, `inArrayKeys`, `missingIf`, `missingUnless`, `missingWith`, `missingWithAll`, `notRegex`, `presentIf`, `presentUnless`, `presentWith`, `presentWithAll`, `prohibitedIfAccepted`, `prohibitedIfDeclined`, `prohibits`, `regex`, `requiredArrayKeys`, `requiredIfAccepted`, `requiredIfDeclined`, `requiredWith`, `requiredWithAll`, `requiredWithout`, `requiredWithoutAll`, `timezone`.

```php
Rule::requiredWith('first_name', 'last_name');   // same as Rule::requiredWith(['first_name', 'last_name'])
Rule::acceptedIf('plan', 'pro');
Rule::requiredArrayKeys('street', 'city', 'postcode');
Rule::regex('/^[a-z]+$/i');
```

**3. Options as methods:**

```php
Rule::url()->protocols(['https']);              // url:https
Rule::uuid()->version(7);                       // uuid:7  (also 'nil' and 'max')
Rule::ip()->version(6);                         // ipv6    (only 4 or 6; anything else throws InvalidArgumentException)
Rule::distinct()->strict()->ignoreCase();       // distinct:strict,ignore_case
Rule::confirmed()->customField('repeat_pass');  // confirmed:repeat_pass
Rule::currentPassword()->guard('admin');        // current_password:admin
```

The same release adds `Rule::date()->equals('2026-12-31')` (or a `DateTimeInterface` such as `today()`), which emits `date_equals`. Confirmed in `Rules/Date.php` at v13.36.0.

## Values with commas: the real fix

`'terms' => 'accepted_if:plan,Team, Annual'` is read as two values, `Team` and ` Annual`, so it never matches `Team, Annual`.

The field/value builders implement a new `Illuminate\Contracts\Validation\ParameterizedRule` contract (it extends `Stringable` and has a `toArray(): array` method). Its `toArray()` returns the rule name and its parameters, and the validator uses that array directly instead of parsing a string:

```php
'terms' => [Rule::acceptedIf('plan', 'Team, Annual')],   // the comma survives
```

This also covers quotes, pipes and backslashes in values, and field or key names that contain commas.

- `true`, `false` and `null` become `'true'`, `'false'` and `'null'`. For example, `Rule::presentIf('is_company', true)` behaves like `present_if:is_company,true`.
- Casting a builder to a string (for logging, say) gives the string form, with quotes around values that contain commas or double quotes.

## Form request example (trimmed from the article)

```php
public function rules(): array
{
    return [
        'plan' => [Rule::required(), Rule::in(['starter', 'Team, Annual'])],
        'terms' => [Rule::acceptedIf('plan', 'Team, Annual')],
        'company_name' => [Rule::requiredIfAccepted('is_business')],
        'billing' => [Rule::required(), Rule::requiredArrayKeys('street', 'city', 'postcode')],
        'coupon_code' => [Rule::nullable(), Rule::prohibits('gift_card')],
        'emails.*' => [Rule::distinct()->ignoreCase(), 'email'],
    ];
}
```

## Takeaways and gotchas

- **Requires Laravel 13.36 or later.** On older 13.x versions, most of these methods don't exist. Upgrade before using them, or keep using strings.
- **Benefits:** autocompletion and discoverability. A typo in a method name fails as an undefined-method error rather than an unknown rule; that is my reading, not stated in the article. Option methods are self-documenting, and parameters with commas are safe.
- **Builders return different kinds of values:**
  - Parameterless builders return plain strings, so they are equivalent to the string rules.
  - Field and value builders return `ParameterizedRule` objects.
  - Option builders return rule objects.
  - Code that inspects rules as strings may need `(string)` casts.
- **Strings still work.** You can migrate one field at a time; nothing is deprecated (neither the article nor the docs say otherwise).
- **Other builders:** `Password::min(8)->...` (`Illuminate\Validation\Rules\Password`) and `File::types(...)` are separate rule classes, not `Rule::` methods. See the docs.
- **Article links I didn't open:**
  - "Rule Builders for Every Validation Rule in Laravel 13.36"
  - "Laravel's Rule::contains() for Fluent Array Validation"
  - "Laravel Fluent Validation: An Object-Oriented Rule Builder" (possibly a third-party package; not verified)

## Related

- [Laravel Interview Questions](/Technology/Career/Resources/Laravel Interview Questions) has a short Validation section.
- [Laravel AI SDK](/Technology/AI/Tools/Frameworks/Laravel AI SDK)
