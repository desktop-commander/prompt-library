# Card Rendering Architecture - Developer Guide

## ⚠️ **CRITICAL: Two Different Card Systems**

Style Scout uses **TWO SEPARATE** card rendering approaches. Changes to card appearance must be made in **BOTH** places.

## 🏠 **Homepage Cards** (`src/pages/Index.tsx`)

**Location**: Lines ~390-420  
**Component**: **INLINE JSX** (does NOT use PromptCard component)  
**Route**: `/` (homepage)

### Key Functions:
```typescript
// Line ~25 in Index.tsx
const getCardSessionTypeDisplay = (sessionType: string) => {
  switch (sessionType) {
    case 'Instant Output': return { text: 'Instant', icon: Zap };
    case 'Step-by-Step Flow': return { text: 'Step-by-Step', icon: null };
    default: return { text: sessionType, icon: null };
  }
};
```

### Badge Rendering:
```jsx
// Line ~405 in Index.tsx  
<Badge variant="outline" className="...">
  <div className="flex items-center gap-1">
    {(() => {
      const display = getCardSessionTypeDisplay(useCase.sessionType);
      return (
        <>
          {display.icon && <display.icon className="h-3 w-3" />}
          <span>{display.text}</span>
        </>
      );
    })()}
  </div>
</Badge>
```

## 📚 **Prompts Page Cards** (`src/components/PromptCard.tsx`)

**Location**: `src/components/PromptCard.tsx`  
**Component**: `<PromptCard>` React component  
**Route**: `/prompts` (main library page)  
**Used in**: `src/pages/Prompts.tsx` (line ~220)

### Key Functions:
```typescript  
// Line ~67 in PromptCard.tsx (DUPLICATE of Index.tsx logic)
const getCardSessionTypeDisplay = (sessionType: string) => {
  switch (sessionType) {
    case 'Instant Output': return { text: 'Instant', icon: Zap };
    case 'Step-by-Step Flow': return { text: 'Step-by-Step', icon: null };
    default: return { text: sessionType, icon: null };
  }
};
```

## 🔧 **Making Changes**

### Session Type Display Changes:
1. **Update Index.tsx** (homepage cards) - line ~25
2. **Update PromptCard.tsx** (prompts page cards) - line ~67
3. **Both must match exactly**

### Card Layout Changes:
1. **Homepage**: Modify inline JSX in Index.tsx (~line 405)
2. **Prompts Page**: Modify PromptCard.tsx component

### Import Requirements:
Both files need these imports for session type icons:
```typescript
import { Zap } from 'lucide-react'; // For lightning icon
```

## 🚫 **Common Mistakes**

❌ **Only updating PromptCard.tsx** - Homepage won't reflect changes  
❌ **Only updating Index.tsx** - Prompts page won't reflect changes  
❌ **Assuming PromptCard is used everywhere** - Homepage uses inline rendering

## ✅ **Quick Checklist**

When changing card appearance:
- [ ] Updated `src/pages/Index.tsx` (homepage cards)
- [ ] Updated `src/components/PromptCard.tsx` (prompts page cards) 
- [ ] Tested both `/` and `/prompts` routes
- [ ] Session type badges match on both pages

## 🎯 **Why Two Systems?**

- **Homepage**: Needs custom layout and featured prompt logic
- **Prompts Page**: Needs reusable component for grid display
- **Future**: Could be consolidated with shared utility function

## 📍 **Quick Navigation**

- **Homepage cards**: `src/pages/Index.tsx` line ~390
- **Prompts page cards**: `src/components/PromptCard.tsx`  
- **Prompts page usage**: `src/pages/Prompts.tsx` line ~220

---
**Last Updated**: December 2024  
**Issue History**: Phase 12 - Session type display changes required updates in both locations
