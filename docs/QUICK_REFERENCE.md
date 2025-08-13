# Quick Reference: Terminology Changes

## Component Names
- `UseCaseCard` → `PromptCard`
- `UseCaseDetailModal` → `PromptDetailModal`
- `SubmitUseCaseButton` → `SubmitPromptButton`
- `UseCases` page → `Prompts` page

## Routes
- `/use-cases` → `/prompts` (with redirect)

## Common Text Changes
| Where | Old | New |
|-------|-----|-----|
| Page Title | Use Case Library | Prompt Library |
| Hero Section | Featured Use Cases | Featured Prompts |
| Button | Browse All Use Cases | Browse All Prompts |
| Button | Submit Your Use Case | Submit Your Prompt |
| Empty State | No use cases found | No prompts found |
| Counter | X use cases | X prompts |
| Stats Label | Use Cases | Prompts |

## File Changes
- `UseCases.tsx` → `Prompts.tsx`
- `UseCaseCard.tsx` → `PromptCard.tsx`
- `UseCaseDetailModal.tsx` → `PromptDetailModal.tsx`
- `SubmitUseCaseButton.tsx` → `SubmitPromptButton.tsx`
- `USE_CASES_GUIDE.md` → `PROMPTS_GUIDE.md`

## Analytics Functions
- `trackUseCaseView()` → `trackPromptView()`
- `trackUseCaseVote()` → `trackPromptVote()`

## Props in Wizard
- `useCaseTitle` → `promptTitle`
- `useCaseId` → `promptId`

## What Stayed the Same
- Data file: `useCases.json` (for compatibility)
- Internal variable names: `useCase` (for backward compatibility)
- URL structure: `/?i=1` format
- All functionality and features
