---
area: technology
domain: authentication
type: guide
title: Authentication Security
description: A checklist of security measures for login, logout, forgot-password and registration flows, plus practical deployment caveats.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - authentication
  - security
---

# Authentication Security

> **Note**: Not every project needs every feature below. Weigh each item against the project's scale and consult an experienced Senior/SA (solution architect).

## Login

- **Input validation**
  - Validate the email/username and password format before sending them to the server
- **Password security**
  - Enforce strong passwords (at least 8 characters, with uppercase, lowercase, digits and special characters)
  - Hash passwords with bcrypt, Argon2 or scrypt (never store plain text)
- **Session management**
  - Create the session on the server and send the session ID via cookie (if using sessions)
  - Regenerate the session ID after a successful login (prevents session fixation)
  - Limit session lifetime
- **Token-based auth (JWT)**
  - Issue an access token and a refresh token after authentication
  - Send them to the client for storage
- **Secure cookies**
  - Set HttpOnly, Secure and SameSite when storing tokens/session IDs in cookies
- **CSRF protection**
  - Add a CSRF token if cookies are used to hold auth information
- **Two-Factor Authentication (2FA)**
  - Support two-step verification via email/SMS or an app (Google Authenticator)
- **"Remember me" support**
  - Store a long-lived refresh token/token to keep the user signed in across sessions
- **Account lockout policy**
  - Temporarily lock the account after X consecutive failed logins (for example 5) to prevent brute force
- **Rate limiting**
  - Limit the number of login attempts within a time window
- **CAPTCHA**
  - Add a CAPTCHA after several consecutive failed logins
- **Device fingerprinting**
  - Collect device characteristics (user-agent, canvas, WebGL, timezone, ...)
  - Hash them into a device ID
  - When an unfamiliar device is detected => send a warning email and require OTP verification
- **GeoIP tracking**
  - Detect logins from an IP in an unusual country
  - Send a warning email and require OTP verification
- **Frontend error feedback**
  - Show specific errors (wrong password, account does not exist, account locked, ...)
- **Logging**
  - Log every successful/failed login (id, email, time, IP, device, ...)

## Logout

- **Session invalidation**
  - Fully delete the session on the server to prevent reuse of an expired session
- **CSRF protection**
  - Require a valid CSRF token when calling the logout API
- **Token revocation (JWT)**
  - Mark the token as revoked through a blacklist in Redis
  - Or give tokens a very short lifetime and rely on refresh tokens
- **Clear cookies**
  - Delete all cookies that hold authentication data (access token, refresh token, session ID, ...) on the client
- **Redirect**
  - Redirect to the login page or home page after a successful logout
- **Frontend state cleanup**
  - Remove user data from state/Redux/Context/... to avoid displaying sensitive information
- **Invalidate refresh token**
  - Revoke or delete the refresh token from the database
- **Log out of all sessions (optional)**
  - Let users log out of all devices, a specific device, or only the current device
- **Frontend error feedback**
  - Use try/catch to notify the user if logout fails
- **Logging**
  - Log every successful/failed logout (id, email, time, IP, device, ...)

## Forgot Password

- **Email/username verification**
  - Check that the email/username exists in the system before sending a reset link
- **Rate limiting and abuse protection**
  - Limit forgot-password requests per IP or per email
- **Generate a secure token**
  - Create a random, sufficiently long (32-64 characters), hard-to-guess, single-use token
- **Token expiration**
  - The reset token must expire quickly (for example after 15 minutes)
- **Send the reset link by email**
  - Send an email containing a reset link such as `https://example.com/reset-password?token=...`
- **Token storage**
  - Store the token in the database with its expiry time, linked to the user (if not using JWT)
- **Reset password form**
  - Check that the token is still valid
  - The new password must be strong enough (with confirmation re-entry)
  - Verify CSRF if cookies are used
- **One-time token usage**
  - Invalidate the token immediately after a successful password reset
- **Password security**
  - The new password must be strong (at least 8 characters, with uppercase, lowercase, digits and special characters)
  - Hash passwords with bcrypt, Argon2 or scrypt (never store plain text)
- **Post-reset notification**
  - Send an email notifying the user that the password was changed
- **Log out of all sessions (optional)**
  - Allow logging out all current sessions after a password reset
- **Frontend error feedback**
  - Show specific errors (token expired, password too weak, ...)
- **Logging**
  - Log every successful/failed password reset (id, email, time, IP, device, ...)

## Register

- **Input validation**
  - Check the email format, password strength, and that the username has no special characters
  - Confirm that the two password entries match (on both client and server)
- **Duplicate check**
  - Check whether the email/username already exists in the system
- **Password security**
  - Enforce strong passwords (at least 8 characters, with uppercase, lowercase, digits and special characters)
  - Hash passwords with bcrypt, Argon2 or scrypt (never store plain text)
- **Email verification**
  - Send an account verification email (with a link or confirmation code)
- **Rate limiting & bot protection**
  - Limit the number of registrations from one IP
  - Combine with CAPTCHA/reCAPTCHA to stop bots from creating fake accounts
- **Username/email normalization**
  - Convert the email to a canonical form (lowercase, trim leading/trailing whitespace, ...)
- **Set default user role/status**
  - Assign a default role (for example user) and an unverified status until the email is verified
- **Create related entities**
  - Create the profile, cart, favorites, ... depending on the application's business logic
- **Send a welcome email**
  - Send a welcome email with instructions for verification, usage, support, ...
- **Secure session/token issuance**
  - Automatically sign the user in after successful registration (create a session or issue an access token)
- **CSRF protection**
  - Protect the registration form with a CSRF token if cookies are used
- **Email/phone confirmation reminder UI**
  - Show a notice asking the user to verify the account, with a button to resend the verification code/email
- **Terms of Service & Privacy Policy agreement**
  - Require the user to agree to the terms of use and privacy policy
- **Frontend error feedback**
  - Show specific errors (password too weak, account already exists, ...)
- **Logging**
  - Log registrations (id, email, time, IP, device, ...)

## Practical Deployment Notes

- **IP changes (switching wifi networks, moving to 3G/4G)**
  - Consult someone experienced to decide which cases warrant notifying the user
- **VPN**
  - Let users confirm "It's me" if a VPN causes false alarms
- **Private mode**
  - Fingerprinting may fail => fall back to IP + user-agent if needed
- **Privacy**
  - Clearly tell users about fingerprint/IP collection in the Privacy Policy
- **Smooth UX**
  - Don't force too much verification, to avoid annoying users

> **See also:** [Security Tools](/Technology/Security/Tools/Security Tools) · [CVE-2026-40175 Axios IMDS Bypass](/Technology/Security/Write Ups/CVE-2026-40175 Axios IMDS Bypass)
