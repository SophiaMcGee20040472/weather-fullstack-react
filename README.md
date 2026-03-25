# City Weather App (Fullstack React + .NET)

A modern, playful weather dashboard designed for **everyday people** not just technical users.

This app delivers real-time weather, timezone, and astronomy data in a way that feels **clear, friendly, and a little whimsical**, rather than overwhelming or corporate.

Built with **React, Chakra UI, Vitest, Storybook, and a secure .NET backend**.

---

## Why I Built This

Most weather apps are functional but they often feel **cold, dense, or overly technical**.

I wanted to design something different:

- Friendly and approachable  
- Light, soft, and visually engaging  
- Simple to navigate with no learning curve  
- Focused on what people actually need  

This project is about making weather feel **easy, calm, and human**.

---

## Live Demo

- Frontend: https://mycityweatherapp.onrender.com/  
- Backend API: https://mycityweatherapp.vercel.app/  

---

## ✨ Features

- Search and explore real-time weather by city  
- Tabbed dashboard:
  - Weather (temperature, humidity, wind, condition)  
  - Timezone (local date & time)  
  - Astronomy (sunrise & sunset)  
- Fast performance (Vite + React 19)  
-  Styled with Chakra UI  
-  Secure backend proxy (no exposed API keys)  

---

## 📸 UI Preview

### Landing Experience
<img width="230" height="429" src="https://github.com/user-attachments/assets/a564ca49-6df1-45d9-ae64-c77e03ff0f7f" />
<img width="1282" height="569" src="https://github.com/user-attachments/assets/8462499d-ac51-4eea-9724-6ffa56f2b238" />

A soft, welcoming entry point designed to feel **inviting rather than overwhelming**, with a clear and simple call-to-action.

---

### Dashboard (Empty State)
<img width="231" height="408" src="https://github.com/user-attachments/assets/01f80335-63e7-4f9b-9610-d9b120271b09" />
<img width="1189" height="601" src="https://github.com/user-attachments/assets/14b8b8c0-2757-4896-a7df-0f4e9c3cb465" />

Instead of displaying empty or confusing data, the UI gently guides the user — improving clarity and reducing friction.

---

### Weather View
<img width="234" height="447" src="https://github.com/user-attachments/assets/c593ff90-8156-4bc7-9ac8-7fabae3f902c" />
<img width="1342" height="496" src="https://github.com/user-attachments/assets/91878aa9-ed41-419a-9415-3220181f6f14" />

Key information is broken into clear sections, making it easy to scan quickly.

---

### Timezone View
<img width="233" height="417" src="https://github.com/user-attachments/assets/0257f689-1fd9-4664-8a9d-597704de24a9" />
<img width="921" height="288" src="https://github.com/user-attachments/assets/464d269e-80eb-4bb1-9355-1e089fcfd8ec" />

A minimal layout focused only on essential information — date and time.

---

### Astronomy View
<img width="233" height="430" src="https://github.com/user-attachments/assets/f44a8d61-088b-428d-9778-ae6073eb72b3" />
<img width="1276" height="490" src="https://github.com/user-attachments/assets/3fcafe07-4de7-4d76-b5fb-3eb6f4414b9b" />

Designed to feel slightly more visual and atmospheric, reinforcing the app’s lighter tone.

---

### Profile Page
<img width="235" height="295" src="https://github.com/user-attachments/assets/0724cf85-7328-4a24-8ebf-b0edd4b6d74c" />
<img width="1349" height="473" src="https://github.com/user-attachments/assets/cc058eed-b6f2-49c9-ae21-c5fafa36b01a" />

A simple, friendly layout that keeps consistency across the app.

---

### Loading State
<img width="521" height="369" src="https://github.com/user-attachments/assets/bbe6d952-3f55-4bad-805d-e5a2994b266a" />

Even loading states are designed to feel intentional and on-brand.
- Meet Oatie my Brand Icon for this fun website.
- I designed him holding an umbrella that says CWA because the app is called City Weather App. I like adding extra design details.

---

### Accessibility & 🧪 Testing
<img width="489" height="397" src="https://github.com/user-attachments/assets/2f0648aa-5be5-4775-b415-e148b7885455" />
<img width="623" height="75" src="https://github.com/user-attachments/assets/202bd68a-f45e-44e4-b669-b4d2f1698d66" />

Accessibility and testing are treated as core features — ensuring the app is inclusive, reliable, and consistent.

---

## Design Philosophy

This app intentionally avoids a corporate, data-heavy dashboard feel.

Instead, it focuses on:

- Simplicity over complexity  
- Calm, readable layouts  
- Clear user journeys  
- Friendly UI states (empty, loading, results)  

Every decision was made to ensure the app feels **effortless to use**, even for first-time users.

---

## Accessibility First

Accessibility was built into the design from the start — not added later.

-  Clear visual hierarchy for easy scanning  
-  Readable typography and strong contrast  
-  Keyboard-friendly navigation  
-  Fully responsive across devices  
-  Reduced cognitive load through simple layouts  

The goal: **anyone should be able to use this app instantly, without instructions.**

---

##  Testing Approach

Testing is a core part of the project — ensuring both stability and user experience.

-  Component testing with Vitest + React Testing Library  
-  Mocked API responses  
-  UI state validation (loading, empty, populated)  
-  Storybook for isolated component development  

This ensures the app remains:

- Reliable  
- Maintainable  
- Consistent as it scales  

---

## Architecture

```bash
React (Frontend - Vercel)
        ↓
.NET Backend API (Render)
        ↓
External Weather API (WeatherAPI)
```
- API keys are protected
- Backend acts as a proxy layer
  
## 🧪 Structure
```bash
city-weather-app/
│
├── frontend/   # React + Vite + Chakra UI
├── backend/    # .NET API
└── README.md
```
### Local Setup
## Requirements
- Node.js
- .NET SDK
- Git
## Run Frontend

-The frontend will open at `http://localhost:5173/`

```bash
cd frontend
npm install
npm run dev
```
## Run Backend
```bash
cd backend
dotnet restore
dotnet run
```
- This backend will run on `http://localhost:5168`
    
## Environment Config
```bash
{
  "WeatherApi": {
    "ApiKey": "YOUR_API_KEY",
    "BaseUrl": "https://api.weatherapi.com/v1/"
  }
}
```
## API Example
```bash
const API = import.meta.env.VITE_API_BASE_URL;

axios.get(`${API}/api/weather?city=Dublin`);
```
## 🚀 Deployment

### Frontend (Vercel)

```bash
VITE_API_BASE_URL=https://your-render-url
```
### Backend (Render)

```bash
dotnet publish -c Release -o out
dotnet out/YourProjectName.dll
```
## Roadmap
- City autocomplete
- Extended forecast
- Dark mode
- Location-based weather
- Notifications

## 👤 Author

**Sophia McGee**

---

## ⭐️ Support

Hope you enjoyed my fun designs and little app.
