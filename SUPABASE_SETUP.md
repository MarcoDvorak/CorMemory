# Supabase Database Setup Guide

This guide will help you set up Supabase database integration for CorMemory.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `CorMemory`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **Anon public key** (under "Project API keys")

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## Step 4: Run Database Migrations

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/migrations/001_create_memories_table.sql`
3. Paste it into the SQL Editor and click "Run"
4. This will create the `memories` table with all necessary indexes and triggers

## Step 5: Seed the Database (Optional)

To populate your database with sample data:

1. In the SQL Editor, copy the contents of `supabase/seed.sql`
2. Paste it into the SQL Editor and click "Run"
3. This will add 12 sample memories to your database

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)
3. You should see the memories loaded from your Supabase database

## Database Schema

The `memories` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `cover_photo_url` | TEXT | URL of the cover photo |
| `cover_photo_aspect_ratio` | DECIMAL | Aspect ratio of the cover photo |
| `additional_photos` | JSONB | Array of additional photos (optional) |
| `note` | TEXT | Text description (optional) |
| `tags` | TEXT[] | Array of tags |
| `location_name` | TEXT | Name of the location |
| `location_lat` | DECIMAL | Latitude coordinate |
| `location_lng` | DECIMAL | Longitude coordinate |
| `location_place_id` | TEXT | Google Places ID |
| `collection` | TEXT | Collection name (optional) |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

## Security

- Row Level Security (RLS) is enabled on the memories table
- Currently configured to allow all operations (you may want to restrict this later)
- Environment variables are automatically excluded from version control

## Troubleshooting

### "Missing Supabase environment variables" Error
- Make sure your `.env.local` file exists and contains the correct values
- Restart your development server after adding environment variables

### Database Connection Issues
- Verify your Supabase project URL and API key are correct
- Check that your Supabase project is active and not paused

### Migration Errors
- Ensure you're running the SQL in the correct order
- Check the Supabase logs for detailed error messages

## Next Steps

Once your database is set up, you can:
- Add authentication to restrict access to memories
- Implement image upload functionality
- Add more advanced search capabilities
- Set up real-time subscriptions for live updates