---
area: technology
domain: web-search
type: guide
title: SearXNG
description: SearXNG is an AGPL-3.0 metasearch engine you host yourself. It queries other engines, including Brave, Exa, Google, and Bing, and it does not keep a user profile.
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - web-search
  - searxng
  - metasearch
  - self-hosted
resource: https://github.com/searxng/searxng
sources:
  - id: readme
    resource: https://github.com/searxng/searxng/blob/master/README.rst
    author: human:SearXNG
  - id: github
    resource: https://api.github.com/repos/searxng/searxng
  - id: docs
    resource: https://docs.searxng.org/admin/installation.html
    author: human:SearXNG
  - id: settings
    resource: https://docs.searxng.org/admin/settings/settings.html
    author: human:SearXNG
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# SearXNG

SearXNG is a metasearch engine. A person or a program sends one query to your instance. The instance asks several other search services and returns a combined page. The README states the privacy rule in one sentence. Users are neither tracked nor profiled. The license is AGPL-3.0. The docs home is [docs.searxng.org](https://docs.searxng.org).

Checked 3 November 2026 against the README on `master`, the GitHub API, and the docs. The docs pages carry the version stamp `2026.11.2+cccbc9e15`. SearXNG was not installed and no query was sent.

## Repository

The GitHub API for `searxng/searxng` returned these values on 3 November 2026. The repo is public and not archived. Language is Python. Default branch is `master`. Created 12 April 2021. Last push 2 November 2026 at 17:41 UTC. Stars 39,141. Forks 3,572. Open issues 207. Homepage `https://docs.searxng.org`. License SPDX `AGPL-3.0`.

The README points installers at the [installation guide](https://docs.searxng.org/admin/installation.html) and the [settings guide](https://docs.searxng.org/admin/settings/index.html). Questions go to the Matrix room `#searxng:matrix.org`. Translations are on Weblate at `translate.codeberg.org`.

## How an instance is put together

The install nav offers three paths. A container, an installation script, and a step-by-step install. The app servers named in that nav are Granian and uWSGI, behind NGINX or Apache.

Settings load from the first file that exists and can be read. The path in `SEARXNG_SETTINGS_PATH`, then `/etc/searxng/settings.yml`, then the copy shipped in the repo. A short file can set `use_default_settings: true` and override one key. Engine lists merge by engine name, so a config can add an engine, drop one, or keep only a named set. The sample secret in the docs is the string `ultrasecretkey`. Replace it. `SEARXNG_SECRET` overwrites the secret, and `SEARXNG_BASE_URL` overwrites the public URL.

The reference layout for a public instance uses Valkey. The sample URL is `valkey://localhost:6379/0`, and `SEARXNG_VALKEY_URL` overwrites it. The settings nav still has a `redis:` section next to `valkey:`. This note does not say the Redis section is gone.

The docs have a page titled "Answer CAPTCHA from server's IP." Upstream engines challenge the instance's address. That page was not read, so this note does not describe the workaround. There is also a user page titled "Why use a private instance?" That argument was not read. Public instances are a documented setup, not an accident.

## What it can query

SearXNG does not crawl the web itself. An engine is a module that calls someone else's search and maps the response. The docs nav lists engines for Brave, Exa, Bing, DuckDuckGo, Google, Startpage, Qwant, Yandex, Kagi, Marginalia, and Mwmbl, plus academic and code sources such as arXiv, PubMed, Semantic Scholar, GitHub, and GitLab. That list is a sample of the nav, not a count. Turning an engine on does not give you that vendor's API terms. An Exa engine still needs an Exa key. A Brave engine still needs whatever Brave requires of that integration.

Result types in the docs nav include the main result, key-value, code, paper, file, image, video, answer, correction, suggestion, and infobox. Built-in plugins named in the nav include a calculator, hash values, hostnames, infinite scroll, self-info, a Tor check, a unit converter, and a time zone. Built-in answerers named there are random, statistics, and translation. There is a Search API page for callers that want JSON instead of HTML. Its schema was not copied here.

> **See also:** [Brave AI](/Technology/AI/Tools/Data/Brave AI) · [Exa](/Technology/AI/Tools/Data/Exa) · [Data Tools](/Technology/AI/Tools/Data/Data Tools)
