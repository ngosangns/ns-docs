---
area: technology
domain: java
type: case-study
title: Fresher Java Interview
description: Two firsthand accounts of Fresher Java Backend Developer interviews at a fintech company and an outsourcing company, with the OOP, Java core, database, and Spring questions asked.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - java
  - interview
  - backend
---

# Fresher Java Interview

**Sharing the interview process for a Fresher Java Backend Developer position at a certain fintech company (half a month ago):**

**Round 1**: CV scan (if you pass, move to round 2)
**Round 2**: Phone interview where HR runs a brief OOP test and an English test (if you pass, wait for the team to review your CV before round 3, face-to-face)
**Round 3**: Go to the office to interview with HR and a tech lead sitting together, with the following set of questions (I only remember 95% of the questions that day) (The interview is in Vietnamese, folks)

- Greeting and general self-introduction
- Overview of your study and work history
- OOP:
  - Compare abstract class vs interface
  - Compare abstract vs inheritance
  - Test case: can you implement method logic inside that class? Why?
  - When implementing an interface or extending an abstract class, do you need to override the methods? In which cases not?
  - Do you need to re-implement methods when extending a parent class?
  - Compare the @Override annotation/method overriding vs overloading
- Java core:
  - Give an overview of the basic collection interfaces
  - Compare list vs set (performance, principle, use case, why use)
  - Compare LinkedList vs ArrayList (performance, principle, use case, why use)
  - Compare ArrayList vs an ordinary dynamic array (use case)
  - What is the difference between Integer and int (type, instance or variable, memory saving ...)
  - Pass-by-value & pass-by-reference (equals() vs ==: which kind of comparison, why they differ, and when to use each)
  - Have you worked with Java files? (I said not yet, so we skipped)
  - The static keyword in Java (use case, why use it -> what is a static method for)
  - There were more questions, but they were easy and I've completely forgotten them
- Design patterns
  - What is MVC? Explain each part
  - Classify the types of design patterns
  - Present whichever design patterns you know: singleton, DI, repository, factory, MVC
- Database
  - How do you connect to a database? What does it involve?
  - How many kinds of joins do you know? Explain them (inner, left, and right)
  - Compare and explain the concepts of MongoDB vs MySQL
- Others:
  - How do you use beans in Spring, and why use beans (XML + annotations; it's a plus to also explain how a Spring app executes)
  - Compare GET vs POST, and POST vs PUT
  - Why use POST to create and PUT to update? Can they be swapped? (I only half-answered this one)
  - Why are GET and POST not enough that PUT, DELETE, and the rest were invented?
  - Which framework do you use to manage the database (Hibernate vs JDBC)? Compare the two and their use cases
  - How do you manage transactions/caching? What do you use?
  - Firebase SDK overview
  - Asked about the tools/GUIs you have used, such as MySQL Workbench, Sourcetree, Trello, ...
  - Asked how you manage git and whether you have any templates
  - Asked about concurrency & multithreading (I had just studied event sourcing, so I got asked, hehe)
  - Test case: many simultaneous requests that you don't want to synchronize (process in order) - what then? (queue + event sourcing, hehe -> explain it a bit)
  - Asked whether you have ever used Thymeleaf; if not, how do you do the FE? (I answered ReactJS and they only asked for a quick overview)
  - Which way have you used authentication vs authorization? (a short explanation and what you did with it and how is enough)
  - Then asked whether you have learned Spring Security (I had just finished a free course, so they only asked for a quick overview of the concepts)
  - Do you write tests? (I said I write unit tests, then they asked how, and when they asked about MockMvc I said I had only just looked into it and not applied it)

P.S. I studied Electronics and Telecommunications (ĐTVT) until the end of year 3 (you could say slightly off-field)

---

While I'm at it, I'll also share some questions from an interview about 2 months ago at an outsourcing company in HCM

**Fresher Java Backend**

**Round 1:** CV screening
**Round 2:** IQ test + English interview with HR. Mostly normal conversation.
**Round 3:** Interview with 2 leads

- First, a self-introduction, the school projects you did, and questions about the technologies used, how you implemented them, and what you used them for
- OOP:
  - The concept of inheritance, with a concrete example of inheritance
  - Polymorphism in Java (the concept, and the 2 kinds of polymorphism in Java)
  - Overloading vs Overriding
  - Abstract class vs Interface
- Java core
  - Some specific declarations with the static keyword (roughly: applying the keyword to methods and variables - is it allowed in this case / what is it for)
  - The same as above for the final keyword
  - Compare ArrayList and LinkedList, and when to use each
  - What are Set and Map, what are HashSet and HashMap, and when to use them
  - How do you understand primitive types in Java?
- Design Pattern:
  - The MVC model
  - Take a login page as an example: describe how MVC operates when a user logs in through the login page
- Database:
  - Distinguish the WHERE and HAVING clauses
  - The types of joins in a database, followed by a concrete example (what result do you get when applying this join to 2 tables with this data)
  - What is a transaction, what is it commonly used for? What happens when a transaction fails?
- Miscellaneous:
  - Commonly used HTTP methods, their concepts and differences
  - When implementing the controller, do you use POST or GET for login, and why? Could you use GET?
  - Given some code snippets, write on paper the output after running them
  - A few more questions on JPA and Hibernate that I don't remember well

> **See also:** [Fresher Backend Interview](/Technology/Career/Practices/Fresher Backend Interview) · [Oracle Interview Gandhinagar](/Technology/Career/Practices/Oracle Interview Gandhinagar) · [Interview Questions](/Technology/Career/Resources/Interview Questions)
