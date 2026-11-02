---
area: technology
domain: iot
type: tool
title: Gokino
description: Gokino (gokino.dev) is a browser Arduino IDE that compiles sketches in the cloud, flashes boards over WebSerial, and meters an AI assistant with credits.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - iot
  - arduino
  - ide
resource: https://gokino.dev/
---

# Gokino

[Gokino](https://gokino.dev/) is a browser IDE for Arduino-style sketches. The homepage title is "Gokino – The AI-Powered Arduino IDE", and the banner on 2026-11-02 says v1.2.0, "New Release: Online Project Sharing". The docs intro says it compiles in the cloud, uploads over WebSerial, edits with CodeMirror 6, and adds an AI assistant, with no local toolchain. It is not the Arduino IDE and not Arduino Cloud. The footer names Gokilabs and "© 2025". A public source repository was not found. Checked 2026-11-02 by reading the homepage, `/en/docs`, `/en/privacy`, and `/en/terms`. Not signed in, not compiled, not flashed.

## What the docs claim

The docs overview lists five regions: a sidebar (explorer, templates, libraries, boards, shared), the editor, a console and serial monitor, the AI assistant, and verify and upload. Cloud compile is described for the selected board, with AVR, ESP32, ESP8266, and STM32 named, plus a free hourly quota. The intro does not give the quota number. Projects can stay in the cloud, including sync and sharing with other Gokino accounts, or open a local folder through the File System Access API. The assistant is described as reading the file you are editing and proposing changes as a diff you review. The meta description says the AI completes code, hunts logic bugs, optimizes memory, and explains lines.

The homepage repeats a larger catalog as labels, not as a list this note counted: ESP32 380+ boards, Raspberry Pi Pico 144+, STM32 41+, Arduino official 29+, ESP8266 38+, Seeed XIAO 47+, and "10,000+ libraries". The marketing mock shows a model name "Gokino IoT-v2" and a broker `broker.gokino.dev`. Those strings were not confirmed inside a signed-in IDE. Illustrated quotes on the homepage use generated avatar art. They are not treated as user reports.

Open Graph tags on the homepage still point `og:url` and `og:image` at `http://localhost:3000`. That is a build leftover, not the public origin. Alternate locales advertised in those tags include Vietnamese (`vi_VN`), Spanish, Chinese, French, Japanese, Korean, Portuguese, German, Arabic, and Hindi. Those locale pages were not checked for completeness.

## Price and accounts

Homepage prices on 2026-11-02, monthly column:

| Plan | Price | Credits shown |
| --- | --- | --- |
| Lite | $5/month | 900 CR |
| Pro | $10/month | 2,700 CR |
| Max | $20/month | 7,500 CR |

A separate line offers 450 credits for $3. A signup banner offers 300 credits and says no credit card is required. Quarterly, 6-month, and annual toggles are on the page. Their discount math was not recalculated. The docs intro's "free hourly quota" and these credit packs are both published. This note did not open the credits article, so it does not say how the two meters interact.

## Privacy and terms

Both pages say they were last updated 15 September 2025. The privacy page says registration collects name, email, and password, that payment card data is stored by "our payment processor" (the processor is not named), and that sketches and project files are processed and stored to provide AI help and cloud storage. The terms say you keep ownership of code you create, and you grant a license to host, run, and display it only to provide the service. The IDE, AI models, graphics, and software are called Gokino's property. Reverse engineering the service is prohibited. The age section says makers under 13 should use it with a parent or guardian, and users under 18 need a parent's permission. That is the page's wording, not a legal review. Contact mail on both pages is `support@gokino.dev`. Neither page names a registered company behind the Gokilabs footer.

## Not the same as Learn Arduino

[Learn Arduino](/Technology/IoT/Tools/Learn%20Arduino) is a free static 3D course that simulates an Uno in the browser and does not compile C++. Gokino is an account-backed IDE that says it compiles and flashes real boards. They solve different jobs.

## Not checked

No account was created. Compile, WebSerial upload, library install, sharing, and the AI diff were not used. Board counts, the 10,000-library claim, compile speed, and the credit-to-quota relationship were not verified. No GitHub repository for the IDE was identified.
