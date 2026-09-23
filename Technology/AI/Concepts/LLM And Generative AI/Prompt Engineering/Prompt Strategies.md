---
area: technology
domain: prompt-engineering
type: guide
title: Prompt Strategies
description: Eight prompting strategies for LLM applications, including clear instructions, reference text, task decomposition, giving the model time to think, external tools, and systematic evals, plus self-prompting.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - prompt-engineering
  - llm
---

# Prompt Strategies

## Write Clear Instructions

- Put detailed information into the query so the answer is more relevant.
  - The question needs to be clear and specific so ChatGPT understands.
  - Example: Instead of "Write code to compute the Fibonacci sequence", ask "Write me a Python snippet that computes the Fibonacci sequence, and add comments that explain the function of each part".
- Ask the model to adopt a persona.
  - You can ask ChatGPT to answer humorously and playfully instead of seriously and formulaically.
  - This strategy suits requests for speech or paragraph suggestions.
- Use delimiters to clearly separate the parts of the input.
  - Delimiting parts of a prompt is very important.
  - Use markers such as triple quotes ("""like this"""), XML tags, section headings, etc. to clearly delineate the parts to be processed.
  - Example structure: 1. Instruction ... 2. Rules ... 3. Input """Input here""" 4. Output format ....
  - This strategy is especially effective for complex tasks (for example: answering from a document, classifying conversations).
- Specify the concrete steps needed to complete the request.
  - For hard/complex tasks, define a sequence of steps to guide ChatGPT.
  - Treat ChatGPT like a smart child who needs guidance.
  - Example: Instead of "Classify the following conversation for me", instruct: "Please follow these steps... Step 1: Identify the language... Step 2: Identify the keywords... Step 3: Assess relevance... Step 4: Rank and take the most relevant group".
- Provide examples.
  - When theory comes with examples, the listener/model understands very quickly.
  - Supplying clear examples greatly increases the accuracy of ChatGPT's answers.
  - Evaluate the task to see whether the examples are appropriate.
- Specify the desired format/characteristics of the output.
  - Define the desired output clearly (for example: a summary of only 2 sentences, output containing only the predicted label with no explanation).
  - Important for keeping outputs consistent across projects.
  - Prefer the JSON output format because it is versatile and well supported since versions 3.5 and 4.0.

## Provide Reference Text

- Instruct the model to answer using reference text.
  - ChatGPT can look up information in a given document.
  - If you have a trustworthy document, give it to ChatGPT and ask it to use that information to answer. The question will stay close to the document and ChatGPT "knows how to answer".
  - Challenge: The content is too long, contains a lot of irrelevant material, or exceeds the token limit.
  - Flexible solution: Split the document into pieces, use embeddings to find the relevant passages, and only then use ChatGPT to find the answer.
- Instruct the model to answer with citations from the reference text.
  - Ask ChatGPT to quote the text/passage it used to answer.
  - Helps check whether the answer is correct.
  - Helps manage answers better and adjust the prompt when needed.

## Split Complex Tasks Into Simpler Subtasks

- Use intent classification to identify the most relevant instructions for the input query.
  - This strategy uses intent classification (the user's intent/purpose) to determine the most important instructions for the query.
  - By classifying intent, you can pick from a list of prepared, relevant instructions that help the model understand and meet the user's goal.
  - Example: The query "How do I book an appointment?" -> The intent is an appointment booking request -> Apply the instructions about the booking process.
  - Yields more accurate and helpful answers.
  - In essence it decomposes the task into a chain of stages, with each query following a single flow, making answers less ambiguous and easier to control.
  - Improves the model's understanding and interaction, helping it focus on specific instructions and reducing irrelevant information.
- For conversational applications, which often have very long conversations, summarize or filter earlier dialogue.
  - Long conversations are common, but ChatGPT's token limit is finite. Older content can be lost as the conversation grows.
  - Solution: Summarize or filter earlier conversation.
  - Summarizing: Create a concise summary of the important content for an overview.
  - Filtering: Remove unnecessary/unimportant parts to keep the important information relevant to the current goal.
- Summarize long texts piece by piece and build a full summary recursively.
  - Applies when the text to summarize exceeds ChatGPT's token limit.
  - How to do it:
    - Split the text into pieces.
    - Summarize each piece with a ChatGPT prompt.
    - Concatenate the piece summaries into a full summary.
    - If the full summary is still too long, repeat the process (split, summarize each piece) until it meets the requirement. This is why it is called recursive.

## Give the Model Time to "Think"

- Core idea: Force the model to work through a step-by-step reasoning process internally before giving a final conclusion, preventing it from rushing to one.
- Problems solved:
  - Rushed reasoning errors: LLMs easily make mistakes when trying to answer complex, multi-step questions or problems immediately.
  - Influence of misleading information: Keeps the model from being "led astray" by wrong information (such as an incorrect solution in the prompt) by asking it to solve the problem independently first.
- How it works: Change the instructions in the prompt (for example, the SYSTEM prompt). Instead of asking directly for the result, ask the model to carry out specific steps in order:
  1. Solve the problem itself.
  2. Compare the model's solution with the provided solution (for example, a student's).
  3. Evaluate whether the provided solution is correct.
     - Emphasize that the model must not give a final conclusion until it has completed the internal reasoning steps.

