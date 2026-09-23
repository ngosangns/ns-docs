---
area: technology
domain: recommender-systems
type: guide
title: Recommender Systems
description: Overview of recommender system design, from a two-tower four-stage architecture to an AWS Personalize and generative-AI marketing solution, with a comparison of the two approaches.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - recommender-systems
  - aws
  - personalize
  - genai
resource: https://medium.com/data-science-collective/1-building-a-tiktok-like-recommender-a64563262c1a
---

# Recommender Systems

> - https://medium.com/data-science-collective/1-building-a-tiktok-like-recommender-a64563262c1a
> - https://blog.cloudmentor.pro/blog/aws-mla/solution-personalize-customer

## Building a TikTok-Like Recommender

### Introduction

The article shows how to build a real-time personalized recommender for H&M fashion items, using a 4-stage architecture and a two-tower model. The goal is a system that can handle millions of items and deliver relevant recommendations to users.

### Two-Tower Model

The two-tower model is a deep learning architecture made of two neural networks trained in parallel:

#### Query/Customer Encoder

- Converts customer features into a dense embedding vector
- Handles several kinds of features:
  - **Demographics:** Age, gender, location, etc.
  - **Historical behavior:** Purchase history, views, past interactions
  - **Contextual features:** Time, device, geographic location

#### Item Encoder

- Converts item features into embedding vectors in the same vector space as the customer embeddings
- Handles product features:
  - **Tags:** Type, category, brand
  - **Description:** Detailed product information
  - **Reviews:** Ratings and user comments

#### Benefits of the two-tower model

- **Efficient at scale:** Item embeddings can be precomputed and stored in a database or an approximate nearest neighbor (ANN) search index
- **Fast queries:** The customer embedding only needs to be computed once, then similar items are searched in the vector space
- **Personalization:** Each customer has their own embedding vector reflecting their preferences and behavior

### 4-Stage Recommender Architecture

The recommender is split into 4 stages to optimize performance and accuracy:

#### Stage 1: Candidate Generation

- **Purpose:** Process a large set of items and retrieve a relevant subset for the later ranking and filtering steps
- **Method:** Use the two-tower model to find similar items in the vector space
- **Scale:** From millions of items down to hundreds or thousands of candidates

#### Stage 2: Filtering

- **Purpose:** Apply filters to remove unneeded items before ranking
- **Types of filters:**
  - **Business filters:** Remove out-of-stock products and those that violate policy
  - **User filters:** Remove products the user has already bought or recently viewed
  - **Diversity filters:** Ensure the recommendation list is varied in product type

#### Stage 3: Ranking

- **Purpose:** Assign a score to each "candidate item, customer" pair based on relevance
- **Method:** Use a more complex ranking model to compute accurate scores
- **Input:** The customer embedding vector and the item embedding vector
- **Output:** A relevance score

#### Stage 4: Re-ranking

- **Purpose:** Order the items based on the ranking score and other business logic
- **Influencing factors:**
  - The score from the ranking model
  - Business logic (prioritize new and best-selling products)
  - Diversification (avoid too many products of the same type)
  - Balance between exploration and exploitation

### Applying It to the H&M Case

#### Data

- Uses the "H&M Personalized Fashion Recommendations" dataset
- Includes information on:
  - **Customers:** Demographics, shopping behavior
  - **Items:** Product information, category, images
  - **Transactions:** Purchase history, views, interactions

#### Model

- Applies the two-tower model to create embeddings for customers and items
- Trains the model on historical data to learn interaction patterns

#### Deployment

- Uses the 4-stage architecture to deliver real-time personalized recommendations
- Optimized to handle millions of items and millions of users

### Conclusion

The TikTok-like recommender uses a two-tower model and a 4-stage architecture to deliver effective personalized recommendations at scale. This architecture lets the system handle millions of items and provide relevant recommendations for each user in real time.

---

## Building a Recommender with Generative AI for Marketing

### Customer Story

The largest electricity, gas, and home appliance business group in Kansai, Japan, wanted to build an intelligent recommendation system similar to e-commerce platforms such as TikTok, Shopee, and Amazon.

#### System requirements

