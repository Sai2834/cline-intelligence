# Cline Intelligence

# A CLI agent for automating code analysis, configuration, and security reviews.

Submitted for the  "AI Agents Assemble Hackathon" (Infinity Build & Captain Code Tracks).

## About the Project
Cline Intelligence bridges the gap between local development and cloud-based AI reviews. Instead of manually configuring CI/CD pipelines or running security checks, this CLI tool automates the process using a local agent.
It analyzes your project structure, generates necessary configurations, and performs a pre-push security scan.

## Hackathon Tracks & Tech Stack

### 1. Infinity Build Award ($5,000)
This project uses the **Cline CLI** ecosystem.
* **Integration:** The tool acts as a wrapper around the Cline CLI commands.
* **Windows Support:** Since the official Cline CLI is in preview for macOS/Linux, this project includes a custom `src/agent.js` adapter. This adapter allows the agent workflow to run on Windows by falling back to a custom OpenRouter/Gemini implementation when the official binary is missing.

### 2. Captain Code Award ($1,000)
This project integrates **CodeRabbit** for automated code reviews.
* **Auto-Config:** The `configure` command generates a production-ready `coderabbit.yaml` file based on the project type.
* **Workflow:** Local changes are validated by the CLI agent before being pushed to GitHub, where the CodeRabbit App performs the final deep-dive review.

## Architecture

```mermaid
graph TD
    User[Developer] -->|Runs Command| CLI[Cline Intelligence CLI]
    
    subgraph "Local Environment"
        CLI -->|Step 1: Scans| Files[Local Codebase]
        CLI -->|Step 2: Generates| Config[coderabbit.yaml]
        
        CLI -->|Step 3: Review Request| AgentRouter{OS Check}
        AgentRouter -->|Mac/Linux| ClineTool[Official Cline CLI]
        AgentRouter -->|Windows Fallback| HybridAdapter[Hybrid AI Adapter]
    end
    
    subgraph "Cloud Environment"
        GitPush[Git Push] --> GitHub[GitHub Repository]
        GitHub -->|Trigger| CodeRabbit[CodeRabbit AI Reviewer]
        Config -.->|Configures| CodeRabbit
    end

# Installation

# Clone the repository
git clone [https://github.com/YOUR_USERNAME/cline-intelligence.git](https://github.com/YOUR_USERNAME/cline-intelligence.git)
cd cline-intelligence

# Install dependencies
npm install

# Link the CLI tool globally
npm link

Usage
# Analyze Codebase
Scans the current directory to understand project structure and size.
[cline-intelligence analyze](command)

# Generate Configuration
Creates the coderabbit.yaml file automatically.
cline-intelligence configure

# Run Security Review
Runs the local agent to check for security flaws (hardcoded secrets, error handling).
# Standard mode
[cline-intelligence review](command)

# Shakespearean mode (for fun)
[cline-intelligence review --tone shakespeare](command)

Demo & Windows Compatibility
To ensure a stable demonstration on Windows (where the official Cline CLI is unavailable), this tool uses a Hybrid Adapter.
Simulation Mode: We are using free-tier AI models for this hackathon demo. To prevent API timeouts or rate-limiting from disrupting the video demonstration, the adapter includes a fallback mechanism. If the API is unresponsive, it returns a pre-validated response to demonstrate the intended workflow layout.


---

