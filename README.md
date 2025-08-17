<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# GauravFlow — Modern To‑Do List Web App ✨✅

A sleek, responsive, and feature-rich to‑do app built with HTML, CSS, Bootstrap, and vanilla JavaScript. Designed for a delightful user experience with modern UI, smooth interactions, and powerful task management features. 🚀

***

## 🌟 Features

- Add, edit, delete tasks with inline editing ✍️
- Mark tasks as complete/incomplete ✅
- Smart filters: All, Pending, Completed, High Priority 🔍
- Real-time search to quickly find tasks 🔎
- Priority levels with color coding: High, Medium, Low 🟥🟧🟩
- Categories/tags: Work, Personal, Health, Shopping, Education 🏷️
- Date/time stamps for creation and completion ⏱️
- Drag-and-drop task reordering ✋➡️
- Bulk actions: complete or delete multiple tasks at once 📦
- Export tasks to JSON for backup or sharing 📤
- Light/Dark theme toggle 🌞🌙
- Live stats: total, pending, completed 📊
- Keyboard shortcuts for power users ⌨️
- Fully responsive layout for mobile, tablet, and desktop 📱💻

***

## 🧱 Tech Stack

- HTML5
- CSS3 (custom styles)
- Bootstrap 5
- Font Awesome Icons
- Vanilla JavaScript (ES6+)

No frameworks, no build tools — just open and run! ⚡

***

## 📂 Project Structure

```
modern-todo-app/
├─ index.html        # Main UI and layout
├─ style.css         # Custom styles (light/dark themes, animations)
├─ app.js            # App logic (state, events, rendering)
└─ assets/           # (optional) images or icons if added later
```


***

## 🚀 Getting Started

1. Clone the repository:
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
2. Open the app:
    - Double-click index.html, or
    - Start a simple local server:
        - Python: python -m http.server 8080
        - Node (http-server): npx http-server -p 8080
3. Enjoy managing tasks with style! 😄

***

## 🧠 How It Works

- In-memory state stores tasks during a session (can be adapted to localStorage).
- Each task has:
    - id, title, description, priority, category,
    - completed, createdAt, completedAt, order
- DOM is updated efficiently with event-driven rendering.
- Drag-and-drop updates the order field to persist the visual sequence.
- Filters and search are combined to refine visible tasks.

***

## 💡 Keyboard Shortcuts

- Ctrl+Enter: Add task quickly ➕
- Delete: Remove selected tasks 🗑️
- Esc: Cancel edit or clear selection ❌

***

## 🧭 UI Guide

- Header: App title (GauravFlow), theme toggle, and live stats.
- Add Task Card: Title, description, priority, category, Add button.
- Filters \& Search: Tabs for All/Pending/Completed/High Priority + search bar.
- Task List: Reorder by drag-and-drop; click to edit inline; check to complete.
- Footer: Bulk select, bulk complete/delete, export tasks.

***

## 🔒 Data Persistence

- Default: In-memory (ideal for demos and GitHub Pages).
- Optional upgrade: Replace internal store with localStorage for persistence across sessions:
    - On load: tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    - On change: localStorage.setItem('tasks', JSON.stringify(tasks))

***

## 🖼️ Screens \& States

- Light/Dark themes 🌗
- Empty state with friendly prompts 🙂
- Completed tasks with strikethrough and subtle opacity ✨
- Priority badges: High (red), Medium (orange), Low (green) 🎯
- Toast notifications for feedback 🔔

***

## 🔌 Integration Points

- Export JSON: One-click export of current tasks for backup or sharing.
- Categories \& Priorities: Extend easily by editing dropdown sources in app.js.
- Theming: CSS variables in style.css make color scheme adjustments easy.

***

## 🧪 Testing Checklist

- Add tasks with all fields 🟢
- Edit inline and save/cancel 🟢
- Toggle complete/incomplete 🟢
- Drag to reorder, refresh to confirm order persists in session 🟢
- Filter and search combinations 🟢
- Bulk select + bulk complete/delete 🟢
- Export JSON and validate structure 🟢
- Theme toggle across all screens 🟢
- Responsive layout on mobile/tablet/desktop 🟢

***

## 🔧 Configuration

- Default categories: work, personal, health, shopping, education
- Default priorities: high, medium, low
- Sample tasks included for quick start (can be removed)

***

## 🖌️ Design Notes

- Gradient primary: \#667eea → \#764ba2 for accents and call-to-actions 🎨
- Smooth transitions for hover, focus, and list updates
- Accessible colors and ARIA labels for better usability ♿
- Font Awesome icons for clarity and delight

***

## 🗺️ Roadmap

- Subtasks and checklists
- Due dates and reminders
- LocalStorage/IndexedDB persistence
- PWA support for offline and installable app
- Import from JSON
- Shareable public lists

Have a suggestion? Open an issue — contributions are welcome! 🙌

***

## 🐞 Troubleshooting

- Tasks not saving? In the current version, data is in-memory only. Switch to localStorage for persistence.
- Drag-and-drop not working? Ensure the browser isn’t blocking scripts and no extensions interfere.
- Icons missing? Confirm Font Awesome CDN is reachable.

***

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: git checkout -b feat/awesome-idea
3. Commit changes: git commit -m "Add awesome idea"
4. Push: git push origin feat/awesome-idea
5. Open a Pull Request

***

## 📜 License

This project is open-source under the MIT License. 🪪

***

## 💬 Credits

Crafted with care for Gaurav ❤️
Name inspiration: GauravFlow — smooth, focused, and productive! 🌊🧠

***

## 🔗 Badges (optional)

- Made with HTML -  CSS -  JavaScript 🧩
- Bootstrap 5 Powered 💙
- Responsive \& Accessible 📱♿

If a ready-to-use README.md file is preferred, this entire content can be copied directly into README.md in the repository. Let me know if the app title should be replaced with another remix of “Gaurav” (e.g., GauDo, TaskGrav, Gauravity), and I’ll tailor the branding and screenshots accordingly. 😊