- **Real-time recommendations:** Recommend in real time to improve the user experience
- **Support for unregistered users:** Users without an account can also use it
- **No infrastructure concerns:** The customer doesn't want to worry about or manage application infrastructure and source code
- **Business focus:** Focus only on sales strategy
- **Scalability:** The system can scale up and down flexibly during big sale events and new product releases

### System Overview

#### Infrastructure

- **Platform:** Deployed on AWS
- **Architecture:** Multi-region, multi-AZ (Multi-Availability Zone)
- **Management:** Uses ControlTower to manage enterprise accounts

#### Front-end

- **Technology:** ReactJS to build the web/app UI
- **Integration:** Amazon Amplify to manage authentication, hosting, and other front-end services

#### Back-end

- **Technology:** Java Spring for the API logic
- **Containerization:** Build images and push them to ECR (Elastic Container Registry)
- **Deployment:** Deploy with ECS Fargate (serverless container platform)
- **Auto-scaling:** Auto scaling based on CPU metrics, end to end

#### Data/Machine Learning

- **Recommendation Engine:** AWS Personalize
- **Data Processing:** AWS DataBrew (visual data preparation tool)

### Machine Learning Solution Workflow (5 Steps)

#### Step 1: Gathering data (data collection)

The system splits data into 3 main datasets:

##### UserEvent/Interactions (user interaction data)

- **Role:** Extremely important for sales, especially in e-commerce
- **Content:** Collects user interaction data:
  - Product views
  - Product clicks
  - Product purchases
  - Add to cart
  - Other interaction behaviors
- **Collection flow:**
  1. A JavaScript "Click Stream Events" library on the web/app collects the data
  2. Data is sent up through API Gateway
  3. Fed into Kinesis Data Streams (real-time streaming)
  4. Kinesis Data Firehose (batch processing and delivery)
  5. Finally stored on S3

##### Item metadata (product metadata)

- **Content:** Detailed product information:
  - Product name
  - Description
  - Price
  - Category
  - Images
  - Other attributes
- **Source:** Exported from the RDS database as a CSV file

##### User metadata

- **Content:** Users' personal information:
  - Name
  - Age
  - Email
  - Location
  - Other demographic information
- **Source:** Exported from the RDS database as a CSV file

#### Step 2: Data pre-processing

##### AWS DataBrew

- **Description:** A visual data preparation tool, no code required
- **Features:** More than 250 pre-built transformations
- **Functions:**
  - Perform ETL (Extract, Transform, Load) on the data
  - Remove empty values
  - Remove duplicates
  - Reformat data (convert types: string -> int, long, etc.)
- **Benefit:** Quick and lightweight, no Python code needed

##### Analysis and reporting

- Analyze the data and build charts from the figures
- Export PDFs and share the data with stakeholders for review

##### Data storage

- **Location:** Datasets are stored multi-region on AWS S3
- **Security:**
  - S3 versioning enabled (keeps versions of files)
  - KMS (Key Management Service) encrypts the data following AWS best practices
- **Cost optimization:** S3 lifecycle integrated to save cost (moves to cheaper storage classes after some time)

#### Step 3: Model building and training with AWS Personalize

After datasets are imported into Personalize, Amazon Personalize provides recipes, which are pre-designed algorithms for solving user use cases.

The system uses 4 built-in algorithms, corresponding to 4 models for the different use cases:

##### USER_PERSONALIZATION

- **Purpose:** Recommend products/services to a user from the product catalog
- **Application:** Used on the homepage to personalize the user experience
- **Example:** When a user logs in for the 2nd or 3rd time, the homepage prioritizes products that match the user's preferences based on their previous interaction history
- **Algorithm:** HRNN (Hierarchical Recurrent Neural Network)
  - Designed to process time-ordered user history data
  - Uses Recurrent Neural Networks (RNNs)
  - Predicts user behavior from the preceding sequence of interactions

##### RELATED_ITEM

