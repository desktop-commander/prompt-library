# Style Scout - Project Overview & Development Guide

## 🎯 Project Description

Style Scout is a comprehensive prompt library for Desktop Commander, featuring categorized AI prompts with session type classifications, filtering, and interactive features.

## 📁 Project Structure

```
style-scout-dc/
├── src/
│   ├── components/
│   │   ├── PromptCard.tsx           # Individual prompt cards (USED ON /prompts page ONLY)
│   │   ├── PromptDetailModal.tsx    # Modal for prompt details
│   │   ├── FilterControls.tsx       # Session type & category filters
│   │   ├── CategoryFilter.tsx       # Category filtering component
│   │   └── ui/                      # Shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx               # Homepage with INLINE card rendering (NOT using PromptCard)
│   │   └── Prompts.tsx             # Main prompts library page (USES PromptCard component)
│   ├── data/
│   │   ├── useCases.ts             # TypeScript interfaces & exports
│   │   └── useCases.json           # Prompt data (69 prompts - Updated Sept 2025)
│   └── index.css                   # Global styles including session type classes
├── public/                         # Static assets
└── docs/                          # Built files for deployment
```

## 🔧 Technical Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Analytics**: PostHog
- **Routing**: React Router

## 💾 Data Structure

### Session Types (Updated September 2025)
```typescript
type SessionType = 'Instant output' | 'Step-by-step flow'  // Updated to lowercase
```

### UseCase Interface
```typescript
interface UseCase {
  id: string;
  title: string;
  description: string;
  prompt: string;
  categories: string[];  // Updated: Multiple categories support
  sessionType: 'Instant output' | 'Step-by-step flow';  // Updated: Lowercase format
  targetRoles: string[];
  author: string;
  votes: number;
  gaClicks: number;      // Added: GA tracking integration
  verified: boolean;
  dateAdded: string;     // Deprecated: No longer displayed in UI
  icon: string;
  taskCategory?: string;  // Optional: DevOps task categorization
}
```

## ⚠️ **IMPORTANT: Card Rendering Architecture**

Style Scout uses **TWO DIFFERENT** approaches for rendering prompt cards:

### **🏠 Homepage Cards (`src/pages/Index.tsx`):**
- **Rendering**: Custom inline JSX (NOT using PromptCard component)
- **Session Type Logic**: `getCardSessionTypeDisplay()` function defined in Index.tsx
- **Location**: Lines ~390-420 in Index.tsx
- **When to Update**: When changing homepage card appearance or session type display

### **📚 Prompts Page Cards (`src/pages/Prompts.tsx`):**
- **Rendering**: Uses `<PromptCard>` component from `src/components/PromptCard.tsx`
- **Session Type Logic**: `getCardSessionTypeDisplay()` function defined in PromptCard.tsx
- **Location**: PromptCard component imported and used around line 220
- **When to Update**: When changing prompts page card appearance or session type display

### **🔧 Code Duplication Note:**
Both approaches contain similar session type display logic:
```typescript
const getCardSessionTypeDisplay = (sessionType: string) => {
  switch (sessionType) {
    case 'Instant output': return { text: 'Instant', icon: Zap };      // Updated: lowercase
    case 'Step-by-step flow': return { text: 'Step-by-Step', icon: null }; // Updated: lowercase
    default: return { text: sessionType, icon: null };
  }
};
```

**📍 Remember**: Changes to card appearance need to be made in BOTH places!

## 🎯 Featured Categories Architecture

Style Scout uses a sophisticated category system that supports both data-driven categories (automatically extracted from prompts) and custom empty categories (ready for future content).

### **Category Types:**
- **Data Categories** (10): Automatically extracted from existing prompts
- **Custom Categories** (1): Manually defined categories that may not have prompts yet
- **Featured Categories** (5): Curated subset displayed on homepage for best UX

### **Homepage Featured Categories:**
1. **Explore codebase** (10 prompts) - Most popular category
2. **Deploy** (4 prompts) - Essential DevOps workflows  
3. **Write documentation** (5 prompts) - Documentation automation
4. **Automate tasks** (2 prompts) - Task automation workflows
5. **Optimize workflow** (0 prompts) - Empty category ready for growth

