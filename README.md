Chat Application – Frontend\
Live Link = https://chat-app-front-end-beige.vercel.app/



➤ Overview
This is the frontend for a ChatGPT-like conversational web application built as part of a full-stack technical assessment.
The application allows users to:
Sign up and log in securely
Start new conversations
View persistent chat history across page refreshes
Interact with a custom backend chat engine (no AI APIs)

➤ Technology Stack
React
Bootstrap (responsive UI)
Axios (API communication)
React Router DOM
JWT Authentication

➤ UI Features
ChatGPT-style chat interface
Typing indicator for bot responses
Loading indicators for slow network / refresh
Responsive design (mobile & desktop)
Brand colors used consistently:
Primary: #005461
Accent: #CF4B00

➤ Authentication Flow
Users must log in to access chat
JWT token stored securely in localStorage
Header displays logged-in user details
Logout clears session and redirects to login

➤ Chat Functionality
Message input with validation
Persistent conversation history
New chat option 
Messages remain available after refresh or re-login


➤ Setup Instructions (Local)
1️⃣ Clone Repository
git clone <repository-url>
cd frontend
2️⃣ Install Dependencies
npm install
3️⃣ Configure API Base URL
baseURL: "http://localhost:5000/api"
4️⃣ Run Application
npm start

➤ Deployment
Frontend deployed successfully
Integrated with deployed backend APIs
Works seamlessly across refresh and sessions



