---
area: technology
domain: prompt-engineering
type: guide
title: ChatGPT Prompting
description: Seven practical tips for getting useful results from ChatGPT, from giving context and using variables to splitting tasks, asking for evidence, and building conversation flows.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - prompt-engineering
  - chatgpt
  - llm
---

# ChatGPT Prompting

In just the past few months, ChatGPT has become an assistant, a partner, and a mentor for a great many people. But not everyone knows how to use ChatGPT really effectively and apply it to daily life and work. This article is for people who have tried ChatGPT but still don't feel it is truly useful or serving their intended purpose. It is just the experience of a second-grader sharing back with a first-grader, so I hope the fifth- and sixth-graders will go easy on me and add their feedback.

## Context Is King

As when talking to anyone, if you want others to understand you, you need to give information clearly and coherently. ChatGPT is built to talk to you like a real person, so to use it effectively, communicate with it like a real person.

When assigning a task to ChatGPT, imagine you are handing work to a new employee who knows nothing about the company and has not been given any title yet. Tell ChatGPT:

- **What ChatGPT's role is here**: an E-commerce Product Manager, a senior Python developer, an HR expert, a psychological counselor, a friend to confide in. ChatGPT can play almost any role you can think of, but if you don't say so clearly, the answer you get will be very generic. Stating the role helps ChatGPT roleplay more effectively, giving answers with more suitable language and more depth.

Act as a `{role}`In the role of a `{role}`Imagine yourself as a `{role}`

- **The context of the task**: This is where you give ChatGPT the current situation, what you want to achieve, and the form to do it in. Instead of telling ChatGPT `Write me a proposal email for a partnership`, provide more information about your company, the partner you want to email, and your proposal. Combined with the role from the previous step, a prompt with good context looks like this:

Act as a Business Development expert. Please write me a partnership proposal email **to LarkSuite, a giant in building a Digital Workplace platform. Our company is KD Digital, an outsourcing company that focuses on digitalization. We want to partner with LarkSuite to sell their solution at a better price for Vietnam while expanding their appearance and coverage.**

- **The format of the answer:** The answer you get with the prompt above may still be too long or too short, or not in the format you want. The solution is to add references for writing format (`use AIDA/ PAS/ FAB writing format`), desired length (`100 words`, `3 paragraphs`, `5 minutes script`), wording (`simple language`, `explain like i'm five`, `use jargons`), or, if you already have an example, give that example to ChatGPT (`following the style of this email`, `you can use the following email for reference`, `here is a sample that you can follow`)

Act as a Business Development expert. Please write me a partnership proposal email to LarkSuite, a giant in building a Digital Workplace platform. Our company is KD Digital, an outsourcing company that focuses on digitalization. We want to partner with LarkSuite to sell their solution at a better price for Vietnam while expanding their appearance and coverage. **This email should be written in AIDA format and is under 300 words. Please use simple language, without any jargon.**

## Organize With Variables

All the elements from the previous step can be rearranged so your prompt looks shorter by using variables. This is the best way to reuse existing prompts and build them into formulas. In fact, the collections of 500 or 1000 ChatGPT prompts sold on the market every day are just formulas swapped with different words for mass production.

Act as a [role] of [company]. Please write me a partnership proposal email in [format] to [partner].[role]: Business Development Expert[company]: KD Digital, an outsourcing company that focuses on digitalization[format]: AIDA format with under 300 words, using simple language, without any jargon.[partner]: LarkSuite, a giant in building a Digital Workplace platform.

You can write variables as `[variable]` as I did above, or `{variable}`, `{{variable}}`, `$variable`, or anything else; it is not mandatory. As long as ChatGPT understands it is a variable. Using variables lets you separate the task to be done from the context. It makes ChatGPT's task easier to read while still carrying more context. For example, you can write a whole long paragraph about your company, the tone of voice you want, and who the target audience is in the `[company]` part. But if you wrote all of that into the prompt as before, it would certainly be messy, rambling, and hard to follow.

## Grammar Police

ChatGPT is fundamentally predicting the next word to display. The larger the training data, the better the prediction. And most of ChatGPT's training data is English. So although ChatGPT supports Vietnamese, if you can, I still recommend using English for the highest-quality answers.

But English is not a strength for many people, so mistakes in spelling, grammar, and word choice are hard to avoid. It's like a Southerner going to the North and asking for a "chén": what you get will likely not be what you wanted. Although ChatGPT is now smart enough to recognize small errors like wrong verb forms and tenses, if the sentences are clumsy it is hard for ChatGPT too. I suggest still using Grammarly to fix wording if needed. Or add a magic phrase at the end:

