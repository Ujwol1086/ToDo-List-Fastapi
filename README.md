# Todo Application

A full-stack Todo application built with FastAPI (Python) backend and React frontend. Create, edit, delete, and manage your tasks with a modern, responsive interface.

## Features

- Create, edit, and delete todos
- Mark tasks as completed or pending
- Clean and modern UI with Tailwind CSS
- Real-time updates with backend synchronization

## Tech Stack

- **Backend**: FastAPI, Python
- **Frontend**: React, Vite, Tailwind CSS

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 16.x or higher
- npm or yarn

### Backend Setup

1. Create and activate a virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Start Backend Server

From the project root directory:

```bash
uvicorn app.main:app --reload
```

Backend will run on: **http://127.0.0.1:8000**

### Start Frontend Server

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

## Usage

1. Open http://localhost:5173 in your browser
2. Add todos by entering a title and optional description
3. Click "Edit" to modify existing todos
4. Toggle completion status or delete todos as needed

---

**Note**: The backend API documentation is available at http://127.0.0.1:8000/docs when the server is running.
