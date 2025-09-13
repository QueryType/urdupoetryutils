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

## Quick Start

### Option 1: Local HTTP Server (Recommended)
```bash
# Start a local server
python3 -m http.server 8000

# Open in browser
http://localhost:8000/index.html
```

### Option 2: Direct File Access
Simply open `index.html` in any modern web browser.

## Usage

### Getting Started
1. Open the application in your web browser
2. Choose from the available tools:
   - **Meter Analysis**: For analyzing poetry meter and rhythm
   - **Reverse Transliterator**: For converting Unicode text to roman script

### Meter Analysis Tool
1. Navigate to the Meter Analysis page (`meter.html`)
2. Enter your Urdu poetry in Devanagari Unicode format
3. Click "Analysis" to get CV structure breakdown
4. Use the pattern search to find matching classical meters

**Pattern Search Examples:**
- `212212` - Find exact 6-syllable pattern
- `21x2x2` - Find patterns with flexible positions
- Search modes: Exact, Starts With, Ends With

### Reverse Transliterator
1. Navigate to the Reverse Transliterator page (`reversetransliterator.html`)
2. Select your source language (Hindi/Telugu)
3. Paste Unicode text in the input area
4. Click "Press to reverse transliterate" to convert

## Dependencies

### External Libraries
- **Google Transliteration API**: Used for input assistance in Devanagari text entry
  - Loaded from: `https://www.google.com/jsapi`
  - Provides English-to-Hindi transliteration support
  - **Note**: Requires internet connection for transliteration features
  - **Fallback**: Application works without internet, but transliteration input assistance will be unavailable

### Browser Requirements
- Modern web browser with JavaScript enabled
- Unicode font support for proper Devanagari display
- Internet connection (optional, for transliteration input assistance)

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
├── index.html                    # Main landing page
├── meter.html                   # Meter analysis tool
├── reversetransliterator.html   # Transliteration tool
├── test-functionality.html      # Comprehensive test suite
├── TEST_RESULTS.md              # Test documentation
├── .gitignore                   # Git ignore rules
└── js/
    ├── cvAnalyse.js            # CV structure analysis
    ├── mt.js                   # Meter detection and behr database
    ├── reverse.js              # Reverse transliteration logic
    └── utils.js                # Utility functions
```

### Recent Improvements (2024)
- ✅ **Modernized HTML**: Updated to HTML5 standards
- ✅ **Enhanced JavaScript**: Improved error handling and input validation
- ✅ **Better Styling**: Added responsive CSS for improved user experience
- ✅ **Code Quality**: Fixed syntax issues and improved browser compatibility
- ✅ **Testing Suite**: Added comprehensive functionality tests

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (with responsive design improvements)
- Graceful degradation when external APIs are unavailable

## Testing

Run the test suite by opening `test-functionality.html` in your browser to verify all features are working correctly.

## Contributing

This is an open-source project. Contributions are welcome for:
- Adding new meter patterns
- Improving transliteration accuracy
- Supporting additional languages
- UI/UX enhancements
- Code quality improvements

### Development Setup
1. Clone the repository
2. Start a local HTTP server: `python3 -m http.server 8000`
3. Open `http://localhost:8000/test-functionality.html` to run tests
4. Make changes and test thoroughly before submitting

## License

Open source - feel free to use, modify, and distribute.

---

*A tool for preserving and analyzing the rich tradition of Urdu poetry*
