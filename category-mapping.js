// Mapping of prompt titles to new task categories
const categoryMapping = {
  // Environment Setup
  "Set Up Development Environment": "Environment Setup",
  "Set Up New Project Structure": "Environment Setup", 
  "Generate Dev Onboarding Guide": "Environment Setup",
  "Create Team Onboarding Documentation": "Environment Setup",
  "Understand Any Codebase": "Environment Setup",
  "Create Project Context": "Environment Setup",
  "Explore and Understand New Repository": "Environment Setup",
  
  // Database Management  
  "Analyze My Data File": "Database Management",
  
  // Server Configuration
  "Get my IP address": "Server Configuration",
  "Configure System Settings": "Server Configuration",
  
  // Deploy Applications
  "Set Up Cloud Infrastructure": "Deploy Applications",
  "Build Personal Finance Tracker": "Deploy Applications",
  
  // Monitor Systems
  "Set Up Smart Backups": "Monitor Systems",
  "Find Error Patterns in Logs": "Monitor Systems", 
  "Automated Competitor Research": "Monitor Systems",
  
  // Default for non-DevOps prompts
  "default": null
};

module.exports = categoryMapping;