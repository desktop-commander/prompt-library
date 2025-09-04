# 🎯 Role Filter Tracking Implementation

## Overview
Implementation of role filter context tracking for prompt clicks to enable analysis of which prompts are most popular with specific user roles.

## Problem Solved
Previously, `prompt_clicked` events did not capture the current role filter state, making it impossible to analyze prompt popularity by user role in PostHog.

## Changes Made

### 1. Updated Prompts.tsx (`/src/pages/Prompts.tsx`)

#### Added Role Filter Change Tracking
```javascript
const handleRoleChange = (newRoles: string[]) => {
  // Track role filter change with enhanced metadata
  posthog.capture('role_filter_changed', {
    previous_roles: selectedRoles,
    new_roles: newRoles,
    current_categories: selectedCategories,
    current_session_types: selectedSessionTypes,
    search_term: searchTerm || null,
    sort_by: sortBy,
    source_page: 'prompts',
    // Viral tracking data
    visit_count: visitCount,
    is_viral_session: !!viralInfo,
    // ... other properties
  });
  
  setSelectedRoles(newRoles);
};
```

#### Enhanced Prompt Click Tracking
```javascript
const handleUseCaseClick = (useCase: UseCase) => {
  // Track prompt click with current role filter context
  posthog.capture('prompt_clicked', {
    prompt_id: useCase.id,
    prompt_title: useCase.title,
    // ... existing properties
    
    // NEW: Current filter context
    current_role_filters: selectedRoles.length > 0 ? selectedRoles : ['All'],
    current_category_filters: selectedCategories,
    current_session_type_filters: selectedSessionTypes,
    search_term: searchTerm || null,
    sort_by: sortBy,
    source_page: 'prompts',
  });
};
```

### 2. Updated Index.tsx (`/src/pages/Index.tsx`)

#### Enhanced Prompt Click Tracking
```javascript
posthog.capture('prompt_clicked', {
  // ... existing properties
  
  // NEW: Current filter context
  current_role_filter: selectedRole,
  current_category_filter: selectedCategory,
  source_page: 'homepage',
});
```

## New PostHog Properties Available

### prompt_clicked Events Now Include:
- `current_role_filter` (Index.tsx) - Single role filter on homepage
- `current_role_filters` (Prompts.tsx) - Array of role filters on prompts page
- `current_category_filters` - Currently selected categories
- `current_session_type_filters` - Currently selected session types
- `search_term` - Active search term
- `sort_by` - Current sort option

### role_filter_changed Events Include:
- `previous_roles` - Previous role selection
- `new_roles` - New role selection
- `current_categories` - Current category filters
- `current_session_types` - Current session type filters
- `source_page` - Where the filter change occurred

## PostHog Analysis Capabilities

### Now Possible:
✅ **Most clicked prompts by role** - Filter `prompt_clicked` by `current_role_filter` or `current_role_filters`
✅ **Role-specific prompt performance** - Group prompts by role and measure engagement
✅ **Filter combination analysis** - See which filter combinations drive most clicks
✅ **Role switching behavior** - Track how users change between roles
✅ **Cross-page role consistency** - Compare role preferences across homepage and prompts page

### PostHog Query Examples:

#### Most Popular Prompts by Role
```sql
SELECT 
  properties.prompt_title,
  properties.current_role_filter,
  COUNT(*) as clicks
FROM events 
WHERE event = 'prompt_clicked' 
  AND properties.current_role_filter = 'Developer'
GROUP BY properties.prompt_title, properties.current_role_filter
ORDER BY clicks DESC
```

#### Role Filter Usage Analysis
```sql
SELECT 
  properties.new_roles,
  COUNT(*) as filter_changes
FROM events 
WHERE event = 'role_filter_changed'
GROUP BY properties.new_roles
ORDER BY filter_changes DESC
```

## Testing

### Manual Testing
1. Open the application
2. Change role filters
3. Click on prompts
4. Verify in PostHog Live Events:
   - `role_filter_changed` events fire with correct role data
   - `prompt_clicked` events include `current_role_filter(s)` properties

### Test File
Created `test-role-filter-tracking.html` to simulate and verify tracking behavior.

## Dashboard Recommendations

### New Insights to Create:

1. **Prompt Performance by Role**
   - Chart: Bar chart showing top prompts by role
   - Filter: `current_role_filter` or `current_role_filters`
   - Metric: `prompt_clicked` count

2. **Role Filter Usage Distribution**
   - Chart: Pie chart showing role filter popularity
   - Event: `role_filter_changed`
   - Group by: `new_roles`

3. **Cross-Role Prompt Analysis**
   - Chart: Matrix showing prompt popularity across roles
   - X-axis: Prompt titles
   - Y-axis: Role filters
   - Color: Click count

4. **Filter Combination Effectiveness**
   - Chart: Table showing filter combinations and their conversion rates
   - Columns: Role + Category + Session Type combinations
   - Metrics: Clicks → Modal opens → Copies

## Implementation Benefits

1. **Data-Driven Content Strategy** - Know which prompts resonate with specific roles
2. **Personalization Opportunities** - Surface role-relevant prompts to users
3. **Content Gap Analysis** - Identify underserved roles or missing prompt types
4. **User Behavior Insights** - Understand how different roles navigate and consume content
5. **ROI Measurement** - Track which roles convert best for business metrics

## Next Steps

1. Deploy the changes to production
2. Set up new PostHog dashboards using the enhanced data
3. Monitor data quality and event volume
4. Create alerts for role-specific engagement drops
5. Use insights to optimize prompt recommendations and content strategy

---

✅ **Implementation Complete**: Role filter context is now captured in all prompt click events across both homepage and prompts page, enabling comprehensive role-based analytics in PostHog.