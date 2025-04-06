import * as vscode from 'vscode';
import fetch from 'node-fetch';

export function activate(context: vscode.ExtensionContext) {
  console.log('✅ codereviewermax is active (GPT4All powered)');

  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  statusBar.text = '🧠 Ready to review';
  statusBar.show();
  context.subscriptions.push(statusBar);

  const disposable = vscode.commands.registerCommand('codereviewermax.reviewCode', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor window.');
      return;
    }

    const selection = editor.selection;
    const code = editor.document.getText(selection);

    if (!code.trim()) {
      vscode.window.showWarningMessage('Please select some code to review.');
      return;
    }

    statusBar.text = '🧠 Reviewing code...';

    try {
      const response = await fetch('http://localhost:4891/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt4all',
          messages: [
            {
              role: 'user',
              content:
                `You are a senior software engineer. Your task is to carefully review the following Python code and provide one short, high-quality explanation or piece of advice.\n\n` +
                `This is not a style review. You must avoid making up bugs or assumptions. Review only what is actually present in the code.\n\n` +
                `Follow these rules strictly:\n` +
                `- Do NOT mention indentation or formatting unless it's visibly broken.\n` +
                `- Do NOT guess — never suggest variables are undefined if they exist.\n` +
                `- Do NOT warn about infinite loops unless a while-loop or recursion is clearly present.\n` +
                `- Do NOT provide rewritten code unless absolutely necessary to clarify a point.\n` +
                `- DO point out real logic issues, invalid operations, or weak error handling.\n` +
                `- DO suggest input validation if it’s clearly missing.\n` +
                `- DO keep your response under 4 sentences. Be helpful, professional, and brief.\n\n` +
                `Code to review:\n` +
                `\`\`\`python\n${code}\n\`\`\``
            }
          ],
          max_tokens: 300
        })
      });

      const json = await response.json();
      const reply = json?.choices?.[0]?.message?.content?.trim() || '⚠️ GPT4All did not return a valid response.';

      // ✅ Save to markdown file in workspace
      const fileName = `latest-code-review.md`;
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (workspaceFolders) {
        const filePath = vscode.Uri.joinPath(workspaceFolders[0].uri, fileName);
        vscode.workspace.fs.writeFile(filePath, Buffer.from(reply, 'utf8'));
        vscode.window.showInformationMessage(`📄 Review saved as ${fileName}`);
      }

      // ✅ Show webview with clean output
      const panel = vscode.window.createWebviewPanel(
        'codeReviewerMaxPanel',
        '🧠 Code Review Feedback',
        vscode.ViewColumn.Beside,
        { enableScripts: false }
      );

      panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              padding: 1.2rem;
              line-height: 1.6;
            }
            h2 {
              color: #007acc;
            }
            code {
              background: #eee;
              padding: 2px 4px;
              border-radius: 4px;
              font-family: monospace;
            }
            pre {
              background: #f5f5f5;
              padding: 10px;
              border-radius: 6px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <h2>🧠 Code Review Result</h2>
          <div>${reply.replace(/\n/g, '<br>')}</div>
        </body>
        </html>
      `;

      statusBar.text = '✅ Review complete';
    } catch (err) {
      statusBar.text = '❌ Failed to review';
      vscode.window.showErrorMessage('❌ Could not connect to GPT4All API.');
      console.error(err);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
