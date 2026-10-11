# Study Helper

## Run the website (React)
    npm install
    npm run dev

## Run the backend (Node + MongoDB)
Needs MongoDB running locally (or a MongoDB Atlas link).

    cd server
    npm install
    copy .env.example to .env  (set MONGODB_URI and ADMIN_KEY)
    npm start

The site runs on http://localhost:5173 and the backend on http://localhost:5000.

## Edit your content
- src/data.js: subjects and YouTube videos
- src/About.jsx: your Instagram and Facebook links
- Notes and papers: use "Add a note or paper (owner only)" at the bottom of the Notes or Papers page with your ADMIN_KEY
