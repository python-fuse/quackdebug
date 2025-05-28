# QuackDebug

<div align="center">
  <img src="/public/logo.png" alt="QuackDebug Logo" width="120" />
  <h3>Your Voice-Powered Debugging Companion</h3>
</div>

## 📋 Overview

QuackDebug is a modern web application that transforms the debugging experience by allowing developers to talk through their coding problems out loud. Based on the "rubber duck debugging" technique, QuackDebug listens to your debugging process, transcribes your thoughts, and helps you track your problem-solving journey.

### 🌟 Key Features

- **Voice Recording & Transcription**: Record your debugging sessions and automatically convert speech to text
- **Session Management**: Organize debugging sessions for different projects or problems
- **Notes & Recordings**: Create, view, and manage text notes and audio recordings for each session
- **User Authentication**: Secure login with email or social providers via Supabase
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Analytics Dashboard**: Track your debugging patterns and progress over time

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun package manager
- Supabase account for backend services

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/python-fuse/quackdebug.git
   cd quackdebug
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
└── src/
    ├── app/                    # Next.js app router
    │   ├── auth/               # Authentication pages
    │   ├── dashboard/          # User dashboard
    │   │   └── sessions/       # Debug sessions management
    │   └── feedback/           # User feedback form
    ├── components/             # React components
    │   ├── feedback/           # Feedback components
    │   ├── global/             # Global components like Player
    │   ├── sessions/           # Session-related components
    │   └── ui/                 # UI components library
    ├── contexts/               # React contexts (Auth, etc.)
    ├── hooks/                  # Custom hooks
    │   ├── useAudioRecorder    # Audio recording functionality
    │   ├── useSpeechRecognition# Speech-to-text functionality
    │   └── useAuth             # Authentication utilities
    ├── lib/                    # Utility functions
    └── supabase/               # Supabase client configuration
```

## 💻 Technologies

- **Frontend**:

  - Next.js 15
  - React 19
  - TypeScript
  - TailwindCSS
  - Radix UI components

- **Backend & Services**:

  - Supabase (Authentication, Database, File Storage)
  - Web Speech API (Speech Recognition)
  - WaveSurfer.js (Audio visualization)

- **State Management**:
  - React Context API
  - Custom Hooks

## 🔏 Authentication

QuackDebug uses Supabase authentication with the following options:

- Email/Password
- Google OAuth
- GitHub OAuth

## 🧩 How It Works

1. **Create a Session**: Start a new debugging session for your coding problem
2. **Talk Through Your Problem**: Use the built-in recorder to capture your thoughts
3. **Review Transcripts**: See your spoken words converted to text
4. **Add Notes**: Capture insights and solutions
5. **Track Progress**: Monitor your debugging patterns and improvements over time

## 🌐 Deployment

The application can be deployed on Vercel:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Happy debugging! 🦆</p>
</div>
