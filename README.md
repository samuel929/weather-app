
# 🌤️ Weather App

A responsive and interactive weather application that displays current weather, a 3-day forecast, and 3-day historical weather data with smooth animations and local caching.

## 🚀 Features

### 1. 📍 Current Weather
- Displays real-time weather for a user-specified location.

### 2. 📅 3-Day Forecast & History
- View upcoming 3-day weather predictions.
- Review past 3-day historical weather data.
- Presented in a clean grid/list layout.

### 3. 🖱️ Interactive Day Selection
- Click on any weather tile to update the main display.
- See detailed data (temperature, humidity, wind, etc.) for the selected day.

### ✨ Bonus Features

- ✅ **Smooth Transitions**: Integrated with `framer-motion` for animations.
- 📱 **Responsive Design**: Works seamlessly across mobile and desktop.
- 🧠 **Smart Caching**: Utilizes browser local storage.
- ✅ **Clean Commit History**: Commits are structured and easy to follow for collaboration and code review.

---

## 📦 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS, `tw-animate-css`, `clsx`, `tailwind-merge`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Linting**: ESLint + TypeScript
- **Component Composition**: Radix UI Slot

---

## 🛠️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/samuel929/weather-app
   cd weather-app
   ```

2. **Install dependencies**
```
npm install --legacy-peer-deps

```

3. **Start the development server**

```
npm run dev
```
📁 Project Structure
```
src/
│
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── app.tsx             # Main page views
├── api/               # fetching of data.
├── types/            # type script types 
└── utils/             # Helper functions and API logic
