# 💡 IdeaNest – Idea & Validation Tracker App

IdeaNest is a fully-featured React Native mobile app designed for creative entrepreneurs, developers, and startup founders to **capture, validate, and track progress on their ideas**.

Built with a beautiful dark theme, intuitive UX, and clean modular architecture, IdeaNest empowers users to go from _just an idea_ to a _validated product_ — one step at a time.

---

## 📱 App Features

### ✅ Dashboard

- Displays total ideas, favorites, in-progress, validated, dropped, and launched ideas
- Horizontally scrollable summary cards with beautiful icons and color indicators
- Shows recently edited ideas for quick access

### ✍️ Idea Management

- Create, update, and delete ideas with details like:
  - Title, Problem, Solution
  - Target Audience
  - Business Model, Monetization Strategy
  - Tech Stack, Notes
  - Status & Categories
- Toggle favorites (⭐) for quick filtering
- Filter ideas by categories like Tech, Health, AI, Real Estate, etc.

### 📊 Validation Tracker

- Add validation steps to each idea (e.g., surveys, landing pages, A/B tests)
- Track:
  - Description, Goal, Actual Result
  - Notes & Learnings
  - Completion toggle
- Visual progress bar with percentage completed
- Edit/Delete validation steps in a half-screen modal

---

## 🧱 Tech Stack

- **React Native** (UI and logic)
- **Expo** (development environment)
- **React Navigation** (bottom tab navigation)
- **React Context API** (for global state)
- **Custom Design System** (`gStyles` for global theming)

---

## 📁 Project Structure

├── components/ # All reusable UI components (buttons, modals, inputs)
├── lib/ # App constants, utilities, styles, and input configs
├── screens/ # Main screens: Dashboard, MyIdeas, Validation
├── store/ # Global state using Context API
├── App.js # Root file with Navigation and Providers
└── assets/fonts/ # Custom Inter fonts used across the app

---

## 🧠 State Management

- `ideaItem.js`: Manages all idea-related data (`idea`, `setIdea`)
- `selectedIdeaId.js`: Tracks currently selected idea for validation view

Providers are initialized in `App.js` and wrap the app to ensure accessibility throughout all components.

---

## 🧩 Component Highlights

### `AddIdeaBtn.js`

> Reusable "Add" button with plus icon and label.

### `DashboardData.js`

> Renders a data card in the dashboard with icon, number, and title.

### `ModalComponent.js`

> Full-screen modal for adding/editing an idea.

- Uses `inputTypes.js` to dynamically generate input fields.
- Includes picker for status and selectable categories.

### `HalfModal.js`

> Slide-up modal used to add/edit validation steps for a selected idea.

- Ensures all fields are filled
- Supports edit and delete functionality

### `ValidationComponent.js`

> Single validation step UI block showing:

- Completion state (toggle)
- Description, result, notes
- Timestamp (formatted using `timeCalc.js`)
- Edit button

### `ProgressComponent.js`

> Shows total vs. completed validation steps

- Dynamic progress bar
- Percentage text

### `IdeaComponent.js`

> Renders each idea card with:

- Title, status, categories, favorite star
- Status-based background color
- Tap to edit

---

## 🎨 Styling

All theme variables are defined in `lib/globalStyles.js`:

- Dark background and surface
- Golden accent
- Green success, Blue info, Red error
- Text coloring for readability

Fonts used:

- Inter (Light → Black)
- Installed and loaded via `expo-font`

---

## 🧪 Validation Flow

1. Select an idea via the dropdown (`IdeaPickerValuation`)
2. Press "Add Validation Step"
3. Fill out:
   - Step name, description, target, result, notes
4. Track progress dynamically
5. Tap validation step to toggle completion or edit

---

## 🔄 Navigation

Bottom tab navigation powered by `react-navigation`:

- `Dashboard`: Home analytics and recent ideas
- `MyIdeas`: All your ideas, organized by category
- `Validation`: Validation process and progress for selected idea

Tab configuration managed via `lib/navData.js` and `tabOptions.js`