### **Architecture Benefits:**
- **Scalable**: Easy to add new categories without breaking existing functionality
- **User-Friendly**: Homepage shows only most relevant categories
- **Future-Proof**: Empty categories create growth opportunities
- **Consistent**: All categories use same filtering logic regardless of content count

## 🎨 Session Type System

### Visual Design
- **Instant output**: Green badges (`session-instant-output`)     // Updated: lowercase
- **Step-by-step flow**: Yellow badges (`session-step-by-step-flow`) // Updated: lowercase

### Display Logic
- **Cards/Homepage**: Show "Step-by-Step" (shortened for space)
- **Modal**: Show full "Step-by-step flow"  // Updated: lowercase
- **Tooltips**: Show full explanatory text

### Tooltip Implementation
- **Homepage/Cards**: Hover tooltips (Radix UI)
- **Modals**: Clickable floating bubble tooltips (custom implementation)

## 🔍 Key Features

### 1. Featured Categories System ✅
- **Homepage Categories**: 5 strategically selected categories for homepage display
- **Featured Categories**: Explore codebase, Deploy, Write documentation, Automate tasks, Optimize workflow
- **Empty Category Support**: Categories can exist without prompts (Optimize workflow ready for future content)
- **Architecture**: Custom categories system combines data-driven + manually defined categories
- **Filtering Logic**: 
  - Empty categories show no results gracefully
  - All categories use consistent OR-based filtering
  - Featured categories replace old DevOps taskCategories system

### 2. Multiple Categories System ✅
- **Structure**: Each prompt supports multiple categories (`categories: string[]`)
- **11 Total Categories**: 10 with prompts + 1 empty category (Optimize workflow)
  - **With Prompts**: Organize files, Explore codebase, Build features and products, Analyze data, Optimize code, Write documentation, Deploy, Automate tasks, Design systems, Create content
  - **Empty Category**: Optimize workflow (infrastructure ready for future prompts)
- **Filtering Logic**: OR-based (show prompts matching ANY selected category)
- **Display Strategy**:
  - **Cards**: Categories hidden for cleaner design
  - **Modals**: Multiple category badges displayed
  - **Homepage**: 5 featured categories as filter buttons
  - **Filtering Page**: Multi-select dropdown with visual feedback

### 3. Session Type Migration ✅
- Migrated from difficulty levels (Easy/Intermediate/Advanced)
- 29 prompts → Instant Output
- 24 prompts → Step-by-Step Flow

### 2. Filtering & Sorting
- Filter by session type
- Filter by category
- Filter by target role
- Sort by various criteria

### 3. Interactive Tooltips
- **Problem**: Radix Dialog + Tooltip conflicts
- **Solution**: Custom clickable floating bubbles in modals
- **Features**: Click outside to close, smooth animations, proper z-index

### 4. Responsive Design
- Optimized for 13" screens and up
- Single-line badge layout
- Mobile-friendly interactions

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Development Server

- **URL**: `http://localhost:8083/` (or next available port)
- **Hot Reload**: Enabled
- **TypeScript**: Strict mode enabled

## 📊 Analytics Integration

PostHog events tracked:
- `prompt_clicked`
- `prompt_modal_opened`  
- `prompt_voted`
- `share_button_clicked`
- `use_prompt_button_clicked`

All events include `prompt_session_type` field for analytics.

## 🎯 Common Development Tasks

### Adding New Prompts
1. Add to `src/data/useCases.json`
2. Ensure proper `sessionType` value
3. Update `useCases.ts` if interface changes

### Styling Session Types
```css
.session-instant-output {
  /* Green styling for Instant Output */
}

.session-step-by-step-flow {
  /* Yellow styling for Step-by-Step Flow */
}
```

### Modal Tooltip Pattern
```typescript
// For modals - use clickable floating bubble
const [showExplainer, setShowExplainer] = useState(false);

<div className="relative inline-block">
  <Badge onClick={() => setShowExplainer(!showExplainer)}>
    {sessionType} <Info />
  </Badge>
  {showExplainer && (
    <div className="absolute floating-bubble">
      {explanation}
    </div>
  )}
</div>
```

