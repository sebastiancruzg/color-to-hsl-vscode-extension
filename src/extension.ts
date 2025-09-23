import * as vscode from "vscode"

const HEX_REGEX = /#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/

async function hexoHsl(hex: string): Promise<string> {
  const convert = await import("color-convert")
  const [h, s, l] = convert.default.hex.hsl(
    hex.startsWith("#") ? hex.slice(1) : hex
  )
  return `hsl(${h}, ${s}%, ${l}%)`
}

async function convertAllHexToHsl() {
  const editor = vscode.window.activeTextEditor

  if (!editor) {
    vscode.window.showErrorMessage("No active editor found")
    return
  }

  const document = editor.document
  const text = document.getText()
  const matches = text.matchAll(new RegExp(HEX_REGEX, "g"))

  const edit = new vscode.WorkspaceEdit()

  for (const match of matches) {
    if (match.index !== undefined) {
      const startPos = document.positionAt(match.index)
      const endPos = document.positionAt(match.index + match[0].length)
      const range = new vscode.Range(startPos, endPos)
      const hsl = await hexoHsl(match[0])
      edit.replace(document.uri, range, hsl)
    }
  }

  vscode.workspace.applyEdit(edit)
}

export class HexToHslProvider implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.Refactor
  ]

  public async provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): Promise<vscode.CodeAction[]> {
    const wordRange = document.getWordRangeAtPosition(range.start, HEX_REGEX)

    if (!wordRange) {
      return []
    }

    const selectedText = document.getText(wordRange)

    if (!HEX_REGEX.test(selectedText)) {
      return []
    }

    const hsl = await hexoHsl(selectedText)
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

  const convertAllCommand = vscode.commands.registerCommand(
    "color-converter.convert-to-hsl",
    convertAllHexToHsl
  )
  context.subscriptions.push(convertAllCommand)
}

export function deactivate() {}
