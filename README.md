# Study Helper

Diploma students ke liye ek study website: branch aur semester ke hisaab se notes, lecture videos aur purane question papers.

## Features
- Branch-wise (Computer, Civil, Electrical, Electronics, Mechanical, Chemical) aur semester-wise (1-6) subjects
- Subject-wise notes
- Lecture videos (YouTube)
- Student registration (name, class, roll number, email)
- Question paper PDF upload aur dekhna (branch, semester, year ke hisaab se)
- About section

## Tech Stack
React (Vite), Node.js, MongoDB

## Project Chalane Ke Steps

1. Repo download karo:
```
git clone https://github.com/kmk26375-afk/study-helper.git
cd study-helper
```

2. Frontend:
```
npm install
npm run dev
```
Browser mein `http://localhost:5173` kholo.

3. Backend (naye terminal mein):
```
cd server
npm install
```
`.env.example` ko copy karke `.env` banao aur apni MongoDB details daalo. Phir:
```
node index.js
```

## Banane Wala
Mohit, Diploma Computer Engineering (HSBTE)