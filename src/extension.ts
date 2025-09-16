import convert from "color-convert"
import * as vscode from "vscode"

const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "color-to-hsl" is now active!')

  const disposable = vscode.commands.registerCommand(
    "color-to-hsl.convert-all",
    () => {
      vscode.window.showInformationMessage(
        "Convert colors from hex or rgb to hsl!"
      )
      const editor = vscode.window.activeTextEditor
      if (editor) {
        const document = editor.document
        const text = document.getText()
        const edits: vscode.TextEdit[] = []

        let match
        while ((match = hexRegex.exec(text)) !== null) {
          const hex = match[0]
          const startPos = document.positionAt(match.index)
          const endPos = document.positionAt(match.index + hex.length)
          const range = new vscode.Range(startPos, endPos)

          const [h, s, l] = convert.hex.hsl(hex)
          const hsl = `hsl(${h}, ${s}%, ${l}%)`

          edits.push(vscode.TextEdit.replace(range, hsl))
        }

        const workspaceEdit = new vscode.WorkspaceEdit()
        workspaceEdit.set(document.uri, edits)
        vscode.workspace.applyEdit(workspaceEdit)
      }
    }
  )
  context.subscriptions.push(disposable)
}

export function deactivate() {}