If you understand your assignment, please execute the prompt. In case there is anything you are unsure of, please give me some questions so I can clarify it.

or

If you understand your assignment, please summarize it in simple language before continuing.

This lets you check whether ChatGPT truly understands the assigned task.

## Divide And Conquer

For the best results, break the work down before asking ChatGPT to do it. If a job has 5 steps, tell ChatGPT to do step 1, and after getting the answer, tell it to continue with step 2, and so on. This way, ChatGPT can give more accurate and detailed answers for each part. For example, instead of asking ChatGPT to write the content for a whole landing page in one prompt, split it up: write the Hero section first, then Features, then About Us.

When breaking work down, another trick you can use is to ask ChatGPT to produce several different results for the prompt so you can choose, edit, and combine ideas. Then you can ask ChatGPT to evaluate the returned results and say which answer is best and why.

Act as a Business Development expert. Please write me **3 possible variants** of a partnership proposal email to LarkSuite, a giant in building a Digital Workplace platform. Our company is KD Digital, an outsourcing company that focuses on digitalization. We want to partner with LarkSuite to sell their solution at a better price for Vietnam while expanding their appearance and coverage. This email should be written in AIDA format and is under 300 words. Please use simple language, without any jargon.

## Evidence

Paying for GPT-4 or ChatGPT Plus will reduce many of the made-up answers you get from ChatGPT. But there is another way that is better and cheaper: ask ChatGPT to add evidence, sources, and illustrative examples for its answer.

By asking for evidence, you not only get a more credible answer from ChatGPT. It also serves as an input for ChatGPT throughout that conversation thread, telling it to prioritize giving you accurate, verified information.

ChatGPT Plus now has a web browsing feature, and asking ChatGPT for evidence becomes even more useful because it gives you more source material to read and consult before making your next request. (Or tell ChatGPT to find similar documents, read them all, and produce a new piece for you...)

## Flow Is Better Than Prompt

The perfect prompt is something many people look for. Many people who don't use ChatGPT daily tell me the reason is that when they go to ask, they don't know how to phrase it well to get the best result. That is also the insight that lets people selling prebuilt packs of 500-1000 prompts, extensions like AIPRM, and prompt marketplaces like PromptHunt make money. Most recently we also have Prompt Perfect, an app that automatically rewrites your prompt to optimize the results you get. Prompt Perfect has now also become a plugin in ChatGPT Plus.

However, what I want to say here is that ChatGPT's power lies in back-and-forth communication and exchange. Sometimes you can get the answer you want from ChatGPT with a single prompt, but other times it is a whole process. As I said above, to have ChatGPT write landing page content effectively, you need to split the work up. And of course you don't create 5 different threads, each asking ChatGPT to write one part, and give all the context again every time. What you need to do instead is:

Step 1: Provide context and ask ChatGPT to create an outlineStep 2: Review and give feedback on that outline to see if anything needs changingStep 3: Start asking ChatGPT to write each part of the landing page one by one and review each part

I also brainstorm with ChatGPT often when coming up with an idea. Suppose I want to develop an idea for a new business; this is how I would do it:

Step 1: Talk about the idea with ChatGPT and ask it for an outline of what needs to be doneStep 2: Work through each part together, tell ChatGPT to ask questions, and if a question is too hard to answer, you can absolutely tell ChatGPT to answer it for you and see if that's okStep 3: After having a fairly comprehensive picture, I ask ChatGPT to summarize everything so I can use that summary as context for later conversationsStep 4: Create new detailed threads for building the product and marketing, and put the summary above into a variable as context for these new threads

Separating threads helps ChatGPT focus on the task at hand, while the summary lets ChatGPT still have the big picture of the business. You can think of it as having created 3 business partners/employees: a Co-founder who sits and thinks up ideas with you, a developer who takes care of building the product, and a marketer who does the marketing. I'm fairly sure there is no way to do all of this with prompts alone. That is also what I like most about ChatGPT compared with Bard (narrow context window) and Bing (limited number of chat turns per thread).

## Practice Makes Perfect

This section is just here as a placeholder. Everyone understands what it means.

Thanks everyone for reading to the end. If you found this article helpful, don't forget to share it with your friends so ChatGPT spreads further.

> **See also:** [Prompt Guide](/Technology/AI/Concepts/LLM And Generative AI/Prompt Engineering/Prompt Guide) · [Prompt Strategies](/Technology/AI/Concepts/LLM And Generative AI/Prompt Engineering/Prompt Strategies)
