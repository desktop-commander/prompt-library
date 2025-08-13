# Use Case ID Management System

## Overview
This project uses a **stable ID system** to ensure that use case URLs remain permanent and shareable, even when use cases are added, removed, or reordered.

## Key Principle: IDs Never Change
Once a use case is assigned an ID, that ID stays with it forever. This ensures:
- ✅ Shared links always work
- ✅ Bookmarks remain valid
- ✅ Analytics tracking is consistent
- ✅ SEO benefits from stable URLs

## How It Works

### ID Assignment
1. **First time**: When a new use case is added to Excel, it gets the next available ID
2. **Updates**: If you edit a use case title/description/etc, it keeps the same ID
3. **Deletion**: If you remove a use case, its ID is retired (not reused)
4. **Re-addition**: If you add back a previously deleted use case (same title), it gets its old ID back

### File Structure
```
src/data/
├── useCases.json       # Main data file with use cases
├── id_mapping.json     # ID tracking system (DO NOT EDIT MANUALLY)
└── ...
```

## The ID Mapping File

`id_mapping.json` structure:
```json
{
  "next_id": 52,                    // Next ID to assign
  "title_to_id": {                  // Title → ID mappings
    "Explore and Understand New Repository": 1,
    "Build Complete Feature from Scratch": 2,
    ...
  },
  "deleted_ids": [15, 23],          // IDs of deleted use cases (reserved)
  "notes": "..."
}
```

## Featured Use Cases Configuration

The homepage features 6 specific use cases. To update these:

1. Edit `src/pages/Index.tsx`
2. Find the `featuredTitles` array:
```javascript
const featuredTitles = [
  'Explore and Understand New Repository',  // ID: 1
  'Organise my Downloads folder',            // ID: 8
  'Build Complete Feature from Scratch',     // ID: 2
  'Analyze My Data File',                    // ID: 3
  'Set Up Development Environment',          // ID: 4
  'Understand React Component Architecture'  // ID: 6
];
```
3. Update with exact titles from your Excel

## URL Structure

Use cases have these URL formats:
- Homepage: `https://yoursite.com/?i=1`
- Use Cases page: `https://yoursite.com/use-cases?i=1`

Where `1` is the stable use case ID.

## Managing Use Cases

### Adding New Use Cases
1. Add to Excel file
2. Run sync: `./sync.sh`
3. New use case gets next available ID automatically
4. URL will be: `/?i=52` (or whatever the next ID is)

### Updating Existing Use Cases
1. Edit in Excel (keep same title for same ID)
2. Run sync: `./sync.sh`
3. ID remains the same
4. All existing links continue working

### Deleting Use Cases
1. Remove from Excel
2. Run sync: `./sync.sh`
3. ID is marked as "deleted" and reserved
4. Links to deleted use cases will show 404 or redirect

### Renaming Use Cases
⚠️ **Warning**: Changing a title creates a NEW ID!

To rename while keeping the same ID:
1. Note the current ID
2. Edit `id_mapping.json` to update the title key
3. Update Excel with new title
4. Run sync

Or better: Keep title same in Excel, only change display in UI if needed.

## Best Practices

### DO ✅
- Always run sync script after Excel changes
- Keep `id_mapping.json` in version control
- Use exact titles when featuring use cases
- Test links after major changes

### DON'T ❌
- Manually edit `id_mapping.json` (unless fixing issues)
- Change use case titles unnecessarily
- Reuse deleted IDs for different use cases
- Delete `id_mapping.json` (you'll lose all ID history!)

## Troubleshooting

### "Use case not found" on valid URL
- Check if use case was deleted from Excel
- Verify ID exists in `useCases.json`
- Ensure sync script ran successfully

### Featured use cases not showing
- Check exact title match in `featuredTitles` array
- Verify use case exists in Excel
- Run sync to update

### Duplicate IDs appearing
- Check `id_mapping.json` for conflicts
- Ensure sync script is using latest version
- Don't run multiple syncs simultaneously

## Emergency Recovery

If `id_mapping.json` is lost or corrupted:

1. Check Git history for last good version
2. Or rebuild from current `useCases.json`:
```python
# Emergency rebuild script
import json

with open('src/data/useCases.json', 'r') as f:
    data = json.load(f)

mapping = {
    "next_id": max([int(uc['id']) for uc in data['useCases']]) + 1,
    "title_to_id": {uc['title']: int(uc['id']) for uc in data['useCases']},
    "deleted_ids": [],
    "notes": "Rebuilt from useCases.json"
}

with open('src/data/id_mapping.json', 'w') as f:
    json.dump(mapping, f, indent=2)
```

## For Developers

When implementing features that use use case IDs:
- Always use the `id` field, never array indices
- Treat IDs as strings in JavaScript/TypeScript
- Keep IDs stable through all operations
- Include ID in any exports/imports

## Questions?

If you need to:
- Merge use cases → Keep the lower ID, mark higher as deleted
- Split use cases → Original keeps ID, new parts get new IDs
- Bulk import → Let sync script assign IDs automatically
