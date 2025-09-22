# Color Converter - VS Code Extension

A VS Code extension that provides quick and easy conversion of hex colors to HSL format. Perfect for web developers and designers working with CSS, SCSS, LESS, JavaScript, TypeScript, and HTML files.

## Features

- **Instant Color Conversion**: Convert hex colors to HSL format with a simple right-click action
- **Code Actions Integration**: Seamlessly integrated with VS Code's quick fix menu (Ctrl+.)
- **Multi-language Support**: Works with CSS, SCSS, LESS, JavaScript, TypeScript, and HTML files
- **Command Palette**: Convert all hex colors in a file at once using the command palette
- **Regex-based Detection**: Automatically detects various hex color formats (#RGB, #RRGGBB, #RGBA, #RRGGBBAA)

### How to Use

1. **Individual Color Conversion**:

   - Place your cursor on or near a hex color (e.g., `#ff0000`)
   - Right-click and select "Convert '#ff0000' to 'hsl(0, 100%, 50%)'"
   - Or use Ctrl+. to open the quick actions menu

2. **Bulk Conversion**:
   - Open the Command Palette (Ctrl+Shift+P)
   - Type "Convert colors to HSL"
   - All hex colors in the current file will be converted to HSL format

### Supported Color Formats

- 3-digit hex: `#f00` → `hsl(0, 100%, 50%)`
- 6-digit hex: `#ff0000` → `hsl(0, 100%, 50%)`
- 4-digit hex with alpha: `#f00f` → `hsl(0, 100%, 50%)`
- 8-digit hex with alpha: `#ff0000ff` → `hsl(0, 100%, 50%)`

## Requirements

- VS Code version 1.104.0 or higher
- No additional dependencies required

## Extension Commands

This extension contributes the following commands:

- `color-converter.convert-to-hsl`: Convert all hex colors in the current file to HSL format

## Supported Languages

- CSS
- SCSS
- LESS
- JavaScript
- TypeScript
- HTML

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Color Converter"
4. Click Install

## Known Issues

- Currently only supports hex to HSL conversion
- Alpha channel values in hex colors are detected but not converted to HSL alpha values

## Release Notes

### 0.0.1

- Initial release
- Basic hex to HSL conversion functionality
- Code actions for individual color conversion
- Command palette integration for bulk conversion
- Support for multiple file types and hex color formats

## Contributing

Found a bug or have a feature request? Please open an issue on the [GitHub repository](https://github.com/sebastiancruzg/color-to-hsl-vscode-extension).

## License

This extension is licensed under the MIT License.
