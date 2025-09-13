# Urdu Poetry Utils

A comprehensive web-based toolkit for analyzing Urdu poetry, providing meter analysis and transliteration utilities for poets, scholars, and enthusiasts.

## Features

### 🎵 Urdu Meter Analysis
- **CV Analysis**: Converts Urdu text (in Devanagari Unicode) to consonant-vowel (CV) structures
- **Behr Detection**: Identifies classical Urdu poetry meters (behr) from syllable patterns
- **Pattern Matching**: Search for meters using exact match, starts with, or ends with patterns
- **Flexible Input**: Supports pattern input with wildcards (1=short, 2=long, x=flexible)
- **Comprehensive Database**: Includes 50+ classical Urdu meters with their arkaan patterns

### 🔄 Reverse Transliterator
- **Unicode to Roman**: Converts Devanagari Unicode text back to romanized form
- **Multi-language Support**: Currently supports Hindi with Telugu support framework
- **Smart Processing**: Handles implicit vowels and consonant clusters intelligently
- **Debug Mode**: Provides detailed character-by-character conversion analysis

## Usage

### Getting Started
1. Open `index.html` in your web browser
2. Choose from the available tools:
   - **Meter Analysis**: For analyzing poetry meter and rhythm
   - **Reverse Transliterator**: For converting Unicode text to roman script

### Meter Analysis Tool
1. Navigate to the Meter Analysis page
2. Enter your Urdu poetry in Devanagari Unicode format
3. Click "Analysis" to get CV structure breakdown
4. Use the pattern search to find matching classical meters

**Pattern Search Examples:**
- `212212` - Find exact 6-syllable pattern
- `21x2x2` - Find patterns with flexible positions
- Search modes: Exact, Starts With, Ends With

### Reverse Transliterator
1. Navigate to the Reverse Transliterator page
2. Select your source language (Hindi/Telugu)
3. Paste Unicode text in the input area
4. Click "Press to reverse transliterate" to convert

## Technical Details

### Supported Meters
The tool includes classical Urdu meters such as:
- Hazaj (various forms)
- Ramal (multiple variations)
- Mutaqaarib
- Rajaz
- Mutadaarik
- Kaamil
- And many more...

### File Structure
```
├── index.html              # Main landing page
├── meter.html             # Meter analysis tool
├── reversetransliterator.html  # Transliteration tool
└── js/
    ├── cvAnalyse.js       # CV structure analysis
    ├── mt.js              # Meter detection and behr database
    ├── reverse.js         # Reverse transliteration logic
    └── utils.js           # Utility functions
```

### Browser Compatibility
- Works in modern web browsers with JavaScript enabled
- Requires Unicode font support for proper Devanagari display
- Uses Google Transliteration API for input assistance

## Contributing

This is an open-source project. Contributions are welcome for:
- Adding new meter patterns
- Improving transliteration accuracy
- Supporting additional languages
- UI/UX enhancements

## License

Open source - feel free to use, modify, and distribute.

---

*A tool for preserving and analyzing the rich tradition of Urdu poetry*
