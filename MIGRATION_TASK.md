# Style Scout: Major Prompts Migration - Task Documentation

**Date**: December 2024  
**Status**: Ready to Execute  
**Estimated Duration**: 1-2 hours  

## 📋 **Task Overview**

Complete migration of all prompts from new Excel data to JSON format, replacing the existing 53 prompts with 69 updated prompts while preserving critical functionality.

## 🎯 **Initial User Request**

> "I will need your help with major update of all prompts in JSON file that we have. I have changed almost all prompts, added new session types and categories and put them in a new excel: '/Users/ricardskrizanovskis/Downloads/Use case library - Sheet1 (1).csv'"

## 📊 **Source Data Analysis**

**New CSV File**: `/Users/ricardskrizanovskis/Downloads/Use case library - Sheet1 (1).csv`
- **Total prompts**: 69 (vs current 53)
- **Columns**: 12 fields including Title, Difficulty, Category, Prompt, etc.
- **Session Types**: "Instant output" (45), "Step-by-step flow" (24)
- **Categories**: 10 categories, many prompts have multiple categories
- **Target Roles**: 6 roles including new ones (Content makers, DevOps)

## 🎯 **User Decisions & Preferences**

1. **Session Type UI Update**: ✅ Update UI to match new lowercase format
   - "Instant Output" → "Instant output"  
   - "Step-by-Step Flow" → "Step-by-step flow"

2. **Icons**: ✅ Assign random icons from existing set

3. **ID Preservation**: ✅ Keep existing IDs where possible
   - 37 exact matches → preserve IDs
   - 4 similar matches → review and preserve if appropriate
   - 28 new prompts → generate new sequential IDs

4. **Vote Counts**: ✅ "Prompt uses (GA)" → both `votes` and `gaClicks`

5. **Author Field**: ✅ "Status" column → `author` field

6. **Date Added**: ✅ Remove field (not needed anymore)

## 🔄 **Field Mapping Strategy**

### CSV → JSON Mapping:
```
CSV Column              → JSON Field
-----------------------------------------
Title                   → title
Description             → description  
Prompt                  → prompt
Difficulty              → sessionType (with case conversion)
Target roles            → targetRoles (split by comma, clean)
Category                → categories (split by comma, clean)
Prompt uses (GA)        → votes & gaClicks
Status                  → author
Verified                → verified (boolean conversion)
[Generated]             → id (preserve where possible)
[Random]                → icon (from existing set)
[Removed]               → dateAdded (field no longer used)
[Removed]               → taskCategory (field no longer used)
```

## 🔍 **ID Preservation Analysis Results**

- **✅ Exact Matches**: 37 prompts can keep existing IDs
- **🔄 Similar Matches**: 4 prompts need manual review
- **🆕 New Prompts**: 28 prompts need new IDs
- **💥 Removed**: Some existing prompts not in new data

### Similar Matches for Review:
1. "Build A Feature from Scratch" ↔ "Build Complete Feature from Scratch" (85.7% similar)
2. "Explain React Component Architecture" ↔ "Understand React Component Architecture" (85.3% similar)  
3. "Automate Competitor Research" ↔ "Automated Competitor Research" (98.2% similar)
4. "Set Up Local Development Environment" ↔ "Set Up Development Environment" (90.9% similar)

## 🛠️ **Implementation Steps**

### Phase 1: Preparation
1. ✅ Backup current `useCases.json`
2. ✅ Read and validate CSV data
3. ✅ Generate available icon list
4. ✅ Create ID mapping strategy

### Phase 2: Data Processing
1. 🔄 Process CSV data with pandas
2. 🔄 Handle multi-value fields (categories, roles)
3. 🔄 Normalize session types to new format
4. 🔄 Assign icons randomly to new prompts
5. 🔄 Generate new IDs for new prompts

### Phase 3: ID Preservation
1. 🔄 Map exact matches to preserve IDs
2. 🔄 Review similar matches (manual decision)
3. 🔄 Generate new sequential IDs for new prompts
4. 🔄 Create migration report

### Phase 4: JSON Generation
1. 🔄 Convert processed data to JSON structure
2. 🔄 Validate all required fields present
3. 🔄 Ensure proper data types
4. 🔄 Write new `useCases.json`

### Phase 5: UI Updates
1. 🔄 Update session type display logic
2. 🔄 Update `sessionTypeExplanations`
3. 🔄 Update any hardcoded references
4. 🔄 Test both pages (homepage & prompts)

### Phase 6: Validation
1. 🔄 Test server startup
2. 🔄 Test filtering functionality
3. 🔄 Test preserved URLs work
4. 🔄 Generate final migration report

## 📝 **Files to Modify**

1. **`src/data/useCases.json`** - Main data file
2. **`src/data/useCases.ts`** - Session type explanations, categories extraction
3. **`src/pages/Index.tsx`** - Session type display logic (homepage)
4. **`src/components/PromptCard.tsx`** - Session type display logic (prompts page)

## ⚠️ **Risk Mitigation**

- **Backup Strategy**: Create timestamped backup before changes
- **Rollback Plan**: Keep current data file as `.backup`
- **Validation**: Multiple verification steps before deployment
- **Testing**: Test all critical functionality after migration

## 📊 **Success Criteria**

- ✅ All 69 prompts successfully imported
- ✅ 37+ preserved IDs work correctly  
- ✅ Session types display correctly on both pages
- ✅ All filtering functionality works
- ✅ No console errors or broken functionality
- ✅ Migration report shows successful data transfer

## 🔗 **Session Continuity**

This document allows resuming work at any point. Key files and decisions are documented for reference if the session is interrupted.

---
**Ready to Execute**: All decisions made, strategy documented, ready for implementation.
