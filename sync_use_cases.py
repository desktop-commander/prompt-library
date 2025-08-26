#!/usr/bin/env python3
"""
Sync Use Cases from Excel to JSON
Updates the website's use cases from the master Excel file.
Run this whenever you update the Excel file with new GA data or use cases.

IMPORTANT: This script maintains stable IDs for URL persistence.
"""

import pandas as pd
import json
import os
from datetime import datetime

# File paths
EXCEL_PATH = '/Users/ricardskrizanovskis/Downloads/Use case library (7).xlsx'
JSON_PATH = '/Users/ricardskrizanovskis/style-scout-dc/src/data/useCases.json'
ID_MAP_PATH = '/Users/ricardskrizanovskis/style-scout-dc/src/data/id_mapping.json'

# Icon mapping based on category
ICON_MAP = {
    'Code base exploration': 'FolderSearch',
    'Development': 'Code',
    'Data Analytics': 'BarChart3',
    'DevOps': 'Settings',
    'Code optimization': 'Zap',
    'File Management': 'FolderOpen',
    'Content': 'FileText',
    'Automation': 'PlayCircle',
    'Documentation': 'BookOpen',
    'System architecture': 'Layers'
}

def load_id_mapping():
    """Load existing ID mappings or create new file"""
    if os.path.exists(ID_MAP_PATH):
        with open(ID_MAP_PATH, 'r') as f:
            return json.load(f)
    else:
        return {
            "next_id": 1,
            "title_to_id": {},
            "deleted_ids": [],
            "notes": "This file maintains stable IDs for use cases. DO NOT edit manually unless necessary."
        }

def save_id_mapping(mapping):
    """Save ID mappings"""
    with open(ID_MAP_PATH, 'w') as f:
        json.dump(mapping, f, indent=2)

def get_stable_id(title, mapping):
    """Get a stable ID for a use case title"""
    # Clean the title for consistent matching
    clean_title = title.strip()
    
    # Check if this title already has an ID
    if clean_title in mapping['title_to_id']:
        return str(mapping['title_to_id'][clean_title])
    
    # Assign a new ID
    new_id = mapping['next_id']
    mapping['title_to_id'][clean_title] = new_id
    mapping['next_id'] = new_id + 1
    
    return str(new_id)

def sync_excel_to_json():
    """Main sync function"""
    print("🔄 Starting Excel to JSON sync...")
    
    # Load ID mapping
    id_mapping = load_id_mapping()
    print(f"📋 Loaded ID mapping with {len(id_mapping['title_to_id'])} existing use cases")
    
    # Read Excel file
    try:
        df = pd.read_excel(EXCEL_PATH)
        print(f"✅ Loaded {len(df)} use cases from Excel")
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        return
    
    # Track which IDs are still active
    active_ids = set()
    
    # Convert to JSON format
    use_cases_list = []
    
    for idx, row in df.iterrows():
        # Get stable ID based on title
        title = row['Title'].strip() if pd.notna(row['Title']) else f'Untitled_{idx}'
        stable_id = get_stable_id(title, id_mapping)
        active_ids.add(int(stable_id))
        
        # Parse target roles
        target_roles = []
        if pd.notna(row['Target roles']):
            roles_str = str(row['Target roles'])
            target_roles = [role.strip() for role in roles_str.split(',')]
        
        # Get GA clicks data (use directly as votes)
        ga_clicks = 0
        if 'Prompt uses (GA)' in row and pd.notna(row['Prompt uses (GA)']):
            ga_clicks = int(row['Prompt uses (GA)'])
        
        # Simple: votes = GA clicks (or 0 if no data yet)
        votes = ga_clicks
        
        # Determine icon based on category
        category = row['Category'] if pd.notna(row['Category']) else 'General'
        icon = ICON_MAP.get(category, 'Code')
        
        use_case = {
            "id": stable_id,
            "title": title,
            "description": row['Description'].strip() if pd.notna(row['Description']) else '',
            "prompt": row['Prompt'].strip() if pd.notna(row['Prompt']) else '',
            "difficulty": row['Difficulty'] if pd.notna(row['Difficulty']) else 'Intermediate',
            "targetRoles": target_roles if target_roles else ['Professionals'],
            "category": category,
            "votes": votes,
            "gaClicks": ga_clicks,  # Store raw GA clicks separately
            "icon": icon,
            "author": "DC team",
            "dateAdded": "2024-11-15",
            "verified": row['Verified'] == 'Yes' if pd.notna(row['Verified']) else False
        }
        
        use_cases_list.append(use_case)
    
    # Track deleted IDs (those not in current Excel)
    all_known_ids = set(id_mapping['title_to_id'].values())
    newly_deleted = all_known_ids - active_ids
    if newly_deleted:
        id_mapping['deleted_ids'].extend(list(newly_deleted))
        id_mapping['deleted_ids'] = list(set(id_mapping['deleted_ids']))  # Remove duplicates
        print(f"⚠️  Marked {len(newly_deleted)} use cases as deleted: {newly_deleted}")
    
    # Sort by ID to maintain consistent order
    use_cases_list.sort(key=lambda x: int(x['id']))
    
    # Create final JSON structure
    output = {
        "useCases": use_cases_list,
        "metadata": {
            "lastUpdated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "totalUseCases": len(use_cases_list),
            "totalIds": id_mapping['next_id'] - 1,
            "deletedIds": id_mapping['deleted_ids'],
            "version": "2.0.0",
            "source": "Excel sync script with stable IDs"
        }
    }
    
    # Save to JSON file
    try:
        with open(JSON_PATH, 'w') as f:
            json.dump(output, f, indent=2)
        print(f"✅ Successfully saved {len(use_cases_list)} use cases to JSON")
        
        # Save updated ID mapping
        save_id_mapping(id_mapping)
        print(f"💾 Saved ID mapping with {len(id_mapping['title_to_id'])} entries")
        
        # Print summary statistics
        verified_count = sum(1 for uc in use_cases_list if uc.get('verified'))
        ga_count = sum(1 for uc in use_cases_list if uc.get('gaClicks', 0) > 0)
        
        print(f"\n📊 Summary:")
        print(f"  - Total use cases: {len(use_cases_list)}")
        print(f"  - Verified use cases: {verified_count}")
        print(f"  - Use cases with GA data: {ga_count}")
        print(f"  - Next available ID: {id_mapping['next_id']}")
        print(f"  - Deleted IDs reserved: {len(id_mapping['deleted_ids'])}")
        
        if ga_count > 0:
            print(f"\n🔥 Top 5 by GA clicks:")
            sorted_by_ga = sorted(use_cases_list, key=lambda x: x.get('gaClicks', 0), reverse=True)[:5]
            for uc in sorted_by_ga:
                if uc.get('gaClicks', 0) > 0:
                    print(f"  - ID {uc['id']}: {uc['title']} ({uc['gaClicks']} clicks)")
        
    except Exception as e:
        print(f"❌ Error saving files: {e}")
        return
    
    print("\n✨ Sync complete! The website will auto-reload with updated data.")
    print("📌 IDs are stable and will persist across updates.")

if __name__ == "__main__":
    sync_excel_to_json()
