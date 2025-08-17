
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
```


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

## 🐞 Troubleshooting

- Tasks not saving? In the current version, data is in-memory only. Switch to localStorage for persistence.
- Drag-and-drop not working? Ensure the browser isn’t blocking scripts and no extensions interfere.
- Icons missing? Confirm Font Awesome CDN is reachable.

***


## 🔗 Badges

- Made with HTML -  CSS -  JavaScript 🧩
- Bootstrap 5 Powered 💙
- Responsive \& Accessible 📱♿