- Benefits:
  - Higher accuracy: Fewer reasoning errors, especially for computation, logic, and complex evaluation tasks.
  - Less bias: Avoids being negatively influenced by inaccurate information in the prompt context.
  - More transparency: The internal reasoning process is clearer.
- Use cases: Grading work (math, programming, essays), checking the correctness of information/processes, solving complex problems that need intermediate steps, situations where a quick answer may be unreliable.
- This is a structured application of the Chain-of-Thought technique.

## Use an "Inner Monologue" or a Sequence of Queries to Hide the Reasoning Process

- Core idea: Separate the model's detailed internal reasoning from the final result shown to the user.
- Problem solved: Showing the entire reasoning process may be inappropriate or confusing (for example, in a tutoring application, or when it reveals business logic).
- How it works: There are two approaches:
  - Inner Monologue: Instruct the model to put all of its reasoning and calculations inside a specific format structure (for example: """ """, tags). The reply for the user sits outside that structure. The application (backend) parses the output and shows only the user-facing part. Example: Perform the solving and comparison steps inside """ """, and the hint step outside.
  - Sequence of Queries: Split the task into several separate LLM calls. Call 1: Solve the problem itself (hidden). Call 2: Compare and analyze errors (hidden). Call 3: Act as a tutor and, based on the analysis (from call 2), give a hint without revealing the answer (shown).
- Benefits:
  - Output control: Detailed reasoning without revealing unnecessary information.
  - Better user experience: Concise, on-point responses.
  - Supports specific roles: For example, a tutor role that only gives hints.
  - Less bias: Completely isolates the model's own solving step from the student's possibly wrong solution (with a sequence of queries).
- Use cases: Tutoring applications, homework help, systems that need to hide internal processing complexity, when output must be formatted for a specific role, workflows that must produce both an internal analysis and a customer-facing response.
- This strategy builds on Tactic 1 and is closely related to Prompt Chaining.

## Ask the Model Whether It Missed Anything

- Core idea: Use repeated queries to ask the model to review its results and check for omissions, especially when processing large amounts of data.
- Problem solved: LLMs may "stop too early" or fail to cover all relevant information when processing long documents or comprehensive extraction tasks, as if their "attention" were limited.
- How it works: After the model gives its initial response, send a follow-up prompt. This prompt asks it to look for _more_ relevant items while stressing _not to repeat_ items already found. You can restate the relevant criteria or format. Example: After receiving a JSON list, ask "Are there any other relevant excerpts? Note: do not repeat...".
- Benefits:
  - Better recall: Captures more relevant information.
  - Works around limits: Overcomes the model's processing or attention limits on long inputs.
  - Simple: Easy to do with one or more follow-up calls.
- Use cases: Entity and Relationship extraction in a GraphRAG system, extracting all information from long documents, brainstorming that needs comprehensiveness, document overviews, tasks where missing key information is a major failure.
- This is a form of iterative refinement or self-correction prompting.

## Use External Tools

- Core idea: Recognize that LLMs have inherent limitations. Instead of forcing the LLM to do what it is not good at, use specialized external tools (information retrieval, calculation, code execution, API calls) and integrate their results. Combine the strengths of both the LLM and specialized tools. "Give the right job to the right tool."
- Benefits:
  - Significantly expands the range of capabilities of LLM-based applications.
  - Improves accuracy and reliability for specific tasks (calculation, fetching real data).
  - Lets the LLM interact with real-time data or take actions on other systems.
- Specific mechanisms:
  - Use embeddings-based search to retrieve knowledge (RAG):
    - Mechanism: The foundation of Retrieval Augmented Generation (RAG).
      - _Preparation (Offline):_ Split the knowledge base into chunks, create a vector embedding for each chunk, and store (vector, chunk content) pairs in a Vector Database.
      - _Retrieval (Online):_ The user query is converted into a vector embedding. Search the database for the nearest vectors. The content of the matching chunks is added to the prompt, together with the original question, as context for the LLM.
    - Benefits: Lets the LLM access external information dynamically at run time, producing up-to-date, complete responses and reducing fabrication (hallucination). Example: Answering questions about movies by retrieving actor/director information.
  - Use executable code for exact calculation or calling APIs:
    - Mechanism: Instruct the LLM to write code (for example, Python) and request its execution by placing the code in a specific format (for example, a code block). The backend detects it, extracts it, and runs the code in a safe, tightly controlled sandbox environment. The execution result can be fed back to the LLM as input.
    - Benefits: Provides exact calculation and lets you interact with any API through source libraries. Example: Finding polynomial roots, calling custom functions. Warning: Security is critical, so a trustworthy sandbox environment is required.
  - Give the model access to specific functions (Function Calling):
    - Mechanism: (Specific to the OpenAI Chat Completions API.) The application provides a list of "functions" the LLM is allowed to request to run, with descriptions and parameter structure (schema). Based on the user query and the function descriptions, the LLM generates a JSON object containing the function name and the arguments to call it with. The API returns this JSON to the application. The application executes the actual function/API call. After the function finishes, the application sends a new request to the LLM including the value the function returned. The LLM synthesizes the result and produces the final response for the user.
    - Benefits: This is OpenAI's recommended way for an LLM to interact with external functions/APIs. Clearer in structure, more reliable, and safer than executing arbitrary code. Example: Getting weather information, looking up products, booking appointments through an API.

