# 🧠 CodeReviewerMax

**CodeReviewerMax** is a free, offline, AI-powered code reviewer extension for Visual Studio Code.

It lets you highlight code in your editor and instantly get AI-generated feedback — focused on readability, logic, and bug prevention — using a local model (GPT4All or Flask-based backend). No OpenAI API keys required.

---

## 🎥 Demo

![CodeReviewerMax Demo](Animation.gif)

---

## 🚀 Features

- 🧠 AI-generated code reviews based on selected code
- ✍️ Concise, professional feedback (not verbose)
- 📑 Markdown-rendered feedback in a clean side panel
- 💾 Automatically saves `latest-code-review.md` in your workspace
- 🖱️ Trigger with command or shortcut: `Ctrl + Alt + R`
- ✅ Fully offline (powered by GPT4All or local Flask backend)
- 💬 Status bar shows progress while reviewing

---

## ⚙️ Requirements

- **VS Code 1.99.0+**
- **Node.js** (for building extension)
- **Backend AI API running on** `http://localhost:4891`

You can run either of:
- 🧠 [GPT4All App with Local Server](https://gpt4all.io/)
- 🧪 Flask server with CodeT5 or StarCoder model

---

## 📦 Getting Started

1. Clone this repo  
2. Run `npm install`  
3. Run `npm run compile`  
4. Press `F5` to launch a Development Host  
5. Select code in an open file  
6. Press `Ctrl + Alt + R`  
7. View review in side panel and in `latest-code-review.md`

---

## 🧪 Optional Flask Backend

You can use the [CodeReviewer Flask server](https://github.com/your-backend-repo-link) to run models like CodeT5+ or StarCoderBase locally.

---

## 🛠️ Building / Packaging

```bash
npm run compile       # Compile the extension
vsce package          # (Optional) Create VSIX package for publishing
