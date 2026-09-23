---
area: technology
domain: payments
type: guide
title: Bank Transfer Payment
description: Explains how to automatically confirm bank-transfer payments for orders by polling transaction history and matching a transfer-content syntax, and compares third-party services, direct bank APIs, and non-public APIs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - payments
  - banking
  - cron
---

# Bank Transfer Payment

Hello everyone, experts and all.

Someone asked recently about food ordering, where the order status changes automatically once the bank transfer succeeds. There are plenty of experts in this group and I'm only so-so myself, but I've wrestled with this before, so let me share the clearest approach I know, in case it helps anyone who doesn't know it yet.

## How It Works

**1. First: define a transfer-content syntax for customers.** For example, if your restaurant is called Laratech, the syntax could be `LARATECH179` (179 is the order ID). After the order is placed, show this syntax to the user, or go to VietQR and call the link that generates a payment QR code with your chosen syntax and the amount included. Very convenient.

**2. Next, run a cron job that continuously fetches the bank's transaction history.**

Running the cron once per minute is smooth. Every transaction has a reference code and a description, and the description contains the transfer syntax.

- Unfortunately, banks don't have a dedicated field for the transfer syntax. It's all lumped into the description, which can be very long.
- Your job is to write a regex that parses the syntax and extracts the prefix and the order ID from the description.

You must parse out the `LARATECH` prefix because incoming transfers aren't only food payments. Sometimes your girlfriend sends you money too.

- Once you have the order ID, amount, time, and so on, update the DB and store the transactions, and you're done.
- You also need a field that stores the reference code returned by the bank, so you can compare and check which transactions already exist.

## About the Bank Side

As one commenter said, there are many approaches.

**1. Use a third party, which comes in several forms**

- The third party signs a contract with the bank, uses the bank's API, and builds an API for you to pay for and use.
- Use an automation app on a phone (it requires Android): you install an app that reads the bank's transaction SMS messages, and so on.

⇒ This approach costs money every month, is sometimes annoyingly delayed, and you have to hand over your bank account credentials, which is a bit uncomfortable.

**2. Use the bank's API directly, i.e. their web API**

- TPBank: no captcha, but the developers are very hot-tempered. At the slightest slip they lock you out, and they lock the device ID, not just the IP. ⇒ If you use this bank, you must emulate parameters so that requests look like a real browser, as natural as possible. I repeat: the developers are very hot-tempered.
- MB Bank: has a captcha. You have to write a captcha-solving service, but the captcha keeps learning and changing, so it's a hassle and complicated. It's best to buy captcha solving, about 1 đồng per solve, very cheap.
- VCB is the same as MB Bank.
- And many other banks, such as Vietin.

⇒ This approach requires some coding knowledge and costs a little money, but keeps your account safe.

In particular, you must make good use of the refreshToken. Logging in over and over to get a new accessToken wastes captcha money, and the bank's hot-tempered developers will lock your login.

⇒ Banks also offer APIs for businesses, but they are convoluted and exhausting to deal with.

**3. The last approach, the most delicate but the best**

- Use the banks' non-public APIs, such as their mobile app APIs or their SMS APIs. Many banks have them, and even Momo does.

⇒ Safe, free, no delay. But nobody dares to share it, since it's their livelihood: if the bank developers change the URL, the whole village is finished.

I've done all three approaches. If you need the name of a third party, code, or an API URL, message me and I'll share. I don't want to name third parties here.

As for the third approach, I'm sorry, I can't share it. I struggled a lot back then, so I hope this helps you somewhat. And I hope the bank developers in this group stay calm and don't get hot-tempered.

> **See also:** [Outbox Pattern](/Technology/System Design/Practices/Outbox Pattern) · [Task Scheduler System Design](/Technology/System Design/Practices/Task Scheduler System Design)