### Featured Categories System Patterns
```typescript
// Featured categories for homepage (curated selection)
const featuredCategories = [
  'All Categories', 
  'Explore codebase', 
  'Deploy', 
  'Write documentation', 
  'Automate tasks', 
  'Optimize workflow'
];

// Custom categories system (supports empty categories)
const dataCategories = Array.from(new Set(useCases.flatMap(uc => uc.categories)));
const customCategories = ['Optimize workflow']; // Add custom categories
export const categories = Array.from(new Set([...dataCategories, ...customCategories])).sort();

// Empty category filtering (graceful handling)
if (selectedCategory !== 'All Categories') {
  filtered = filtered.filter(uc => uc.categories && uc.categories.includes(selectedCategory));
}
```

### Category System Patterns
```typescript
// Multiple category display in modals
{useCase.categories.map((category, index) => (
  <Badge key={index} variant="outline" className="text-xs">{category}</Badge>
))}

// OR-based filtering logic
const matchesCategory = 
  selectedCategories.length === 0 || 
  useCase.categories.some(cat => selectedCategories.includes(cat));

// Auto-extract unique categories
export const categories = Array.from(new Set(useCases.flatMap(uc => uc.categories))).sort();
```

### Card Tooltip Pattern
```typescript
// For cards - use hover tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Badge>{sessionType}</Badge>
    </TooltipTrigger>
    <TooltipContent>
      <p>{explanation}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## 🐛 Known Issues & Solutions

### 1. Tooltip Conflicts in Modals
- **Issue**: Radix Dialog + Tooltip portal conflicts
- **Solution**: Custom clickable floating bubbles
- **Status**: ✅ Resolved

### 2. Badge Wrapping on Small Screens  
- **Issue**: Long session type names wrap to multiple lines
- **Solution**: Shortened display text + `whitespace-nowrap`
- **Status**: ✅ Resolved

### 3. Double Scrollbars in Modal
- **Issue**: Nested `overflow-y-auto` creates double scrollbars
- **Solution**: Single scroll container for entire modal
- **Status**: ✅ Resolved

## 🔄 Recent Changes

### Phase 15 (Latest - September 2025) - Major Data Migration & Featured Prompts
- **✅ Major Data Migration**: Successfully migrated from 53 → 69 prompts (+16 new)
  - **ID Preservation**: 37 existing prompt IDs preserved for URL compatibility  
  - **New Content**: 32 new prompts with fresh IDs added to library
  - **Enhanced Data**: Added GA clicks tracking, verification status
- **✅ Session Type Standardization**: Updated to consistent lowercase format
  - **Before**: Mixed casing ("Instant Output", "Step-by-Step Flow")
  - **After**: Consistent lowercase ("Instant output", "Step-by-step flow") 
  - **Components Updated**: All UI components, interfaces, and display logic
- **✅ Featured Prompts System**: Implemented curated prompt highlighting
  - **Homepage Featured**: 9 carefully selected prompts shown first when no filters applied
  - **Prompts Page Featured**: Same 9 prompts prioritized in main library
  - **Visual Highlighting**: 4 prompts with blue border + fire emoji treatment
- **✅ Target Role Expansion**: Added "Content makers" and "DevOps" roles
- **✅ Technical Migrations**: Complete TypeScript interface updates and component synchronization

#### Featured Prompts (In Display Order):
1. **Organise my Downloads folder** 🔥 *(highlighted)*
2. **Explain Codebase or Repository**
3. **Build A Feature from Scratch** 
4. **Set Up WordPress Environment** 🔥 *(highlighted)*
5. **Set Up Cloud Infrastructure**
6. **Build and Deploy Landing Page**
7. **Generate Docker Configuration**
8. **Set Up Local Development Environment** 🔥 *(highlighted)*
9. **Extract Data from PDFs** 🔥 *(highlighted)*

#### Migration Technical Details:
- **Data Structure**: Enhanced with `gaClicks`, improved verification tracking
- **Backward Compatibility**: All existing URLs continue to work seamlessly  
- **Component Updates**: Fixed casing inconsistencies across all React components
- **Performance**: Maintained fast filtering and search with larger dataset

### Phase 14 (August 2025) - Enhanced Multiple Categories
- **11 Total Categories**: Expanded from 10 to 11 comprehensive categories
- **Advanced Filtering**: Improved OR-based category matching logic
- **UI Refinements**: Better visual feedback for multi-category selection

### Phase 13 (July 2025) - Analytics Integration  
- **PostHog Integration**: Complete user behavior tracking implementation
- **Viral Growth Tracking**: Share link attribution and conversion analytics
- **User Journey Analytics**: From page view to prompt copy completion

### Phase 12 (Latest - Dec 2024) - Featured Categories & UI Refinement
- **Featured Categories Homepage**: Implemented curated 5-category system for homepage
  - Replaced DevOps taskCategories with data-driven featured categories
  - Categories: Explore codebase, Deploy, Write documentation, Automate tasks, Optimize workflow
- **Empty Category Infrastructure**: Added support for categories without prompts
  - Created "Optimize workflow" category ready for future content
  - Custom categories system in useCases.ts handles both data-driven and manual categories
- **UI Cleanup**: Removed "Or filter by role:" text from homepage for cleaner design
- **Accurate Statistics**: Updated homepage stats (53+ prompts, 11 categories)

### Phase 11 (Nov 2024) - Categories System Overhaul
- **Multiple Categories Support**: Migrated from single category to categories array
- **10 Data Categories**: All prompts migrated to new streamlined category system
- **Enhanced Filtering**: OR-based logic, multi-select dropdowns, visual feedback

### Phase 10 (Nov 2024) - UI Simplification
- **Card Cleanup**: Removed noisy elements from all prompt cards
  - Category text, author info, target role tags removed from display
  - Cards now show only: icon, title, session type, description, votes
- **Modal Cleanup**: Removed date added from prompt detail modals
- **Data Preservation**: All removed data still exists in JSON for filtering
- **Clean Design**: Significantly simplified visual hierarchy

### Phase 9
- Fixed badge text wrapping on 13" screens
- Resolved double scrollbar issue in modals
- Optimized tooltip UX across all contexts

### Phase 8
- Implemented clickable floating bubble tooltips for modals
- Clean card design without info icons
- Cross-platform tooltip compatibility

## 📋 TODO / Future Enhancements

1. **Featured Prompts Optimization**: Monitor usage analytics for featured prompt effectiveness
2. **Content Expansion**: Continue adding high-quality prompts to reach 100+ library size  
3. **Add Prompts to "Optimize workflow"**: Category infrastructure is ready for new prompts
4. **Performance Optimization**: Consider virtualization for large lists (now more relevant with 69 prompts)
5. **Enhanced Analytics**: Category-specific and featured prompt conversion tracking
6. **Accessibility**: ARIA improvements for tooltips and featured prompt indicators
7. **Mobile UX**: Further touch interaction optimization for larger prompt library
8. **Category Management**: Admin interface for managing featured categories and prompts
9. **Advanced Filtering**: Combined filters and saved filter preferences
10. **User Personalization**: Personalized featured prompts based on user behavior

## 🔍 Debugging Tips

### Common Issues
1. **Import Errors**: Check for duplicate React imports
2. **Tooltip Not Working**: Verify context (modal vs card)
3. **Layout Shifts**: Check for missing `whitespace-nowrap`
4. **Scroll Issues**: Verify single scroll container

### Development Tools
- React DevTools
- PostHog Analytics Dashboard
- Browser DevTools for responsive testing

## 📞 Handoff Notes

The project is **production-ready** with:
- ✅ Complete major data migration (53 → 69 prompts) with ID preservation
- ✅ Session type standardization (lowercase format across all components)
- ✅ Featured prompts system (9 curated prompts with 4 highlighted)
- ✅ Enhanced data structure with GA tracking integration
- ✅ Complete session type migration
- ✅ Featured categories system with 5 curated homepage categories
- ✅ Empty category infrastructure (Optimize workflow ready for growth)
- ✅ Simplified, clean UI design (removed visual clutter)
- ✅ Fully functional tooltip system  
- ✅ Optimized layouts for all screen sizes
- ✅ Fixed modal UX issues
- ✅ Analytics integration working
- ✅ Preserved data structure for filtering functionality
- ✅ 11 total categories (10 with content + 1 empty for future expansion)
- ✅ Backward compatibility (all existing URLs work)

**Latest Development Server**: http://localhost:8087/

Ready for:
- ✅ Further content expansion (targeting 100+ prompts)
- ✅ Featured prompt performance optimization
- ✅ Advanced analytics implementation
- ✅ Adding prompts to "Optimize workflow" category  
- ✅ New use cases file integration
- ✅ Production deployment
- ✅ Further feature development