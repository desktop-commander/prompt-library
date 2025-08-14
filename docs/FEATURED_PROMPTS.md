# Featured Prompts Documentation

## Default Featured Prompts (Current)

These are the 9 prompts that show when no role filter is selected - our curated "best of" selection:

1. **Explore and Understand New Repository** (ID: 1) - Developers, Simple
2. **Organise my Downloads folder** (ID: 8) - Multiple roles, Simple  
3. **Build Complete Feature from Scratch** (ID: 2) - Developers + Vibe Coders, Medium
4. **Analyze My Data File** (ID: 3) - Professionals + Data analysts, Simple
5. **Set Up Development Environment** (ID: 4) - Developers, Medium
6. **Understand React Component Architecture** (ID: 6) - Developers, Simple
7. **Clean Up Unused Code** (ID: 5) - Developers + Vibe Coders, Simple
8. **Build Personal Finance Tracker** (ID: 9) - Vibe Coders, Medium
9. **Automated Competitor Research** (ID: 11) - Content makers + Professionals, Complex

## Target Roles Analysis

Based on the prompt library analysis:

- **Developers**: 35 prompts (largest group)
- **Professionals**: 17 prompts
- **Data analysts**: 15 prompts  
- **Content makers**: 15 prompts
- **Vibe Coders**: 11 prompts

All roles have sufficient prompts to show meaningful filtered results.

## Filter Implementation

### "For all" Filter (Default)
- Shows the 9 manually curated featured prompts in fixed order
- Fire emojis appear on first two prompts
- Maintains editorial control over featured content

### Role-Specific Filters (Developers, Vibe Coders, etc.)
- Filter the entire library (50 prompts) by target role
- **Sort by usage popularity** (`gaClicks` field) in descending order
- **Tie-breaker**: Alphabetical by title if usage counts are equal
- Show top 9 most-used prompts for that role
- No fire emojis (data-driven, not curated)
- If fewer than 9 matches, show all available

### Usage Tracking
- **Field**: `gaClicks` in prompt data (manually updated)
- **Purpose**: Track real user engagement to surface most valuable prompts
- **Update Process**: Manual updates to reflect actual usage patterns
- **Impact**: Role-filtered prompts are sorted by popularity, ensuring users see the most proven/valuable prompts first

### Browse All Integration
- "Browse All" button will link to /prompts with the role filter pre-applied
