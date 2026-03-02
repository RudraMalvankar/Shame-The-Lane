# Shame The Lane 🚦

A civic-tech platform that turns citizen rants into actionable RTI complaints and pressures local authorities into accountability.

## Features

- 🗺️ **Rage Map** – Geo-tagged complaint heatmap powered by Leaflet/MapLibre
- 🤖 **AI Processing** – Gemini converts raw rants into clean, classified complaints + RTI drafts
- 📣 **Pressure Engine** – Community upvote-driven escalation scorecard
- 🏛️ **Wall of Shame / Fame** – Track the worst and best-performing local bodies
- 📩 **RTI Generator** – One-click Right-to-Information filing
- 🔔 **Live Updates** – Socket.io real-time notifications

## Tech Stack

| Layer    | Tech                                    |
| -------- | --------------------------------------- |
| Frontend | React 18, TypeScript, Vite, TailwindCSS |
| Backend  | Node.js, Express, TypeScript            |
| Database | MongoDB + Mongoose                      |
| AI       | Google Gemini API                       |
| Realtime | Socket.io                               |
| Media    | Cloudinary                              |
| Auth     | JWT + bcrypt                            |

## Getting Started

```bash
# Install all dependencies
npm run install:all

# Start dev servers (client + server concurrently)
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Project Structure

```
shame-the-lane/
├── server/       # Express + Socket.io API
├── client/       # React + Vite SPA
└── scripts/      # Seed & utility scripts
```
