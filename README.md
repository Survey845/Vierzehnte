# Vierzehnte - A website for your Valentine's

- A fun project I made for Valentine's Day.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Database](#database)
- [Deployment](#deployment)
- [Dependencies](#dependencies)
- [Stack](#stack)

## Features

- Minimalistic animations, images and gifs.
- A Sudoku Puzzle...
- ... or the option to use a password instead of solving the puzzle.
- Option to pick flowers for the bouquet and sending a special message.
- The illusion of having the option to say "No".

## Demo

- Go to [Vierzehnte](https://vierzehnte.vercel.app) and check out the version personalized for me.

## Installation

- Ensure you look through the dependencies before performing installation.
- In you CLI, clone the github repository using the code provided below

```bash
git clone git@github.com:Survey845/Vierzehnte.git
```

- Run the following code to install all the dependencies for the project:

```bash
npm ci
```

- Customise the code to your liking, set the password, make your own hints, set the sudoku difficulty.
- Change the colors, fonts and images to your liking, everything is customisable with the help of tailwind.

## Database

### Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account if you don't have one.
2. Create a new project.
3. Once the project is created, go to the project dashboard.

### Step 2: Set Up the Database Schema (Required)

1. Go to the SQL Editor in your Supabase dashboard.
2. Copy and paste the SQL from `setup/setup_database.sql`.
3. Run the SQL script to create the necessary table.

The script will:

- Create the `messages` table with UUID primary keys
- Leave Row Level Security disabled (this is by design)

## Deployment

### Step 1: Install the Vercel CLI

Open your terminal and install the Vercel CLI globally:

```bash
npm install -g vercel
```

### Step 2: Login to Vercel via CLI

In your terminal, run:

```bash
vercel login
```

### Step 3: Deploy your project

In your terminal, run:

```bash
vercel
```

The CLI will detect your project settings and prompt you with questions.

### Step 4: Verify your deployment

- Once deployed, Vercel will provide you with a URL for your application (e.g., https://your-project.vercel.app).
- Visit the URL to verify that your application is working correctly.
- If you see the "Database not set up" error banner, make sure you've completed the Supabase setup steps.

### Step 5: Production Deployment

When you are ready to deploy to production:

```bash
vercel --prod
```

This promotes your latest deployment to production.

### Database Conncetion Issues

-Verify that your environment variables are correctly set in .env file.
-Ensure your Supabase project is still active.
-Check if your IP is restricted in Supabase settings.

### CORS Issues

- Go to your Supabase project settings.
- Navigate to API settings.
- Add your Vercel deployment URL to the allowed origins.

### Share

- Send the link of the vercel app deployed to production with your loved ones and enjoy...

## Dependencies

- NPM (10.9.2)
- Node (v23.8.0)
- React JS (19.0.0)
- Vercel CLI (41.1.4)

## Stack

- React JS
- Tailwind CSS
- Lucide-React
- React-Card-Flip
