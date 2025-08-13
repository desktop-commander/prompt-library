# Rebranding Documentation: Use Cases → Prompts

## Date: August 13, 2025

## Overview
This document details the comprehensive rebranding of the Desktop Commander Use Case Library to the Desktop Commander Prompt Library. All references to "use cases" have been systematically updated to "prompts" throughout the application.

## Why This Change?
- **Better User Understanding**: "Prompts" is more intuitive and immediately understandable for users
- **Industry Alignment**: Aligns with common AI/LLM terminology
- **Clearer Purpose**: Better describes the actual content - prompts that users copy and use with Desktop Commander

## Components Renamed

### React Component Files
| Old Name | New Name | Purpose |
|----------|----------|---------|
| `UseCaseCard.tsx` | `PromptCard.tsx` | Individual prompt display card |
| `UseCaseDetailModal.tsx` | `PromptDetailModal.tsx` | Detailed view modal for prompts |
| `SubmitUseCaseButton.tsx` | `SubmitPromptButton.tsx` | Button to submit new prompts |
| `UseCases.tsx` | `Prompts.tsx` | Main prompts listing page |

### Component Interfaces & Exports
- `UseCaseCardProps` → `PromptCardProps`
- `UseCaseDetailModalProps` → `PromptDetailModalProps`
- `SubmitUseCaseButtonProps` → `SubmitPromptButtonProps`
- `export function UseCaseCard` → `export function PromptCard`
- `export function UseCaseDetailModal` → `export function PromptDetailModal`
- `export function SubmitUseCaseButton` → `export function SubmitPromptButton`

## Routing Changes

### URL Structure
- **Old Route**: `/use-cases`
- **New Route**: `/prompts`
- **Redirect**: Added automatic redirect from `/use-cases` to `/prompts` for backward compatibility

### Navigation Updates
All internal links updated:
- Header navigation
- CTA buttons
- Browse links
- Mobile menu

## UI Text Updates

### Page Titles & Headers
- "Use Case Library" → "Prompt Library"
- "Featured Use Cases" → "Featured Prompts"
- "Discover and share powerful use cases" → "Discover and share powerful prompts"

### Call-to-Action Buttons
- "Browse All Use Cases" → "Browse All Prompts"
- "Submit Your Use Case" → "Submit Your Prompt"
- "View All Use Cases" → "View All Prompts"
- "Explore Use Cases" → "Explore Prompts"

### Feedback Messages
- "No use cases found" → "No prompts found"
- "Showing X of Y use cases" → "Showing X of Y prompts"
- "Hot use case" → "Hot prompt"

### Statistics Label
- "Use Cases" counter → "Prompts" counter

## Documentation Files Updated

### File Renames
- `USE_CASES_GUIDE.md` → `PROMPTS_GUIDE.md`

### Content Updates in Documentation
1. **PROMPTS_GUIDE.md**
   - All references to "use cases" replaced with "prompts"
   - Instructions updated for managing prompts

2. **ID_MANAGEMENT.md**
   - Updated to reference "Prompt ID Management System"
   - All examples use "prompt" terminology

3. **SYNC_README.md**
   - Now titled "Prompts Sync Guide"
   - References updated Excel file as "Prompt library.xlsx"
   - All sync instructions use "prompt" terminology

4. **WIZARD_IMPLEMENTATION.md**
   - References updated to "Prompt Library"
   - User flow descriptions use "prompt" terminology

## Code Updates

### Analytics Functions
```typescript
// Old
export const trackUseCaseView = (useCaseId: string, title: string)
export const trackUseCaseVote = (useCaseId: string, title: string)

// New
export const trackPromptView = (promptId: string, title: string)
export const trackPromptVote = (promptId: string, title: string)
```

### Analytics Events
- Event category changed from "Use Case Library" to "Prompt Library"
- Parameter names updated: `use_case_id` → `prompt_id`
- Wizard tracking updated: `use_case` → `prompt`

### Component Props
In UsePromptWizard:
- `useCaseTitle` → `promptTitle`
- `useCaseId` → `promptId`

### Comments & Documentation
All code comments updated to use "prompt" terminology:
- "// Featured prompts: specific curated list"
- "// Find these specific prompts"
- "// Set fire emoji for first two prompts"
- "// Determine which prompts to display"

## Data Structure Notes

### Intentionally Preserved
The following were NOT changed to maintain backward compatibility:
- **File name**: `useCases.json` (kept for data continuity)
- **Variable names**: Internal `useCase` variables in components
- **JSON structure**: The data structure remains unchanged
- **API compatibility**: Ensures existing integrations continue to work

### Metadata Updates
- `totalUseCases` → `totalPrompts` in JSON metadata
- Notes in `id_mapping.json` updated to reference prompts

## HTML & SEO Updates

### Meta Tags
```html
<title>Desktop Commander Prompt Library</title>
<meta name="description" content="Discover powerful AI workflows and automation prompts for Desktop Commander...">
<meta property="og:title" content="Desktop Commander Prompt Library">
```

## Import Path Updates

All import statements updated throughout the application:
```typescript
// Examples of updated imports
import { PromptCard } from '@/components/PromptCard';
import { PromptDetailModal } from '@/components/PromptDetailModal';
import { SubmitPromptButton } from '@/components/SubmitPromptButton';
import Prompts from "./pages/Prompts";
```

## Testing & Verification

### Build Status
✅ Application builds successfully with no errors
✅ All components properly renamed
✅ All imports correctly updated
✅ No TypeScript errors

### Functionality Preserved
✅ Search and filter functionality works
✅ Modal displays correctly
✅ Wizard flow unchanged
✅ Analytics tracking operational
✅ URL parameters preserved (`/?i=1` structure)
✅ Vote functionality works
✅ Share functionality intact

## Backward Compatibility

### URL Redirects
- Old URLs automatically redirect to new structure
- Bookmarks and shared links continue to work

### Data Structure
- Internal data structure unchanged
- Existing database/JSON files compatible
- No data migration required

## Implementation Checklist

✅ Component files renamed
✅ Component exports updated
✅ Import statements updated
✅ Route structure changed
✅ Navigation links updated
✅ UI text updated throughout
✅ Documentation files updated
✅ Analytics functions renamed
✅ HTML meta tags updated
✅ Build tested successfully
✅ Backward compatibility ensured

## Future Considerations

### Potential Follow-ups
1. Update Excel sync script to use "prompts" terminology
2. Consider renaming `useCases.json` to `prompts.json` (requires migration)
3. Update any external documentation or marketing materials
4. Notify users of the terminology change

### Not Changed (Intentionally)
- Internal data structure (for compatibility)
- File `useCases.json` (to preserve data)
- Database schema (if applicable)
- API endpoints (if applicable)

## Summary
The rebranding from "Use Case Library" to "Prompt Library" has been successfully completed. The application now consistently uses "prompt" terminology throughout the user interface while maintaining backward compatibility and preserving all functionality. Users will experience a more intuitive and industry-aligned interface while all existing links and data continue to work seamlessly.
