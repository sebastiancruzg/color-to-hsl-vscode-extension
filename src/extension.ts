import convert from "color-convert"
import * as vscode from "vscode"

const HEX_REGEX = /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/

function hexoHsl(hex: string): string {
  console.log(hex)
  const [h, s, l] = convert.hex.hsl(hex.startsWith("#") ? hex.slice(1) : hex)
  return `hsl(${h}, ${s}%, ${l}%)`
}

export class HexToHslProvider implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.Refactor
  ]

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    console.log("provideCodeActions called with range:", range)
    console.log("HEX_REGEX:", HEX_REGEX)

    const wordRange = document.getWordRangeAtPosition(range.start, HEX_REGEX)
    console.log("wordRange found:", wordRange)

    if (!wordRange) {
      console.log("No word range found, returning empty array")
      return []
    }

    const selectedText = document.getText(wordRange)
    console.log("Selected text:", selectedText)

    if (HEX_REGEX.test(selectedText)) {
      console.log("Text matches HEX_REGEX, converting to HSL")
      const hsl = hexoHsl(selectedText)
      if (hsl) {
        console.log("Conversion successful:", hsl)
        const action = new vscode.CodeAction(
          `Convert '${selectedText}' to '${hsl}'`,
          vscode.CodeActionKind.Refactor
        )

        action.edit = new vscode.WorkspaceEdit()
        action.edit.replace(document.uri, wordRange, hsl)

        return [action]
      }
    }
    console.log("No matching hex color found")
    return []
  }
}

export function activate(context: vscode.ExtensionContext) {
  const languages = ["css", "scss", "less", "javascript", "typescript", "html"]
  console.log("Color to HSL extension is activating...")

  // Show a notification to confirm the extension loaded
  vscode.window.showInformationMessage("Color to HSL extension activated!")

  for (const lang of languages) {
    const provider = vscode.languages.registerCodeActionsProvider(
      lang,
      new HexToHslProvider(),
      {
        providedCodeActionKinds: HexToHslProvider.providedCodeActionKinds
      }
    )
    context.subscriptions.push(provider)
  }

  console.log("Color to HSL extension fully activated!")
}

export function deactivate() {}