- **Purpose:** Suggest products similar to the one being viewed
- **Application:** Applied on the detail page (product detail page)
- **Example:** If a customer often buys electric stoves, the system recommends new electric stoves, gas stoves, and other similar items the user hasn't viewed
- **Algorithm:** Cosine Similarity
  - A popular method for measuring similarity between two vectors
  - Vectors typically represent items based on their features
  - Cosine Similarity is a value from -1 (completely dissimilar) to 1 (completely similar), with 0 indicating independence

##### PERSONALIZED_RANKING

- **Purpose:** Rank the list of recommended products for a user when they search for any product
- **Basis:** Based on ratings/interactions
- **Example:** When a user searches for an electric stove, the system ranks the search results by how well they match the user's preferences and behavior

##### USER_SEGMENTATION

- **Purpose:** Segment customers based on their characteristics
- **Basis for segmentation:**
  - Demographic characteristics
  - Purchasing behavior
  - Customer psychology
- **Algorithm:** kNN (k-Nearest Neighbors)
- **Application:** Used in marketing strategy to target the right audience

#### Step 4: Model Evaluation and Deployment

##### Model evaluation

The system uses 2 evaluation methods:

**Part 1:** Automatic evaluation with metrics

- **F1 Score:** Reached the maximum (1.000)
- **Meaning:** The model achieved the maximum for both precision and recall (1.000)
- Precision: Accuracy of the recommendations (the share of correct recommendations)
- Recall: Coverage (the share of relevant products that were recommended)

**Part 2:** Evaluation with a test case suite

- More than 300 test cases defined by the customer
- Manual test runs (run by hand) to ensure quality

##### Deploy model

- **Platform:** After the model is deployed on an AWS SageMaker Endpoint
- **Access:** Users/applications can invoke the API endpoint to get results
- **Architecture:**
  - Client -> API Gateway
  - Lambda is used to invoke the SageMaker Endpoint API
  - Returns the recommendation results to the client

#### Step 5: Monitor Model

- **Logging:** Logs are stored on CloudWatch
- **Visualization:** Logs are sent from CloudWatch to Grafana hosted on EC2
- **Dashboard:** A dashboard tracks:
  - Model performance metrics
  - API request volume
  - Other key metrics

### Generative AI Integration

After the Generative AI boom of 2023-2024, demand for using GenAI in the advertising and marketing industry has grown steadily.

#### Goal

Automatically generate ad copy based on:

- Product images from the database
- Product/service information
- The target audience of the advertising campaign (already processed and collected in USER_SEGMENTATION - customer segmentation)

#### GenAI integration flow

##### Step 1: The user provides input data

- **Product image:** Choose the product image to advertise; the images are stored in S3
- **Ad service type:** Choose the type of service:
  - Mail Marketing
  - SMS
  - Web Content
  - Post SNS (Social Network Service)
  - Others
- **Target audience:** Choose a user group segmented by Amazon Personalize

##### Step 2: Data handling through AWS AppSync

- **AWS AppSync:** Makes it easy to build GraphQL APIs without managing infrastructure
- **WebSocket Subscription:** The user's input is sent to the system through AWS AppSync over a websocket subscription connection
- **Real-time Updates:** Lets results update in real time as the data is processed

##### Step 3: Image processing with Amazon Rekognition

- **Amazon Rekognition:** AWS's service for analyzing objects, scenes, and context in images
- **Analysis functions:**
  - **Image labels:** Labels identifying the objects and scenes in the image
  - **Dominant colors:** The dominant colors in the image
- **Purpose:** Helps the system understand the content of the image (e.g., the image has flowers, a jogger, food, etc.) and use that information to create **accurate** and **meaningful** ad content

##### Step 4: Generate ad copy with Amazon Bedrock

- **Amazon Bedrock:** AWS's platform for running AI language models
- **LLM Model:** Uses Titan Image Generator G1 v2
- **Flow:**
  1. Receive the image analysis data from Rekognition
  2. Combine it with the product/service information
  3. Combine it with the target audience
  4. Build a prompt for the language model (LLM)
  5. Amazon Bedrock generates the ad content automatically from the prompt

##### Step 5: Publish the result

- **Send to the user:** The generated ad content is sent back to the user through AWS AppSync
- **Storage:** Save the content in the campaign system for advertising

