
# 🧠 CodeReviewerMax

CodeReviewerMax is a free, offline AI-powered code review extension for Visual Studio Code. It uses a locally hosted GPT4All model to analyze selected code and return professional feedback — no API keys or internet connection required.

---

## 🎥 Demo  
![CodeReviewMax Demo GIF](Animation.gif) <!-- Replace with your actual demo path -->

---

## 🚀 Features

- 🧠 Instant, AI-generated code reviews for selected code blocks
- 📑 Markdown-rendered feedback in a dedicated side panel
- 💾 Automatically saves feedback to `latest-code-review.md`
- 🖱️ Run via command or shortcut: `Ctrl + Alt + R`
- 💬 Status bar indicator shows progress while reviewing
- ✍️ Concise, developer-focused suggestions
- ✅ Fully offline (runs with GPT4All local server)

---

## ⚙️ Requirements

- **VS Code** v1.99.0 or higher
- **Node.js**
- **GPT4All Desktop App**
  - Enable the local API server under Settings
  - Make sure a model is loaded (e.g., *Mistral Instruct*)

> CodeReviewerMax connects to: `http://localhost:4891/v1/chat/completions`

---

## 📦 Getting Started

1. Clone this repository  
2. Run `npm install`  
3. Run `npm run compile`  
4. Press `F5` to launch the Extension Development Host  
5. Select code in any open file  
6. Press `Ctrl + Alt + R`  
7. View review in side panel and `latest-code-review.md`

---

## 🛠️ Build / Package

```bash
npm run compile         # Compile extension
npx vsce package        # Create .vsix (optional)
