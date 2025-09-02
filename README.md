# Desktop Commander Prompt Library

## Project Overview

**URL**: https://library.desktopcommander.app/

A comprehensive prompt library for Desktop Commander users, featuring **69 curated prompts** across 11 categories for development, data analysis, DevOps, file management, and more. Users can browse, search, filter, and contribute their own prompts to help others maximize their productivity with Desktop Commander.

⚠️ **Developers**: See `PROJECT_OVERVIEW.md` for complete technical documentation and `CARD_ARCHITECTURE.md` for critical information about dual card rendering systems.

## 🚀 Latest Updates (September 2025)

### ✅ Major Data Migration Complete
- **Expanded Library**: Upgraded from 53 to **69 prompts** (+16 new high-quality prompts)
- **Enhanced Data**: Added GA tracking integration, improved verification system
- **ID Preservation**: All existing URLs continue to work seamlessly
- **Content Quality**: Curated selection covering expanded use cases

### ✅ Featured Prompts System  
- **Smart Curation**: 9 most valuable prompts highlighted on homepage and library
- **Visual Enhancement**: 4 prompts feature blue border + fire emoji treatment
- **User Experience**: New users immediately see best prompts without learning curve

### ✅ Technical Improvements
- **Session Type Standardization**: Consistent lowercase format across all components
- **Interface Updates**: Complete TypeScript migration and component synchronization  
- **Performance**: Optimized filtering and search with larger dataset
- **Analytics**: Enhanced tracking for featured prompt performance

## 🎯 Featured Prompts

When users visit with default settings, these **9 carefully selected prompts** appear first:

1. **Organise my Downloads folder** 🔥 *(highlighted)*
2. **Explain Codebase or Repository**
3. **Build A Feature from Scratch**
4. **Set Up WordPress Environment** 🔥 *(highlighted)*
5. **Set Up Cloud Infrastructure**
6. **Build and Deploy Landing Page**
7. **Generate Docker Configuration**
8. **Set Up Local Development Environment** 🔥 *(highlighted)*
9. **Extract Data from PDFs** 🔥 *(highlighted)*

*🔥 = Visual highlighting with blue border and fire emoji*

## 📊 Analytics & Tracking

This project features **enterprise-grade analytics** with comprehensive user behavior tracking powered by PostHog:

### 🎯 **Analytics Capabilities:**
- **Complete user journey tracking** - From page view to prompt copy
- **Viral growth analytics** - Share link attribution and conversion tracking  
- **Return visitor insights** - User segmentation and retention analysis
- **Desktop Commander integration** - Installation and platform usage tracking
- **Manual copy detection** - Complete attribution including bypass behavior
- **Conversion funnel analysis** - Drop-off identification and optimization

### 📈 **Key Metrics Tracked:**
- **15+ event types** covering all user interactions
- **Viral coefficient measurement** with share-to-conversion tracking
- **Platform preference insights** (Claude Desktop, VS Code, Cursor, etc.)
- **User engagement depth** with time-based analytics
- **Copy behavior analysis** (manual vs wizard usage)

For detailed analytics implementation and technical architecture, see the following files:
- `PROJECT_OVERVIEW.md` - Complete technical documentation and recent changes
- `MIGRATION_COMPLETION_REPORT.md` - Data migration details (53→69 prompts) 
- `FEATURED_PROMPTS_UPDATE.md` - Featured prompts implementation details
- `PHASE_3_COMPLETE.md` - Advanced tracking implementation (viral, return visitors, session recordings)
- `PHASE_4_COMPLETE.md` - Modal & DC integration tracking 
- `SHARE_TRACKING_COMPLETE.md` - Share button and viral growth analytics
- `src/components/PostHogProvider.tsx` - Analytics implementation
- `src/lib/analytics.ts` - Event tracking utilities

## Project Description

A comprehensive prompt library for Desktop Commander users, featuring **69 curated prompts** across 11 categories including development, data analysis, DevOps, file management, content creation, and workflow automation. 

**Key Features:**
- **Featured Prompts**: 9 most valuable prompts highlighted for new users
- **Smart Filtering**: Multi-category filtering with 11 comprehensive categories
- **Session Types**: Instant output vs Step-by-step flow classifications  
- **Analytics Integration**: Complete user behavior and conversion tracking
- **Visual Highlighting**: Premium prompts with special visual treatment
- **Responsive Design**: Optimized for all screen sizes and devices

Users can browse, search, filter by multiple criteria, and contribute their own prompts to help others maximize their productivity with Desktop Commander.

## How can I edit this code?

**Use your preferred IDE**

You can work locally using your preferred IDE. Simply clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/desktop-commander/prompt-library.git

# Step 2: Navigate to the project directory.
cd prompt-library

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is deployed to https://library.desktopcommander.app/ and is integrated with the main Desktop Commander website.

**Recent Production Updates:**
- **September 2025**: Major data migration and featured prompts system deployed
- **Library Size**: Now features 69 curated prompts (up from 53)
- **Performance**: Optimized for larger dataset with enhanced filtering
- **User Experience**: Featured prompts improve discovery for new users

For deployment, standard Node.js deployment practices apply - build the project and serve the static files.

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The built files will be in the `dist/` directory ready for static hosting.
