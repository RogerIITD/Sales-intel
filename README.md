# SalesIntel AI — GTM Intelligence Platform ⚡

A proof-of-work web application built for the **Razorpay GTM AI Builder** role. 

This is a single-page interactive dashboard that demonstrates AI-powered Go-To-Market (GTM) capabilities, mapping directly to the responsibilities outlined in the job description.

## 🎯 The Goal

To showcase practical implementation of GTM AI tools that solve real sales and pipeline challenges, without relying on complex backend infrastructure for the demo. Everything runs client-side with simulated AI workflows and synthetic data.

## 🚀 Key Features

This platform includes 6 core features, each mapping to a specific requirement:

| Feature | Description | JD Responsibility Addressed |
|---|---|---|
| **Pipeline Intelligence** | Real-time Kanban dashboard flagging deals that are going cold (e.g., no activity in 14+ days) with visual alerts. | *Build real-time pipeline dashboards that flag deals going cold* |
| **AI Call Summarizer** | Simulates extracting key topics, action items, and sentiment from raw call transcripts. | *Build AI copilots for meeting prep and call summaries* |
| **Deal Forecaster** | Quarterly revenue forecasting visualizations with calculated confidence intervals (Low/Mid/High estimates). | *Develop forecasting models with confidence intervals* |
| **Follow-up Drafter** | Selects a deal and simulates AI generating a context-aware, personalized follow-up email based on recent call notes. | *Design agents to draft follow-up emails from call notes* |
| **Win/Loss Analysis** | Charts showing win rates by segment and AI-detected patterns explaining why deals are won or lost across the pipeline. | *Conduct win/loss analysis to detect patterns in closed deals* |
| **CRM Enrichment** | Interactive toggle showing "before" (sparse) vs. "after" (enriched) CRM data, demonstrating LLM-powered data filling. | *Create LLM pipelines to enrich CRM data automatically* |

## 🛠️ Technology Stack

- **HTML5**: Semantic structure for the single-page application.
- **Vanilla CSS3**: Premium dark-mode design system utilizing CSS variables, glassmorphism (`backdrop-filter`), and smooth micro-animations. No external CSS frameworks were used.
- **Vanilla JavaScript**: Handles all interactivity, navigation state, data rendering, simulated AI processing delays, and lightweight inline SVG charting.

## 🏃‍♂️ How to Run Locally

No build steps or package managers required. 

1. Clone this repository:
   ```bash
   git clone https://github.com/RogerIITD/Sales-intel.git
   cd Sales-intel
   ```

2. Start a local HTTP server. For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
   *Note: Using a local server is recommended to ensure all local assets load correctly and to avoid CORS issues if you expand on the project.*

3. Open your browser and navigate to:
   ```
   http://localhost:8000/
   ```

## 📸 Overview

The dashboard features a sleek, dark-themed UI with a sidebar for navigation and dynamic content areas that update instantly. The design focuses on a "wow" factor, utilizing gradients, blur effects, and responsive layouts to replicate a premium SaaS product feel.
