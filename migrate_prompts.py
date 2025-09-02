#!/usr/bin/env python3
"""
Prompt Library Migration Script
Migrates CSV data to JSON format with ID preservation
"""

import pandas as pd
import json
import random
from datetime import datetime
from difflib import SequenceMatcher

def similarity(a, b):
    """Calculate similarity between two strings"""
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def clean_string_list(text):
    """Clean and split comma-separated strings"""
    if pd.isna(text) or text == '':
        return []
    return [item.strip() for item in str(text).split(',') if item.strip()]

def normalize_session_type(difficulty):
    """Normalize session type format"""
    if pd.isna(difficulty):
        return 'Instant output'
    
    difficulty_str = str(difficulty).strip().lower()
    if 'step' in difficulty_str:
        return 'Step-by-step flow'
    else:
        return 'Instant output'

def main():
    print('🔄 PROMPT LIBRARY MIGRATION')
    print('=' * 50)
    
    # Load data
    print('📖 Loading source data...')
    csv_df = pd.read_csv('/Users/ricardskrizanovskis/Downloads/Use case library - Sheet1 (1).csv')
    
    # Check if we need to backup current JSON
    try:
        with open('/Users/ricardskrizanovskis/style-scout-dc/src/data/useCases.json', 'r') as f:
            current_data = json.load(f)
        print(f'📊 Current JSON: {len(current_data["useCases"])} prompts')
        
        # Create backup if it doesn't exist
        try:
            with open('/Users/ricardskrizanovskis/style-scout-dc/src/data/useCases.json.backup', 'r') as f:
                pass
            print('📋 Backup already exists')
        except FileNotFoundError:
            print('💾 Creating backup...')
            with open('/Users/ricardskrizanovskis/style-scout-dc/src/data/useCases.json.backup', 'w') as f:
                json.dump(current_data, f, indent=2)
            print('✅ Backup created')
        
        # Build mapping of existing titles to data
        current_titles_to_data = {uc['title']: uc for uc in current_data['useCases']}
        
    except FileNotFoundError:
        print('📝 No existing JSON found, creating new one')
        current_titles_to_data = {}
    
    print(f'📊 New CSV: {len(csv_df)} prompts')
    
    # Available icons for random assignment
    available_icons = [
        'FolderSearch', 'FolderOrganize', 'Code', 'BarChart3', 'Settings',
        'FileText', 'Archive', 'Shield', 'Database', 'TestTube',
        'Clock', 'RefreshCw', 'ArrowRightLeft', 'Activity', 'Search'
    ]
    
    # Process each row
    new_prompts = []
    id_counter = 1
    
    print('🔄 Processing prompts...')
    
    for index, row in csv_df.iterrows():
        title = str(row['Title']).strip()
        
        # Check for exact match
        if title in current_titles_to_data:
            # Preserve existing ID and update data
            existing = current_titles_to_data[title]
            prompt_id = existing['id']
            print(f'✅ Preserving ID {prompt_id} for "{title}"')
        else:
            # Check for similar match
            best_match = None
            best_score = 0
            
            for existing_title in current_titles_to_data:
                score = similarity(title, existing_title)
                if score > 0.85:  # 85% similarity threshold
                    if score > best_score:
                        best_score = score
                        best_match = existing_title
            
            if best_match:
                existing = current_titles_to_data[best_match]
                prompt_id = existing['id']
                print(f'🔄 Similar match: "{title}" → "{best_match}" (ID {prompt_id}, {best_score:.1%})')
            else:
                # Find next available ID
                while any(p.get('id') == str(id_counter) for p in new_prompts if 'id' in p):
                    id_counter += 1
                prompt_id = str(id_counter)
                id_counter += 1
                print(f'🆕 New prompt: "{title}" (ID {prompt_id})')
        
        # Build new prompt object
        new_prompt = {
            'id': prompt_id,
            'title': title,
            'description': str(row['Description']).strip(),
            'prompt': str(row['Prompt']).strip(),
            'sessionType': normalize_session_type(row['Difficulty']),
            'targetRoles': clean_string_list(row['Target roles']),
            'categories': clean_string_list(row['Category']),
            'votes': int(row['Prompt uses (GA)']) if not pd.isna(row['Prompt uses (GA)']) else 0,
            'gaClicks': int(row['Prompt uses (GA)']) if not pd.isna(row['Prompt uses (GA)']) else 0,
            'icon': random.choice(available_icons),
            'author': 'DC team' if str(row['Status']).strip() == 'DC Team' else str(row['Status']).strip(),
            'verified': bool(row['Verified']) if not pd.isna(row['Verified']) else False
        }
        
        new_prompts.append(new_prompt)
    
    # Sort by ID
    new_prompts.sort(key=lambda x: int(x['id']))
    
    # Create final JSON structure
    output_data = {
        'useCases': new_prompts
    }
    
    # Write to file
    print('💾 Writing new JSON file...')
    with open('/Users/ricardskrizanovskis/style-scout-dc/src/data/useCases.json', 'w') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print('✅ Migration completed!')
    print(f'📊 Final result: {len(new_prompts)} prompts')
    print(f'📋 Session types: {len([p for p in new_prompts if p["sessionType"] == "Instant output"])} Instant output, {len([p for p in new_prompts if p["sessionType"] == "Step-by-step flow"])} Step-by-step flow')
    
    return True

if __name__ == '__main__':
    main()
