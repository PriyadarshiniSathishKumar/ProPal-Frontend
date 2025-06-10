proPAL Agent Dashboard
A modern, lightweight authentication and settings dashboard built with Next.js and Tailwind CSS. This app allows users to sign up, log in, and manage their profile and agent configuration with dynamic UI updates.

🌟 Features
✅ Authentication Flow

Sign Up → Login → Dashboard

Data stored in public/users.json

🎨 Clean UI with Tailwind CSS

⚙️ Dashboard with Sidebar Navigation

Profile Page → Update Email & Password

Agent Page → 3 interdependent dropdowns (Provider, Model, Language)

📄 Dynamic Config

Loads config from public/stt.json

Displays a summary of selected settings

🌙 Optional Dark Mode

💾 LocalStorage Persistence for dropdown selections

⚡ Smooth animations & feedback

📂 Directory Structure
bash
Copy
Edit
/public
  └── users.json      # User data storage
  └── stt.json        # Config file for Agent dropdowns

/app
  └── layout.tsx      # Global layout with Tailwind setup
  └── page.tsx        # Landing Page
  └── signup/page.tsx # Sign Up Page
  └── login/page.tsx  # Login Page
  └── dashboard/      # Dashboard with protected routes
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/yourusername/proPAL-dashboard.git
cd proPAL-dashboard
2️⃣ Install Dependencies
npm install
# or
yarn install
3️⃣ Run the Development Server
npm run dev
Open http://localhost:3000 in your browser.

🔑 API & Data Files
User Data: public/users.json

Agent Config: public/stt.json

Example stt.json:

json
Copy
Edit
{
  "providers": [
    {
      "name": "Deepgram",
      "value": "deepgram",
      "models": [
        {
          "name": "Nova-2",
          "value": "nova-2",
          "languages": [
            { "name": "English-US", "value": "en-US" }
          ]
        }
      ]
    }
  ]
}
✅ Authentication Flow
Sign Up → Saves new user to users.json

Login → Validates against users.json

Dashboard → Shows sidebar with Profile & Agent tabs

Profile → Update email & password → persists to users.json

Agent → 3 dropdowns → summary card → saves selection to localStorage

✨ Extra Features (Bonus)
🌙 Dark Mode toggle

💾 Persisted selections using localStorage

⚡ Animated dropdowns & smooth UI transitions

📝 Success/Error feedback on all actions

📦 Build for Production
npm run build
npm start
