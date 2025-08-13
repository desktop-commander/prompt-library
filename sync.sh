#!/bin/bash

# Simple script to sync use cases from Excel to JSON
# Run this after updating the Excel file with new GA data

echo "🚀 Syncing Use Cases from Excel to Website..."
echo ""

# Run the Python sync script
python3 sync_use_cases.py

echo ""
echo "📝 To view changes, check http://localhost:8083"
echo ""
