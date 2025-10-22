# 🎂 Birthday Wish Platform

A standalone **web application** for creating and sharing **personalized, interactive digital birthday experiences**.  
With this platform, users can build a custom page filled with **photos, music, messages, and animations**, then share it all with a **unique link** — the perfect digital birthday surprise! 🎉  

---

## 🚀 Live Demo  
👉 [https://your-vercel-app-name.vercel.app/](https://wishify-three.vercel.app)  
*(Replace the link above with your actual deployed Vercel URL.)*

---

## ✨ Features  

### 🎨 **Creator Flow**
- 🔗 **Unique Link Generation** — Instantly generates a unique, unguessable link for each birthday page.  
- 📸 **Photo Upload** — Upload up to **20 photos** to Cloudinary with optional captions and timestamps.  
- 🧩 **Full Customization**  
  - **Themes:** Pastel, Vibrant, or Dark.  
  - **Layouts:** Interactive Carousel or Chronological Timeline.  
  - **Music:** Add a background music track.  
  - **Messages:** Use a rich-text editor to create beautiful personal notes with floating “message balloons.”  
  - 🎤 **Voice Recording:** Record and upload a personal voice message.  
  - ⏰ **Countdown Timer:** Lock the page until the birthday celebration starts.  
  - 👀 **Preview Mode:** Instantly preview your design before publishing.  

---

### 🎁 **Birthday Experience**
- ⚡ **Dynamic Data Loading:** All content is fetched in real-time from Firebase.  
- ✨ **Immersive Animations:** Page-load confetti, floating balloons, and other beautiful animations.  
- 🎂 **Interactive Fun:**  
  - **Digital Cake:** Blow out virtual candles using your microphone!  
  - **Make a Wish:** Experience a magical sparkle animation.  
- 💌 **Gratitude Wall:** Birthday person can leave a heartfelt “Thank You” message for the creator.  
- 📊 **Analytics:** View counter to track how many times the page was visited.  

---

## 💻 Tech Stack  

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React (Create React App) |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 |
| **Animations** | Framer Motion |
| **State Management** | Zustand |
| **Database** | Firebase Firestore |
| **Storage** | Cloudinary |
| **Deployment** | Vercel |

---

## 🧩 Key Libraries  
- `react-quill` → Rich text editor for personalized messages.  
- `react-datepicker` → Birthday countdown selector.  
- `react-countdown` → Live countdown display.  
- `swiper` → Smooth and responsive photo carousel.  
- `react-canvas-confetti` → Fun confetti effects.  
- `dompurify` → Sanitizes user-generated HTML safely.  

---

## 🛠️ Getting Started Locally  

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd birthday-wish-platform
```
---
### 2️⃣ **Install Dependencies**
```bash
npm install
```
---
### 3️⃣ **Set Up Environment Variables**
Create a .env file in the root directory with the following:
```bash
# Firebase (Get from Project Settings > Web App)
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID

# Cloudinary (From your Cloudinary Dashboard)
REACT_APP_CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
REACT_APP_CLOUDINARY_UPLOAD_PRESET=YOUR_UNSIGNED_UPLOAD_PRESET_NAME
```
---
### 4️⃣ **Run the Development Server**
```bash
npm start
```
Your app will now be running at http://localhost:3000 🎉
---

---

## 🧠 Future Enhancements
- 💬 Add comment threads or guest messages.  
- 💝 Enable multi-language support.  
- 📱 Improve mobile responsiveness and animations.  
- 🕺 Add AR filters or AI-generated birthday wishes.  

---

## 👨‍💻 Author
**Developed by [Soham Parab](https://github.com/<soham4204>)**  
Made with ❤️ using React, Firebase, and Cloudinary.  

---

## 📜 License
This project is open-source and available under the **MIT License**.  
Feel free to fork, modify, and share — just give proper credit. 😊

