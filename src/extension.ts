import convert from "color-convert"
import * as vscode from "vscode"

const HEX_REGEX = /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/

function hexoHsl(hex: string): string {
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
    const wordRange = document.getWordRangeAtPosition(range.start, HEX_REGEX)

    if (!wordRange) {
      return []
    }

    const selectedText = document.getText(wordRange)

    if (!HEX_REGEX.test(selectedText)) {
      return []
    }

    const hsl = hexoHsl(selectedText)
    const action = new vscode.CodeAction(
      `Convert '${selectedText}' to '${hsl}'`,
      vscode.CodeActionKind.Refactor
    )

    action.edit = new vscode.WorkspaceEdit()
    action.edit.replace(document.uri, wordRange, hsl)

    return [action]
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCodeActionsProvider(
    "*",
    new HexToHslProvider(),
    {
      providedCodeActionKinds: HexToHslProvider.providedCodeActionKinds
    }
  )
  context.subscriptions.push(provider)
}

export function deactivate() {}
