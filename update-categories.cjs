const fs = require('fs');
const path = require('path');

// Load the category mapping
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
  
  // Deploy Applications
  "Set Up Cloud Infrastructure": "Deploy Applications",
  "Build Personal Finance Tracker": "Deploy Applications",
  
  // Monitor Systems  
  "Set Up Smart Backups": "Monitor Systems",
  "Find Error Patterns in Logs": "Monitor Systems",
  "Automated Competitor Research": "Monitor Systems"
};

// Load current data
const dataPath = path.join(__dirname, 'src/data/useCases.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Add taskCategory field to each use case
data.useCases.forEach(useCase => {
  const taskCategory = categoryMapping[useCase.title] || null;
  useCase.taskCategory = taskCategory;
  
  if (taskCategory) {
    console.log(`✅ ${useCase.title} → ${taskCategory}`);
  } else {
    console.log(`⚪ ${useCase.title} → No category (general prompt)`);
  }
});

// Write updated data back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('\n✅ Successfully updated useCases.json with taskCategory field');

// Show summary
const categoryCounts = {};
data.useCases.forEach(uc => {
  const cat = uc.taskCategory || 'No Category';
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
});

console.log('\n📊 Category distribution:');
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} prompts`);
});