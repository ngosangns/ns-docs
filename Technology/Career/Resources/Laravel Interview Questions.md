---
area: technology
domain: laravel
type: cheatsheet
title: Laravel Interview Questions
description: Short Q&A reference covering common Laravel interview topics such as CSRF, facades, service container, validation, Eloquent, and caching.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - laravel
  - php
  - interview
---

# Laravel Interview Questions

## Resources

- Laravel Beauty: Service container
- Dependency Injection in Laravel
- Service Container in Laravel
- Service Provider in Laravel

## Questions

### CSRF Protection

- **Disable CSRF for a route**: Add the URL/route to `$except` in `app\Http\Middleware\VerifyCsrfToken.php`

### Facade

- **Definition**: A class that provides a static interface to services, accessing the service directly from the container
- **Usage**: Defined in `Illuminate\Support\Facades`

### Helper

- **Creating a helper**: Create `app/helpers.php`, add it to the `composer.json` autoload, and run `composer dump-autoload`

### Artisan

- **Definition**: Laravel's command line interface, providing many useful commands

### Service Container

- **Definition**: A tool for managing class dependencies and dependency injection (IoC container)

### Mail Configuration

- **Configuration**: An API on top of SwiftMailer with drivers (SMTP, Mailgun, SparkPost, Amazon SES)

### Auth

- **Definition**: Verifies login credentials against the database and manages them through sessions
- **Usage**: `php artisan make:auth`

### Validation

- **Definition**: Validates incoming data using `ValidatesRequests`
- **Rules**: Alpha, Image, Date, Format, IP Address, URL, Numeric, Email, Size, Min/Max, Unique with database

### Soft Delete

- **Definition**: Soft-deletes records without removing them from the database by setting `deleted_at`
- **Usage**: `use Illuminate\Database\Eloquent\SoftDeletes;` and `use SoftDeletes;` in the model

### Fillable

- **Definition**: An array of fields that can be used to directly create new records (Mass Assignment)

### Guarded

- **Definition**: The opposite of fillable; fields designated as guarded are not mass assignable

### Caching

- **Supported**: Memcached and Redis
- **Default**: File cache (serialized objects)

### Blade Syntax

- **{{ $username }}**: Displays text content (HTML escaped)
- **{!! $username !!}**: Displays content with HTML tags

### Cookie vs Session

- **Cookie**: A small file the server embeds on the user's machine, sent with every request
- **Session**: Stored on the server, more secure, has a PHP SESSID

### empty() vs isset()

- **empty()**: Checks for an empty variable, empty array, null, 0
- **isset()**: Checks whether a variable exists and whether it is null
- **Comparison**: empty covers more cases than isset

### Queries in Laravel

- **2 ways**: Eloquent and Query Builder
- **Eloquent**: Works through models, supports relationships, code is easier to read
- **Query Builder**: Works through the DB layer, can perform most database operations
- **Comparison**:
  - Both use PDO parameter binding (preventing SQL injection)
  - All query builder functions can be used in Eloquent, but not the other way around
  - Eloquent cannot perform overly complex queries
- **Usage**: Depends on the query; you can combine Eloquent with Query Builder and use `DB::raw()` for raw SQL

> **See also:** [Senior PHP JavaScript Interview](/Technology/Career/Practices/Senior PHP JavaScript Interview) · [Vuejs Interview Questions](/Technology/Career/Resources/Vuejs Interview Questions)
