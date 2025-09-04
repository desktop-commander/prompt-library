# 🧪 Role Filter Tracking - Testing Checklist

## Testing Overview
This checklist helps you verify that the role filter tracking implementation is working correctly.

## Pre-Testing Setup

### ✅ 1. Development Environment
- [x] Development server running: `npm run dev`
- [x] Application accessible at: http://localhost:8080
- [x] No build errors in console
- [x] PostHog initialized with correct API key

### ✅ 2. Testing Tools Ready
- [x] Test file created: `test-role-filter-live.html`
- [x] PostHog Live Events accessible: https://eu.i.posthog.com/project/14577/events
- [x] Browser developer tools ready

## Manual Testing Steps

### Test 1: Homepage Role Filter Tracking
**Location**: http://localhost:8080

1. **Open Homepage**
   - [ ] Navigate to homepage
   - [ ] Open browser dev tools → Network tab
   - [ ] Filter for `posthog` requests

2. **Test Role Filter Changes**
   - [ ] Change role filter (e.g., "For all" → "Developer")
   - [ ] Verify `role_filter_changed` event in PostHog Live Events
   - [ ] Check event properties include:
     - `previous_role`
     - `new_role` 
     - `source_page: 'homepage'`

3. **Test Prompt Clicks with Role Context**
   - [ ] With role "Developer" selected, click any prompt card
   - [ ] Verify `prompt_clicked` event in PostHog Live Events
   - [ ] Check event includes:
     - `current_role_filter: 'Developer'`
     - `prompt_id`
     - `prompt_title`
     - `source_page: 'homepage'`

### Test 2: Prompts Page Role Filter Tracking  
**Location**: http://localhost:8080/prompts

1. **Open Prompts Page**
   - [ ] Navigate to prompts page
   - [ ] Ensure filters are visible

2. **Test Multiple Role Filter Changes**
   - [ ] Select multiple roles (e.g., Developer + Data Analyst)
   - [ ] Verify `role_filter_changed` event fires
   - [ ] Check properties include:
     - `previous_roles: []` (or previous selection)
     - `new_roles: ['Developer', 'Data Analyst']`
     - `source_page: 'prompts'`

3. **Test Prompt Clicks with Multiple Role Context**
   - [ ] With multiple roles selected, click any prompt card
   - [ ] Verify `prompt_clicked` event fires
   - [ ] Check event includes:
     - `current_role_filters: ['Developer', 'Data Analyst']`
     - `current_category_filters: []` (or selected categories)
     - `source_page: 'prompts'`

### Test 3: Filter Combinations
**Location**: http://localhost:8080/prompts

1. **Test Complex Filter Combinations**
   - [ ] Select roles: Developer + DevOps
   - [ ] Select categories: Development
   - [ ] Select session types: Instant output
   - [ ] Add search term: "docker"
   - [ ] Change sort: newest

2. **Test Prompt Click with Full Context**
   - [ ] Click any prompt card
   - [ ] Verify `prompt_clicked` includes all filter context:
     - `current_role_filters`
     - `current_category_filters` 
     - `current_session_type_filters`
     - `search_term`
     - `sort_by`

## Automated Testing

### Test 4: Using Test Files
1. **Open Live Test File**
   - [ ] Open `test-role-filter-live.html` in browser
   - [ ] Click "Run Full Test Sequence"
   - [ ] Verify events appear in both test log and PostHog Live Events

2. **Manual Test Simulation**
   - [ ] Use role selector to change roles
   - [ ] Click "Change Role Filter" button
   - [ ] Click "Click Prompt" button
   - [ ] Verify events match expected structure

## PostHog Verification

### Test 5: PostHog Live Events Dashboard
**Location**: https://eu.i.posthog.com/project/14577/events

1. **Event Stream Verification**
   - [ ] Open PostHog Live Events
   - [ ] Filter by event: `role_filter_changed`
   - [ ] Verify events appear with correct properties
   - [ ] Filter by event: `prompt_clicked` 
   - [ ] Verify role context properties are present

2. **Event Property Inspection**
   - [ ] Click on a `prompt_clicked` event
   - [ ] Verify contains `current_role_filter` or `current_role_filters`
   - [ ] Check other context properties are populated
   - [ ] Verify `source_page` correctly identifies origin

## Data Quality Checks

### Test 6: Data Integrity
1. **Property Consistency**
   - [ ] Role filters are arrays on prompts page, strings on homepage
   - [ ] All events have proper `source_page` identification
   - [ ] Timestamps are accurate
   - [ ] No null/undefined values in critical properties

2. **Event Volume**
   - [ ] Events fire only on user actions (not page loads)
   - [ ] No duplicate events for single actions
   - [ ] Reasonable event frequency (not too many per second)

## Troubleshooting Guide

### If Events Don't Appear:
1. **Check PostHog API Key**
   - Verify key matches: `phc_o3XE6MCo4vR8cnlszJy7kpPSiYwS7vx52wgR2ucsm8O`
   - Check region: EU (https://eu.i.posthog.com)

2. **Check Browser Console**
   - Look for PostHog errors
   - Verify `posthog.capture()` calls are executed
   - Check network requests to PostHog API

3. **Check Implementation**
   - Verify `usePostHog()` hook is available
   - Check component is wrapped in PostHogProvider
   - Verify event names match exactly

### If Properties Are Missing:
1. **Check Variable Scope**
   - Verify filter state variables are in scope
   - Check variable names match between pages
   - Ensure proper destructuring of state

2. **Check Property Names**
   - Homepage: `current_role_filter` (singular)
   - Prompts page: `current_role_filters` (plural array)
   - Verify spelling and casing

## Success Criteria

✅ **All Tests Pass If:**
- Role filter changes generate `role_filter_changed` events
- Prompt clicks generate `prompt_clicked` events with role context
- Events appear in PostHog Live Events within 5 seconds
- All expected properties are present and correctly formatted
- No JavaScript errors in browser console
- Event volume is reasonable (not excessive)

## PostHog Analysis Test

### Test 7: Query Verification
Once data is flowing, test actual PostHog queries:

1. **Create Basic Insight**
   - Event: `prompt_clicked`
   - Group by: `current_role_filter` or `current_role_filters`
   - Chart type: Bar chart
   - Verify results show prompt popularity by role

2. **Test Filter Functionality**
   - Filter events where `current_role_filter` = 'Developer'
   - Verify only Developer-filtered clicks appear
   - Check if data enables the original use case

---

## 🎯 Testing Status: Ready to Execute

**Next Steps:**
1. Run through this checklist systematically
2. Document any issues found
3. Verify PostHog data quality
4. Test actual analytics queries
5. Set up monitoring dashboards

**Expected Outcome:**
You should be able to create charts showing prompt popularity by role filter, enabling data-driven content optimization for different user types.