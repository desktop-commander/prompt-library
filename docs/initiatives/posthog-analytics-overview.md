# 📊 PostHog Analytics Overview - Style Scout DC

## 🎯 **System Overview**

This document provides a comprehensive overview of the PostHog analytics implementation for the Desktop Commander Prompt Library. Use this as a reference for setting up dashboards, understanding data flows, and interpreting user behavior analytics.

---

## 📋 **Table of Contents**

1. [Configuration & Setup](#configuration--setup)
2. [Event Taxonomy](#event-taxonomy)
3. [User Journey Mapping](#user-journey-mapping)
4. [Dashboard Recommendations](#dashboard-recommendations)
5. [Key Metrics & KPIs](#key-metrics--kpis)
6. [Data Analysis Guides](#data-analysis-guides)
7. [Troubleshooting](#troubleshooting)

---

## ⚙️ **Configuration & Setup**

### **PostHog Configuration:**
- **Region:** EU (https://eu.i.posthog.com)
- **API Key:** `phc_o3XE6MCo4vR8cnlszJy7kpPSiYwS7vx52wgR2ucsm8O`
- **Environment:** Production-ready with development debug mode
- **Session Recordings:** Enabled with privacy-safe settings
- **Web Vitals:** Enabled (LCP, CLS, FCP, INP)

### **Implementation Architecture:**
```
PostHogProvider.tsx
├── Advanced tracking utilities
├── Viral source detection
├── Return visitor classification
└── User identification system

Components with tracking:
├── PromptDetailModal.tsx (modal interactions + manual copy detection)
├── UsePromptWizard.tsx (DC integration flow)
├── Index.tsx (homepage interactions)
└── Prompts.tsx (viral link detection)
```

### **Environment Variables:**
```env
VITE_PUBLIC_POSTHOG_KEY=phc_o3XE6MCo4vR8cnlszJy7kpPSiYwS7vx52wgR2ucsm8O
VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

---

## 🏷️ **Event Taxonomy**

### **📊 Event Categories:**

#### **1. System Events (Automatic)**
| Event | Description | Frequency |
|-------|-------------|-----------|
| `$pageview` | Page navigation tracking | Every page load |
| `$web_vitals` | Performance metrics | Per page session |
| `$identify` | User identification | Session start |
| `posthog_initialized` | PostHog system startup | App initialization |

#### **2. User Journey Events**
| Event | Description | Trigger |
|-------|-------------|---------|
| `visitor_session_start` | Enhanced session tracking | Page load with visitor classification |
| `viral_link_visit` | Shared link detection | URL with viral parameters |
| `prompt_clicked` | Prompt card interaction | User clicks any prompt |
| `prompt_modal_opened` | Modal engagement start | Modal opens with timing |
| `prompt_modal_closed` | Modal engagement end | Modal closes with duration |

#### **3. Engagement Events**
| Event | Description | Trigger |
|-------|-------------|---------|
| `prompt_voted` | User votes on prompt | Vote button click |
| `role_filter_changed` | Filter usage | Role selection change |
| `share_button_clicked` | Share intent | Share button click |
| `share_link_copied` | Share success | Clipboard copy success |
| `share_native_completed` | Mobile share success | Native share completion |

#### **4. Desktop Commander Integration**
| Event | Description | Trigger |
|-------|-------------|---------|
| `use_prompt_button_clicked` | Wizard entry intent | "Use Prompt" button |
| `use_prompt_wizard_opened` | Wizard session start | Wizard modal opens |
| `dc_installation_confirmed` | User has DC installed | Installation check: yes |
| `dc_installation_needed` | User needs DC installation | Installation check: no |
| `dc_platform_selected` | Platform choice | User selects Claude/VS Code/etc |
| `prompt_copied_to_clipboard` | Final conversion | Prompt copied from wizard |
| `use_prompt_wizard_completed` | Wizard success | Full wizard completion |
| `use_prompt_wizard_abandoned` | Wizard dropout | Early wizard exit |

#### **5. Manual Copy Detection (Phase 4.5)**
| Event | Description | Trigger |
|-------|-------------|---------|
| `prompt_text_selected` | Copy intent detection | Text highlighted in modal |
| `prompt_text_deselected` | Copy abandonment | Text deselected without copy |
| `prompt_manual_copy_attempt` | Bypass behavior | Manual copy (Ctrl+C, right-click) |
| `prompt_right_click_detected` | Context menu usage | Right-click on prompt text |

---

## 🗺️ **User Journey Mapping**

### **🎯 Primary Conversion Funnel:**
```
1. Page View ($pageview)
   ↓
2. Prompt Discovery (prompt_clicked)
   ↓  
3. Modal Engagement (prompt_modal_opened)
   ↓
4. Intent Signal (prompt_voted OR prompt_text_selected)
   ↓
5. Conversion Path:
   5a. Official: use_prompt_button_clicked → wizard flow → prompt_copied_to_clipboard
   5b. Manual: prompt_manual_copy_attempt (bypass tracking)
```

### **🔗 Viral Growth Funnel:**
```
1. Share Generation (share_button_clicked)
   ↓
2. Share Success (share_link_copied)
   ↓
3. Viral Visit (viral_link_visit) 
   ↓
4. Viral Conversion (prompt_clicked with is_viral_session: true)
```

### **🔄 Return Visitor Journey:**
```
1. Session Start (visitor_session_start)
   ↓
2. Classification (new/same_day_return/recent_return/monthly_return/long_term_return)
   ↓
3. Behavior Analysis (compare returning vs new user patterns)
```

---

## 📊 **Dashboard Recommendations**

### **🎯 Executive Dashboard**
**Key Metrics:**
- Total prompt views (daily/weekly/monthly)
- Conversion rate (prompt view → copy)
- Viral coefficient (shares → new users)
- User retention rates
- Desktop Commander adoption rate

**Recommended Charts:**
- Time series: Daily active users, prompt views, conversions
- Funnel: Complete conversion journey
- Cohort: User retention analysis
- Bar chart: Top performing prompts

### **🔍 Product Analytics Dashboard**
**Focus Areas:**
- Modal engagement depth (time spent)
- Copy method distribution (wizard vs manual)
- Platform preferences (Claude vs IDE usage)
- Abandonment analysis (where users drop off)
- Feature usage patterns

**Recommended Charts:**
- Sankey: User flow through modal interactions
- Heatmap: Engagement by prompt category  
- Funnel: Wizard completion rates
- Distribution: Time-to-action analysis

### **📈 Growth Dashboard**
**Viral Metrics:**
- Share-to-click conversion rates
- Viral traffic percentage
- Share method effectiveness (mobile vs desktop)
- Viral chain analysis
- Time from share to usage

**Recommended Charts:**
- Time series: Viral traffic growth
- Funnel: Share → click → convert
- Bar chart: Share method performance
- Map: Geographic viral spread

### **🎭 User Behavior Dashboard**
**Behavioral Insights:**
- Text selection patterns
- Copy abandonment rates
- Session depth analysis
- Return visitor behavior differences
- Platform switching patterns

**Recommended Charts:**
- Histogram: Session duration distribution
- Flow: Text selection → copy journey
- Cohort: Behavioral changes over time
- Scatter: Engagement vs conversion correlation

---

## 📏 **Key Metrics & KPIs**

### **🎯 Primary KPIs**

#### **Growth Metrics:**
```
Viral Coefficient = New Users from Shares / Total Shares
Monthly Active Users (MAU) = Unique visitors per month
User Acquisition Rate = New visitors / Total visitors
```

#### **Engagement Metrics:**
```
Modal Engagement Rate = prompt_modal_opened / prompt_clicked
Copy Conversion Rate = (prompt_copied + manual_copy) / prompt_modal_opened
Time to Copy = avg(time from modal_open to copy)
Session Depth = avg(prompts_viewed_per_session)
```

#### **Product Metrics:**
```
DC Adoption Rate = dc_installation_confirmed / use_prompt_wizard_opened
Wizard Completion Rate = use_prompt_wizard_completed / use_prompt_wizard_opened
Manual Copy Rate = prompt_manual_copy_attempt / total_copies
Platform Distribution = % by selected_client
```

#### **Retention Metrics:**
```
Return Visitor Rate = returning_users / total_users  
Weekly Retention = users_week_1 / users_week_0
Monthly Retention = users_month_1 / users_month_0
```

### **🔍 Secondary KPIs**

#### **Content Performance:**
```
Prompt Popularity = prompt_clicked by prompt_id
Vote Engagement = prompt_voted / prompt_modal_opened
Share Rate = share_button_clicked / prompt_modal_opened
Text Selection Rate = prompt_text_selected / prompt_modal_opened
```

#### **User Experience:**
```
Modal Abandonment = prompt_modal_closed / prompt_modal_opened (without copy)
Copy Abandonment = prompt_text_deselected / prompt_text_selected  
Wizard Drop-off = abandoned_at_step analysis
Loading Performance = $web_vitals metrics
```

---

## 📊 **Data Analysis Guides**

### **🎯 Conversion Funnel Analysis**

**Query Structure:**
```sql
SELECT 
  funnel_step,
  COUNT(DISTINCT user_id) as users,
  COUNT(DISTINCT user_id) / LAG(COUNT(DISTINCT user_id)) OVER (ORDER BY step_order) as conversion_rate
FROM (
  SELECT user_id, 1 as step_order, 'page_view' as funnel_step FROM events WHERE event = '$pageview'
  UNION ALL
  SELECT user_id, 2 as step_order, 'prompt_click' as funnel_step FROM events WHERE event = 'prompt_clicked'
  UNION ALL  
  SELECT user_id, 3 as step_order, 'modal_open' as funnel_step FROM events WHERE event = 'prompt_modal_opened'
  UNION ALL
  SELECT user_id, 4 as step_order, 'copy_action' as funnel_step FROM events WHERE event IN ('prompt_copied_to_clipboard', 'prompt_manual_copy_attempt')
)
GROUP BY funnel_step, step_order
ORDER BY step_order
```

### **🔗 Viral Performance Analysis**

**Key Questions:**
1. **Which prompts drive most sharing?**
   - Group `share_button_clicked` by `prompt_id`
   - Correlate with `viral_link_visit` events

2. **What's the viral conversion rate?**
   - Compare `is_viral_session: true` conversion vs organic

3. **How fast do viral links convert?**
   - Analyze `share_age_seconds` in `viral_link_visit`

### **👥 User Segmentation Analysis**

**Segments to Track:**
```
New DC Users: dc_installation_needed events
Experienced DC Users: dc_installation_confirmed + known_client
Manual Copiers: prompt_manual_copy_attempt without wizard
Wizard Users: use_prompt_wizard_completed  
Viral Users: is_viral_session: true
Power Users: high prompt_clicked frequency
```

**Behavioral Comparison:**
- Conversion rates by segment
- Time-to-action differences  
- Platform preferences
- Content preferences

### **📱 Platform Usage Analysis**

**Desktop Commander Platforms:**
```sql
SELECT 
  properties.selected_client,
  COUNT(*) as selections,
  AVG(properties.time_to_copy_seconds) as avg_copy_time,
  COUNT(DISTINCT user_id) as unique_users
FROM events 
WHERE event = 'prompt_copied_to_clipboard'
GROUP BY properties.selected_client
ORDER BY selections DESC
```

---

## 🔧 **Troubleshooting**

### **Common Issues & Solutions**

#### **Missing Events:**
- **Check PostHog debug mode** in browser console
- **Verify event names** match exactly (case-sensitive)
- **Check network tab** for failed API calls
- **Validate PostHog key** and region settings

#### **Duplicate Events:**
- **Review component re-renders** causing multiple firings
- **Check useEffect dependencies** in React components  
- **Implement event deduplication** if needed

#### **Performance Issues:**
- **Monitor event frequency** - reduce if > 100/minute per user
- **Check payload sizes** - keep under 32KB per event
- **Optimize batch sending** for high-volume events

#### **Data Quality:**
- **Validate required properties** are always present
- **Check for null/undefined values** in event data
- **Monitor property consistency** across events

### **Debugging Tools**

#### **Browser Console:**
```javascript
// Check PostHog status
posthog.debug()

// View pending events
posthog._get_config()

// Test event manually
posthog.capture('test_event', {test: true})
```

#### **PostHog Live Events:**
- Navigate to PostHog → Activity → Live events
- Filter by current timestamp
- Verify events appear in real-time

#### **Network Monitoring:**
- Check browser Network tab for POST requests to PostHog
- Verify 200 status codes
- Monitor payload contents

---

## 🎯 **Implementation Quick Reference**

### **Adding New Events:**
```javascript
// In any component with PostHog access
const posthog = usePostHog();

posthog.capture('new_event_name', {
  // Standard context (always include)
  prompt_id: useCase.id,
  prompt_title: useCase.title,
  
  // Event-specific properties  
  custom_property: value,
  
  // Enhanced context (from existing patterns)
  visit_count: parseInt(localStorage.getItem('style_scout_visit_count') || '0'),
  is_viral_session: !!localStorage.getItem('style_scout_viral_session'),
  // ... other standard properties
});
```

### **Event Property Standards:**
- **Always include:** `prompt_id`, `prompt_title` when relevant
- **Time tracking:** Use `_seconds` suffix for durations
- **Boolean flags:** Use `is_` prefix for true/false values
- **Categorization:** Use `_type` suffix for classifications
- **Consistent naming:** snake_case for all properties

---

## 📚 **Additional Resources**

### **Implementation Files:**
- `src/components/PostHogProvider.tsx` - Core analytics setup
- `src/components/PromptDetailModal.tsx` - Modal & manual copy tracking
- `src/components/UsePromptWizard.tsx` - DC integration tracking
- `src/pages/Index.tsx` & `src/pages/Prompts.tsx` - Page-level tracking

### **Test Files:**
- `test-phase3-tracking.html` - Viral & visitor tracking tests
- `test-phase4-modal-tracking.html` - Modal interaction tests  
- `test-phase4.5-manual-copy.html` - Manual copy detection tests
- `test-share-tracking.html` - Share attribution tests

### **Documentation:**
- `PHASE_3_COMPLETE.md` - Advanced tracking implementation
- `PHASE_4_COMPLETE.md` - Modal & DC integration tracking
- `PHASE_4.5_COMPLETE.md` - Manual copy detection system
- `SHARE_TRACKING_COMPLETE.md` - Share attribution system

---

## 🎉 **Success Metrics Summary**

**✅ Current Implementation Status:**
- **15+ event types** tracking complete user journey
- **Enterprise-grade analytics** with privacy compliance
- **Complete conversion attribution** including manual copy detection
- **Viral growth tracking** with share-to-conversion analysis  
- **User segmentation** by DC usage and behavior patterns
- **Real-time analytics** with session recording capabilities

**📊 Ready for Production:**
- All tracking tested and verified working
- Performance optimized for scale
- Privacy-compliant implementation
- Cross-browser compatibility confirmed
- Dashboard-ready data structure

---

*This document serves as the definitive guide for understanding and leveraging the comprehensive analytics system implemented for the Desktop Commander Prompt Library. Use it as a reference for creating dashboards, analyzing user behavior, and optimizing the product experience.*