---
area: technology
domain: design-patterns
type: guide
title: Federated Identity Pattern
description: Explains delegating authentication to an external identity provider using claims-based tokens for single sign-on, less admin overhead, and stronger security, with Microsoft Entra ID examples.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - design-patterns
  - azure
  - security
  - identity
  - sso
resource: https://learn.microsoft.com/en-us/azure/architecture/patterns/federated-identity
---

# Federated Identity Pattern

The Federated Identity pattern delegates authentication to an external identity provider (IdP). This simplifies development, reduces the user-administration burden, and improves the user experience of the application.

## Context and Problem

Users often have to work with many different applications from different organizations. Using separate credentials for each application leads to:

- **Fragmented experience:** Users easily forget passwords when they have too many accounts.
- **Security gaps:** When an employee leaves the company, forgetting to disable their accounts across many applications is a major risk.
- **Complex management:** Administrators must manage credentials and reset passwords for each application individually.

## Solution

Separate user authentication from the application code and hand it to a trusted identity provider.

- **Identity Provider (IdP):** Services such as Microsoft Entra ID (Azure AD), Google, Facebook, or a company's internal directory system (AD FS).
- **Claims-based access control:** The IdP authenticates the user and returns a token containing "claims" (assertions) about the user's identity, roles, or permissions.
- **Security Token Service (STS):** Can transform or add information to the token before it is sent to the application.

## Benefits

- **Single sign-on (SSO):** Users sign in once to access many different applications.
- **Reduced administrative burden:** The application doesn't need to store passwords or provide a "forgot password" feature. Account management belongs to the IdP.
- **Stronger security:** The application never sees the user's actual password, only digitally signed tokens.
- **Scalability:** Easy to integrate with business partners or let users sign in with social accounts.

## Issues and Considerations

- **Single point of failure:** If the IdP goes down, users can't sign in to the application. Choose a highly available IdP.
- **Home realm discovery:** If the system supports multiple IdPs, you need a mechanism to determine which IdP a user should be redirected to (for example, based on the email domain).
- **User information:** Social providers (such as Facebook) may supply only an email and a name, so the application may need to maintain additional information of its own for mapping.
- **Authentication vs. authorization:** Clearly distinguish authentication (who you are) from authorization (what you may do). The IdP handles authentication, but the application remains responsible for controlling access based on the claims it receives.

## When to Use This Pattern

- **Enterprise SSO:** Let employees use their company accounts to sign in to SaaS apps (such as Office 365 and Salesforce).
- **Cross-organization collaboration (B2B):** Authenticate employees of partner companies without creating accounts in your own directory.
- **SaaS applications:** Serve many customers, each of which wants to use its own identity system.
- **Consumer applications (B2C):** Let users sign in with Google or Facebook accounts to reduce sign-up friction.

## Implementation Examples on Azure

- **Microsoft Entra ID (formerly Azure AD):** The most common enterprise IdP on Azure.
- **Azure AD B2C:** A service dedicated to customer identity management, supporting federation with many social networks.
- **AD FS (Active Directory Federation Services):** An on-premises solution for federating internal identities with cloud applications.

---

_Source: [Azure Architecture Center - Federated Identity pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/federated-identity)_

> **See also:** [Gatekeeper Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gatekeeper Pattern) · [Valet Key Pattern](/Technology/System Design/Practices/Azure Design Patterns/Valet Key Pattern) · [Gateway Offloading Pattern](/Technology/System Design/Practices/Azure Design Patterns/Gateway Offloading Pattern)
