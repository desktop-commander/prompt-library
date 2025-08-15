# 📊 PostHog Dashboard Setup Guide

## 🎯 **Quick Start Dashboards**

This guide helps you set up essential PostHog dashboards for the Style Scout DC analytics system.

---

## 🚀 **Dashboard 1: Executive Overview**

### **Setup Instructions:**
1. Go to PostHog → Insights → New Dashboard
2. Name: "Style Scout - Executive Overview"
3. Add these insights:

#### **Key Metrics Cards:**
```
Insight 1: Total Prompt Views (Today)
- Type: Number
- Event: prompt_clicked
- Time range: Last 24 hours

Insight 2: Conversion Rate (Today)  
- Type: Number
- Formula: (prompt_copied_to_clipboard + prompt_manual_copy_attempt) / prompt_modal_opened
- Time range: Last 24 hours

Insight 3: Viral Coefficient (This Week)
- Type: Number  
- Formula: viral_link_visit / share_link_copied
- Time range: Last 7 days

Insight 4: Active Users (Today)
- Type: Number
- Event: $pageview (unique users)
- Time range: Last 24 hours
```

#### **Trend Charts:**
```
Chart 1: Daily Active Users
- Type: Line chart
- Event: $pageview (unique users)
- Time range: Last 30 days
- Group by: Day

Chart 2: Prompt Engagement Trend
- Type: Line chart  
- Events: prompt_clicked, prompt_modal_opened, prompt_copied_to_clipboard
- Time range: Last 30 days
- Group by: Day
```

---

## 📈 **Dashboard 2: Conversion Funnel**

### **Setup Instructions:**
1. Create new dashboard: "Style Scout - Conversion Analysis"
2. Add these funnels:

#### **Primary Conversion Funnel:**
```
Funnel 1: View to Copy
- Step 1: prompt_clicked
- Step 2: prompt_modal_opened  
- Step 3: prompt_copied_to_clipboard OR prompt_manual_copy_attempt
- Time range: Last 7 days
- Conversion window: 1 day
```

#### **Wizard Funnel:**
```
Funnel 2: Wizard Completion
- Step 1: use_prompt_button_clicked
- Step 2: use_prompt_wizard_opened
- Step 3: dc_platform_selected
- Step 4: prompt_copied_to_clipboard
- Time range: Last 7 days
```

#### **Viral Funnel:**
```
Funnel 3: Viral Growth
- Step 1: share_button_clicked
- Step 2: share_link_copied
- Step 3: viral_link_visit
- Step 4: prompt_clicked (where is_viral_session = true)
- Time range: Last 30 days
```

---

## 🎯 **Dashboard 3: User Behavior**

### **Setup Instructions:**
1. Create new dashboard: "Style Scout - User Behavior"
2. Add these insights:

#### **Engagement Analysis:**
```
Chart 1: Time in Modal Distribution
- Type: Histogram
- Event: prompt_modal_closed
- Property: time_in_modal_seconds
- Buckets: 0-10s, 10-30s, 30-60s, 60s+

Chart 2: Copy Method Distribution  
- Type: Pie chart
- Events: prompt_copied_to_clipboard (wizard), prompt_manual_copy_attempt (manual)
- Group by: Event name

Chart 3: Platform Preferences
- Type: Bar chart
- Event: dc_platform_selected
- Group by: selected_client
- Time range: Last 30 days
```

#### **User Segmentation:**
```
Chart 4: New vs Returning Users
- Type: Stacked bar chart
- Event: visitor_session_start
- Group by: visitor_type
- Time range: Last 30 days

Chart 5: DC User Adoption
- Type: Pie chart
- Events: dc_installation_confirmed, dc_installation_needed
- Group by: Event name
```

---

## 🔍 **Dashboard 4: Content Performance**

### **Setup Instructions:**
1. Create new dashboard: "Style Scout - Content Analytics"
2. Add these insights:

#### **Prompt Performance:**
```
Table 1: Top Performing Prompts
- Type: Table
- Event: prompt_clicked
- Group by: prompt_title
- Columns: prompt_title, unique_users, total_events
- Order by: total_events DESC
- Limit: 20

Chart 1: Prompt Category Performance
- Type: Bar chart
- Event: prompt_clicked  
- Group by: prompt_category
- Time range: Last 30 days

Chart 2: Vote Engagement Rate
- Type: Line chart
- Formula: prompt_voted / prompt_modal_opened
- Time range: Last 30 days
- Group by: Day
```

#### **Text Selection Analysis:**
```
Chart 3: Selection vs Copy Rate
- Type: Scatter plot
- X-axis: prompt_text_selected (count)
- Y-axis: prompt_manual_copy_attempt (count)
- Group by: prompt_id

Chart 4: Full vs Partial Selection
- Type: Pie chart
- Event: prompt_text_selected
- Group by: is_full_prompt_selected
```

---

## 🎨 **Dashboard Customization Tips**

### **Color Schemes:**
```
Success Actions: #22c55e (green)
- prompt_copied_to_clipboard
- use_prompt_wizard_completed
- share_link_copied

Intent Actions: #3b82f6 (blue)  
- prompt_clicked
- prompt_text_selected
- use_prompt_button_clicked

Abandonment: #f59e0b (orange)
- prompt_modal_closed (without copy)
- use_prompt_wizard_abandoned
- prompt_text_deselected
```

### **Time Ranges:**
- **Real-time monitoring:** Last 24 hours
- **Daily optimization:** Last 7 days  
- **Weekly reviews:** Last 30 days
- **Monthly analysis:** Last 3 months

### **Filters to Add:**
```
Global Filters:
- is_viral_session (true/false)
- is_returning_user (true/false)  
- selected_client (claude-desktop, cursor, vscode, etc.)
- prompt_category (development, data-analysis, etc.)
```

---

## 📊 **Advanced Insights**

### **Cohort Analysis:**
```
Setup: PostHog → Cohorts → New Cohort
- Name: "First Week Prompt Copiers"
- Criteria: Performed prompt_copied_to_clipboard in first 7 days
- Use for: Retention analysis and behavior comparison
```

### **Custom Events:**
```
Create calculated events for complex metrics:
- "Successful Session" = prompt_modal_opened + (prompt_copied_to_clipboard OR prompt_manual_copy_attempt)
- "Viral Conversion" = prompt_clicked WHERE is_viral_session = true
- "Power User Action" = user with 5+ prompt_clicked in 7 days
```

### **Alerts & Monitoring:**
```
Set up alerts for:
- Daily conversions drop >20%
- Viral coefficient drops below 0.5
- Error rates spike above 5%
- Wizard abandonment >50%
```

---

## 🎯 **Dashboard Refresh Schedule**

### **Real-time (Live):**
- Executive overview
- Current conversion rates
- Active user counts

### **Daily Updates:**
- User behavior analysis
- Content performance  
- Funnel analysis

### **Weekly Reviews:**
- Cohort analysis
- Trend identification
- Performance optimization

---

*Use this guide to quickly set up comprehensive PostHog dashboards that provide actionable insights into user behavior, conversion optimization, and growth metrics for the Style Scout DC platform.*