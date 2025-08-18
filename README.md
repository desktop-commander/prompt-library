# Desktop Commander Prompt Library

## Project Overview

**URL**: https://library.desktopcommander.app/

A comprehensive prompt library for Desktop Commander users, featuring community-created prompts for development, data analysis, DevOps, file management, and more. Users can browse, search, filter, and contribute their own prompts to help others maximize their productivity with Desktop Commander.

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

For detailed analytics implementation, see the following files in this repository:
- `PHASE_3_COMPLETE.md` - Advanced tracking implementation (viral, return visitors, session recordings)
- `PHASE_4_COMPLETE.md` - Modal & DC integration tracking 
- `SHARE_TRACKING_COMPLETE.md` - Share button and viral growth analytics
- `src/components/PostHogProvider.tsx` - Analytics implementation
- `src/lib/analytics.ts` - Event tracking utilities

## Project Description

A comprehensive prompt library for Desktop Commander users, featuring community-created prompts for development, data analysis, DevOps, file management, and more. Users can browse, search, filter, and contribute their own prompts to help others maximize their productivity with Desktop Commander.

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

For deployment, standard Node.js deployment practices apply - build the project and serve the static files.
