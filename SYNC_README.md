# Prompts Sync Guide

## Overview
This sync system allows you to manage all prompts in Excel and automatically update the website with real usage data from Google Analytics. **IDs are stable and permanent for URL persistence.**

## Important: Stable ID System
- **IDs never change** once assigned
- URLs remain permanent (e.g., `/?i=1` always points to the same prompt)
- Deleted prompts have their IDs reserved (not reused)
- See `ID_MANAGEMENT.md` for detailed ID documentation

## Workflow

1. **Update Excel File** (`Desktop Commander/DC Context - General/Prompt library.xlsx`)
   - Add new prompts
   - Update "Prompt uses (GA)" column with clicks data from Google Analytics
   - Mark prompts as "Verified" = Yes when reviewed
   - Update descriptions, prompts, categories, etc.

2. **Run Sync Script**
   ```bash
   cd /Users/ricardskrizanovskis/prompt-library
   ./sync.sh
   ```
   Or directly:
   ```bash
   python3 sync_use_cases.py
   ```

3. **Website Auto-Updates**
   - The dev server will hot-reload with new data
   - Check changes at http://localhost:8083

## How Votes are Calculated

Simple and transparent:
- **Votes = GA clicks** (direct 1:1 mapping)
- No baseline, no multipliers
- All use cases start at 0 votes
- Only real usage data counts

Example:
- Prompt with 0 GA clicks: 0 votes
- Prompt with 10 GA clicks: 10 votes
- Prompt with 100 GA clicks: 100 votes

## Excel Columns Mapping

| Excel Column | JSON Field | Notes |
|-------------|------------|-------|
| Title | title | Prompt name |
| Description | description | Brief explanation |
| Prompt | prompt | Full prompt text |
| Difficulty | difficulty | Simple/Medium/Complex |
| Target roles | targetRoles | Comma-separated roles |
| Category | category | Main category |
| Prompt uses (GA) | gaClicks + votes | GA data affects popularity |
| Verified | verified | Yes = verified |

## Features

- **Automatic sorting**: Prompts are sorted by popularity (votes)
- **Category icons**: Assigned based on category
- **GA tracking**: Raw GA clicks stored separately for analytics
- **Metadata**: Tracks last update time and version

## Tips

1. **Update GA data regularly** (weekly/monthly) to keep popularity accurate
2. **Verify high-performing prompts** to build trust
3. **Keep descriptions concise** for better display
4. **Use clear categories** for better organization

## Files

- `sync_use_cases.py` - Main sync script
- `sync.sh` - Simple bash wrapper
- `src/data/useCases.json` - Output JSON file (kept for backwards compatibility)
- `PROMPTS_GUIDE.md` - Data format documentation

## Troubleshooting

If sync fails:
1. Check Excel file exists and isn't open
2. Ensure Python 3 and pandas are installed
3. Check file permissions
4. Review error messages in terminal

## Future Enhancements

Consider adding:
- Automatic GA API integration
- Scheduled sync (cron job)
- Backup before sync
- Validation checks
- Diff reporting
