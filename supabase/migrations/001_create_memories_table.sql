-- Create the memories table
CREATE TABLE IF NOT EXISTS public.memories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cover_photo_url TEXT NOT NULL,
    cover_photo_aspect_ratio DECIMAL(5,4) NOT NULL CHECK (cover_photo_aspect_ratio > 0),
    additional_photos JSONB DEFAULT NULL,
    note TEXT DEFAULT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    location_name TEXT NOT NULL,
    location_lat DECIMAL(10,8) NOT NULL CHECK (location_lat >= -90 AND location_lat <= 90),
    location_lng DECIMAL(11,8) NOT NULL CHECK (location_lng >= -180 AND location_lng <= 180),
    location_place_id TEXT NOT NULL,
    collection TEXT DEFAULT NULL CHECK (collection IN ('Beautiful Views', 'Restaurants', 'Cafes')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_memories_collection ON public.memories(collection);
CREATE INDEX IF NOT EXISTS idx_memories_tags ON public.memories USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_memories_location_name ON public.memories(location_name);
CREATE INDEX IF NOT EXISTS idx_memories_created_at ON public.memories(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_memories_updated_at 
    BEFORE UPDATE ON public.memories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on memories" ON public.memories
    FOR ALL USING (true);