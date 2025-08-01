---
relates: []
tags:
  - viclass
  - user-registration
  - beta-invite
  - account-verification
  - one-time-login
---
**Use case 1:**

- Go out and talk to somebody
- Pre-create account with their email in the backend
- Automatically send an email to the user with the beta link (like currently)
- User click on the link and automatically logged in if the account is already created

**Use case 2:**

- User already has an account on viclass
- User visit viclass.vn from another machine without identification cookie and will be shown coming soon page like currently
- User enter the email
- System check the email exist in the backend and send a login link (current beta link). Show notification that a link has been sent to the user.
- User click the link and is automatically logged in

---

- User register beta:
	- Get beta registration (create if not existing)
	- Check code of the beta registration:
		- If exist then create a one-time record:
			- ID: combination of the user-id and one-time-id.
			- Set expiration time (currently 5 minutes).
			- Use Redis to store one-time login data.
			- Delete the Redis record after use.
			- Send email.
	- Return
- Admin invite:
	- For each account:
		- Create account if not existing
			- Create verification code.
			- Verify account.
		- Define the one-time record:
			- ID: combination of the user-id and one-time-id.
			- Set expiration time (currently 5 minutes).
			- Use Redis to store one-time login data.
			- Delete the Redis record after use.