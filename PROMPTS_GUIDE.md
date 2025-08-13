# Prompts Data Management Guide

## File Location
`src/data/useCases.json`

## How to Update Prompts

### Adding New Prompts
Provide new prompts in this format:

```json
{
  "id": "12",
  "title": "Your Prompt Title",
  "description": "Brief description of what this does",
  "prompt": "The full prompt users will copy and use with DC",
  "difficulty": "Simple|Medium|Complex",
  "targetRoles": ["Developers", "Vibe coders", "Professionals"],
  "category": "Development|Data Analytics|File Management|etc",
  "votes": 0,
  "icon": "Code",
  "tags": ["tag1", "tag2", "tag3"],
  "author": "User name or Internal",
  "dateAdded": "2024-01-20",
  "verified": false
}
```

### Available Categories
- Code base exploration
- Development
- Data Analytics
- DevOps
- File Management
- Code optimization
- Content
- Automation
- Documentation
- System architecture

### Available Target Roles
- Developers
- Vibe coders
- Content makers
- Data analysts
- Professionals

### Available Icons (from Lucide React)
- FolderSearch
- Code
- BarChart3
- Settings
- FolderOrganize
- Trash2
- DollarSign
- Component
- Pipeline
- Database
- Mail
- FileText
- Terminal
- Zap
- Shield
- GitBranch
- Package
- Globe
- Layers

### Providing Updates to Me

#### Option 1: Excel/CSV Format
You can provide prompts in Excel with these columns:
- id
- title
- description
- prompt
- difficulty
- targetRoles (comma-separated)
- category
- votes
- tags (comma-separated)
- author
- dateAdded
- verified

#### Option 2: Plain Text Format
```
Title: [Prompt title]
Description: [Brief description]
Prompt: [Full prompt]
Difficulty: Simple/Medium/Complex
Roles: Developers, Vibe coders
Category: Development
Tags: tag1, tag2, tag3
Author: Internal
Votes: 150
```

#### Option 3: Direct JSON
Just paste the JSON objects and I'll add them to the file.

### Updating Existing Prompts

To update votes or other properties, just tell me:
- "Update prompt ID 3: set votes to 250"
- "Mark prompt ID 5 as verified"
- "Change difficulty of prompt ID 7 to Complex"

### Bulk Updates
You can provide a spreadsheet or list of updates like:
```
ID 1: votes = 200
ID 2: votes = 350, verified = true
ID 3: votes = 180
```

## Notes
- IDs should be unique strings (can be numbers or UUIDs)
- Dates should be in YYYY-MM-DD format
- Verified flag indicates manually reviewed/approved prompts
- Icons must match Lucide React icon names