#### Extended feature: Switch Models

- **Concept:** Freely switch between leading models from OpenAI, IBM, AWS, etc.
- **Principle:** The higher the model's price, the better the quality of its output
- **Benefits:**
  - Each model was trained on its own data
  - Each model has its own way of "expressing itself"
  - Groundbreaking and interesting
  - Flexible in choosing the model that fits each use case

### Benefits and Effectiveness of the GenAI System

#### Process automation

- **Before:** Text-only content
- **Now:** The system generates ad content that includes:
  - Images
  - Text
  - Matching colors
- **Result:** More accurate and relevant ad content

#### Cost and time optimization

##### Traditional process

- **People required:**
  - Designer
  - Copywriter
  - Marketing team
- **Time:** At least 1 week for the stages of:
  - Ideation
  - Design
  - Development
  - Review
- **Result:** 1 PR post/video about a new product

##### Process with GenAI

- **Time:** Only about 1 day
- **Result:** Can produce as many as 100 product PR posts/videos
- **Note:** Use more, pay more
- **Benefits:**
  - If something isn't suitable, it can be downloaded and customized
  - No fear of copyright infringement

##### Cost comparison

- **Traditional cost:** Paying a designer/copywriter/marketing team certainly costs more than paying AWS
- **GenAI cost:** Pay only for the AWS services used
- **Benefit:** If a campaign has hundreds of products, release time is much faster while still **"ensuring quality"** (if modern, state-of-the-art models are used)

#### Revenue growth

After applying ML solutions to:

- Product recommendation
- User segmentation strategy for the marketing market

**Result:** Revenue grew nearly **230%** over the previous year.

### Conclusion

A solution that builds an intelligent product recommender and integrates generative AI into advertising and marketing brings many benefits:

1. **Personalized experience:** The system can recommend in real time, including for unregistered users
2. **Automation:** Reduces manual work and speeds up content development
3. **Cost optimization:** Reduces labor cost and development time
4. **Revenue growth:** Significant growth thanks to personalization and automation
5. **Scalability:** The system can scale up and down flexibly with demand

This is a comprehensive solution, from data collection and processing to model building and generative AI integration, aimed at improving the user experience and optimizing business strategy.

---

## Comparing the Two Approaches

### Similarities

- Both use deep learning models to create embeddings for users and products
- Both apply a multi-stage architecture to optimize performance
- Both aim to personalize the user experience

### Differences

| Criterion                     | TikTok-like Recommender        | AWS Personalize with GenAI                            |
| ----------------------------- | ------------------------------ | ----------------------------------------------------- |
| **Platform**                  | Custom implementation          | AWS managed services                                  |
| **Model**                     | Two-tower model (custom)       | Multiple recipes (HRNN, Cosine Similarity, kNN)       |
| **GenAI integration**         | None                           | Yes (Amazon Bedrock + Rekognition)                    |
| **Infrastructure management** | Self-managed                   | Fully managed                                         |
| **Scalability**               | Needs manual configuration     | Auto-scaling built in                                 |
| **Use case**                  | E-commerce fashion (H&M)       | E-commerce + Marketing (electricity, gas, appliances) |
| **Complexity**                | High (needs deep ML knowledge) | Low (uses managed services)                           |

### When to use which approach?

#### TikTok-like Recommender (Custom)

- When you need full control over the model and algorithms
- When you have a professional ML team
- When you need deep customization of the model architecture
- When you want to optimize cost at very large scale (after the initial investment)

#### AWS Personalize with GenAI

- When you want to focus on business logic rather than infrastructure
- When you need to deploy quickly
- When you want built-in integration with other AWS services
- When you need GenAI features to create marketing content
- When you want to minimize infrastructure and scaling risk

> **See also:** [TikTok Like Recommender And AWS Personalize](/Technology/AI/Practices/TikTok Like Recommender And AWS Personalize) · [AI Powered AB Testing With Amazon Bedrock](/Technology/AI/Write Ups/AI Powered AB Testing With Amazon Bedrock) · [KNN K Nearest Neighbors](/Technology/AI/Concepts/Core Concepts/KNN K Nearest Neighbors)