## Test Changes Systematically (Using Evals)

- Core idea: To improve LLM system performance reliably, measure the effect of changes using comprehensive test suites ("evals"). Don't rely only on looking at a few individual examples.
- Problems solved:
  - Subjective/unreliable evaluation: A change may look good on a few examples yet reduce overall performance.
  - Hard to identify real improvements: There is no objective data basis to confirm them.
- How it works: Build a representative eval suite that is large enough to be statistically meaningful and easy to automate/repeat. Run the evaluation before and after applying a change to compare performance objectively.
- Benefits:
  - Data-driven optimization.
  - Provides objective evidence of effectiveness.
  - Helps detect regressions.
  - Increases confidence when shipping improvements.
- Use cases: An essential part of developing and improving LLM applications, especially when going to production. Used to compare the effectiveness of different prompts, models, and system configurations (for example, RAG).
- Specific eval tactic: Evaluate model outputs against gold-standard answers (using an LLM as the judge):
  - Core idea: Use an LLM as the "judge" to compare the system-generated answer (candidate answer) with the gold-standard/correct answer. Assess aspects such as information coverage and consistency.
  - Problem solved: Automates quality evaluation of LLM output where string comparison falls short, especially when there are many correct ways to phrase an answer.
  - How it works: Design a very specific prompt for the _judge_ LLM. Two variants are described:
    - Variant 1: Fact Checking:
      - Input to the judge LLM: The candidate answer + a list of specific facts the answer should contain.
      - Prompt: Instruct these steps: Restate the fact, find the closest quote in the candidate answer, analyze whether a reader could infer the fact from the quote (explain why), write "yes/no", count the total number of "yes" and return JSON {"count": <number>}.
      - Purpose: Quantitatively measure how well the important factual information is covered.
    - Variant 2: Analyzing Overlap / Contradiction:
      - Input to the judge LLM: The question + the candidate answer + the gold-standard/expert answer.
      - Prompt: Instruct step-by-step reasoning: Analyze step by step the information relationship between the candidate answer and the gold standard (completely different - disjoint, identical - equal, subset, superset, partial overlap - overlapping). Analyze step by step whether the candidate answer contradicts the gold-standard answer. Return the JSON result {"type_of_overlap": "...", "contradiction": true/false}.
      - Purpose: A deeper assessment of semantic relationship and consistency, detecting contradictions.
  - Benefits: Automates evaluation aspects that would otherwise need humans, providing structured, consistent, objective measurements. Assesses subtle nuances such as coverage, overlap, and logical contradiction.
  - Use cases: Question-answering systems, checking the accuracy/completeness of AI summaries, comparing output quality between model/prompt versions.
  - Important consideration: Effectiveness depends on the capability of the LLM acting as the "judge" and on the quality of the evaluation prompt. Human evaluation remains very important for complex or highly subjective tasks.

## Self-Prompting

### Concept

- **Self-Prompting**: A method that lets the model write, evaluate, and optimize its own prompts automatically
- Addresses the dependence on manual prompt engineering, which requires a lot of experimentation and lacks consistency
- Reduces reliance on humans for designing prompts

### Chain-of-Thought Prompting (CoT)

- Lets the model solve complex tasks by decomposing the problem into intermediate steps
- Helps the model approach problems more systematically and effectively
- Gives a visible view of the model's reasoning process, making it possible to spot and fix errors

### The Self-Prompting Framework

#### Preparation Phase

- The model generates sets of simulated questions and answers
- Includes background passages and explanations written entirely from scratch
- Uses these examples for in-context learning

#### Inference Phase

- The model uses the knowledge learned in the Preparation phase to answer real questions
- Automatically evaluates and optimizes the prompt to improve performance

### Applications

- Especially effective for **Zero-Shot Open-Domain QA** (open-domain question answering with no examples)
- Improves model accuracy on complex tasks without task-specific training data
- Reduces the need for labeled data and manual prompt design effort

> **See also:** [Prompt Guide](/Technology/AI/Concepts/LLM And Generative AI/Prompt Engineering/Prompt Guide) · [ChatGPT Prompting](/Technology/AI/Concepts/LLM And Generative AI/Prompt Engineering/ChatGPT Prompting) · [RAG Overview](/Technology/AI/Concepts/LLM And Generative AI/RAG/RAG Overview)
